import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { createMediaPreview, createPost } from '../PostService/PostService';

const PostModal = (props) => {

    let post = {};

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

    const handlePostModalAction = () => {

        if (!props.editingPost) {
            // create new
            let newPost = createPost(previewSrc, content);
            props.setPosts([newPost, ...props.posts]);
        } else {
            // update one
            post.id = props.editingPost.id;
            post.previewSrc = previewSrc ? previewSrc[0] : null;
            post.content = content;
            let postIndex = [...props.posts].findIndex(post => post.id == props.editingPost.id);
            let tempPosts = [...props.posts];
            tempPosts[postIndex] = post;
            props.setPosts(tempPosts);
        }
        setPreviewSrc(null);
        setContent('');
        handleClose();
    }

    const handleFileChange = (imageFile) => {
        createMediaPreview(imageFile, setPreviewSrc, post);
    }

    return <Modal show={props.show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
            <Modal.Title>{!props.editingPost ? 'Create a new post' : 'Update the Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup>
                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Upload your image</Form.Label>
                    <input type="file" accept="image/*" style={{marginBottom: 5}} onChange={(e) => handleFileChange(e.target.files[0])} />
                </Form.Group>
            </InputGroup>
            {
                previewSrc && <InputGroup>
                    <div className="previewSrc-container" style={{ margin: "5px 5px 20px" }}>
                        <img src={previewSrc} width="400" style={previewSrc && { outline: "1px solid #ccc" }}/>
                    </div>
                </InputGroup>
            }
            <InputGroup>
                <FormControl as="textarea" aria-label="With textarea" 
                    value={content} placeholder="content here..." 
                    onChange={(e) => setContent(e.target.value)}
                />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => handlePostModalAction()}>
                Submit
            </Button>
        </Modal.Footer>
    </Modal>
}

export default PostModal;