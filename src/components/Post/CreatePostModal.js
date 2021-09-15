import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const CreatePostModal = (props) => {

    let newPost = {};

    const previewRef = useRef(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [content, setContent] = useState('');

    const handleClose = () => {
        props.setShow(false);
        setPreviewSrc(null);
        setContent('');
    }

    const createAPost = () => {
        newPost.id = uuidv4();
        newPost.previewSrc = previewSrc ? previewSrc[0] : null;
        newPost.content = content;
        props.setPosts([newPost, ...props.posts]);
        handleClose();
    }

    const handleFileChange = (imageFile) => {
        let file = imageFile;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setPreviewSrc([reader.result]);
            newPost.imageSrc = reader.result;
        }.bind(this);
    }

    return <Modal show={props.show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
            <Modal.Title>Create a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup>
                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Upload your image</Form.Label>
                    <Form.Control type="file" size="sm" onChange={(e) => handleFileChange(e.target.files[0])}/>
                </Form.Group>
            </InputGroup>
            <InputGroup>
            <img ref={previewRef} src={previewSrc} width="300"/>
            </InputGroup>
            <InputGroup>
                <FormControl as="textarea" aria-label="With textarea" 
                    value={content} placeholder="content here... " 
                    onChange={(e) => setContent(e.target.value)}
                />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => createAPost()}>
                Submit
            </Button>
        </Modal.Footer>
    </Modal>
}

export default CreatePostModal;