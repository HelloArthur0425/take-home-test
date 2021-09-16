import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const CreatePostModal = (props) => {

    let newPost = {};

    const [previewSrc, setPreviewSrc] = useState(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (props.editingPost) {
            setPreviewSrc(props.editingPost.previewSrc);
            setContent(props.editingPost.content);
        } else {
            setPreviewSrc(null);
            setContent('');
        }
    }, [props.editingPost]);

    const handleClose = () => {
        props.setShow(false);
    }

    const postService = () => {

        if (!props.editingPost) {
            // create new
            newPost.id = uuidv4();
            newPost.previewSrc = previewSrc ? previewSrc[0] : null;
            newPost.content = content;
            props.setPosts([newPost, ...props.posts]);
        } else {
            // update one
            newPost.id = props.editingPost.id;
            newPost.previewSrc = previewSrc ? previewSrc[0] : null;
            newPost.content = content;
            let postIndex = [...props.posts].findIndex(post => post.id == props.editingPost.id);
            let tempPosts = [...props.posts];
            tempPosts[postIndex] = newPost;
            props.setPosts(tempPosts);
        }
        setPreviewSrc(null);
        setContent('');
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
            <Modal.Title>{!props.editingPost ? 'Create a new post' : 'Update the Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup>
                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Upload your image</Form.Label>
                    <Form.Control type="file" size="sm" onChange={(e) => handleFileChange(e.target.files[0])}/>
                </Form.Group>
            </InputGroup>
            <InputGroup>
            <img src={previewSrc} width="300"/>
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
            <Button variant="primary" onClick={() => postService()}>
                Submit
            </Button>
        </Modal.Footer>
    </Modal>
}

export default CreatePostModal;