import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

const Posts = (props) => {

    const handleDeletePost = (target) => {
        let orgPosts = [...props.posts];
        let updatedPosts = orgPosts.filter(post => post.id != target.id);
        props.setPosts(updatedPosts);
    }

    return <div className="main-posts-container">
        {
        props.posts.length > 0 ? 
            <div className="main-posts-container-wrapper">
            {
                props.posts.map(post => <div key={post.id} style={{ margin: 5 }}>
                    <Card style={{ width: '18rem' }}>
                        {
                            post.previewSrc && <Card.Img variant="top" src={post.previewSrc} height="200" className="card-image"/>
                        }
                        <Card.Body>
                        <Card.Text>{post.content}</Card.Text>
                        <Button variant="primary" className="card-button">Edit</Button>
                        <Button variant="danger" className="card-button" onClick={() => handleDeletePost(post)}>Delete</Button>
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