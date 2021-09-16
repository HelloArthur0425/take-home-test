import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Posts.css';
import { Button, ButtonGroup, Card, Dropdown } from 'react-bootstrap';

const Posts = (props) => {

    const handleDeletePost = (target) => {
        let orgPosts = [...props.posts];
        let updatedPosts = orgPosts.filter(post => post.id != target.id);
        props.setPosts(updatedPosts);
    }

    const handleEditPost = (target) => {
        props.setEditingPost(target);
        props.setShow(true);
    }

    return <div className="main-posts-container">
        {
        props.posts.length > 0 ? 
            <div className="main-posts-container-wrapper">
            {
                props.posts.map(post => <div key={post.id} style={{ margin: 5 }}>
                    <Card style={{ width: '18rem' }}>
                        {
                            post.previewSrc && <Card.Img variant="top" src={post.previewSrc} height="250" className="card-image"/>
                        }
                        <Card.Body>
                        <Card.Text>{post.content}</Card.Text>
                        <Dropdown>
                            <Dropdown.Toggle as={ButtonGroup} id="dropdown-custom-components" />

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="edit" onClick={() => handleEditPost(post)}>Edit</Dropdown.Item>
                                <Dropdown.Item eventKey="delete" onClick={() => handleDeletePost(post)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Card.Body>
                    </Card>
                </div>)
            }
            </div>
            :
            <div>No posts was created.</div>
        }
    </div>
}

export default Posts;