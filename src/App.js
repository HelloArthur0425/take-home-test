import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from './components/Header/Header';
import PostModal from './components/Post/PostModal'; 
import Posts from './components/Post/Posts';
import CreatePost from './components/Post/CreatePost';
import { isMobile } from 'react-device-detect';

function App() {
  // post should have id, content, img, likeCount, edit, delete
  const [posts, setPosts] = useState([]);

  // modal use
  const [show, setShow] = useState(false);

  // for editing
  const [editingPost, setEditingPost] = useState(null);

  const openCreatePostyModal = (post) => {
    setEditingPost(post);
    setShow(true);
  }

  return (
    <div className="App">
      <Header />
      <Container fluid>
        <PostModal show={show} setShow={setShow} 
          editingPost={editingPost} setEditingPost={setEditingPost} 
          posts={posts} setPosts={setPosts}
        />
        <Row>
          <Col xs={12} md={12} lg={12}>
            <div className="main">
              <CreatePost isMobile={isMobile} className="create-post" posts={posts} setPosts={setPosts} />
              <Button variant="outline-success" className="m-create-post"
                style={ isMobile ? { width: '18rem', marginBottom: 10 } : { display: 'none' }} 
                onClick={() => openCreatePostyModal(null)}>
                  + New Post
                </Button>
              <Posts posts={posts} setPosts={setPosts} setShow={setShow} setEditingPost={setEditingPost}/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
