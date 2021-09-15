import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from './components/Header/Header';
import CreatePostModal from './components/Post/CreatePostModal'; 
import Posts from './components/Post/Posts';

function App() {
  // post should have id, content, img, likeCount, edit, delete
  const [posts, setPosts] = useState([]);

  // modal use
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log('posts:', posts);
  }, [posts]);

  return (
    <div className="App">
      <Header />
      <Container fluid>
        <CreatePostModal show={show} setShow={setShow} posts={posts} setPosts={setPosts}/>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <div className="main">
              <Button variant="outline-primary" onClick={() => setShow(true)}>+ New Post</Button>
              <Posts posts={posts} setPosts={setPosts}/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
