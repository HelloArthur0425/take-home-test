import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Header from './components/Header/Header';
import CreatePostModal from './components/Post/CreatePostModal'; 

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
            </div>
            <div className="main-posts-container">
              {
                posts.length > 0 ? 
                <div className="main-posts-container-wrapper">
                  {
                    posts.map((post, index) => <div key={post.id}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={post.previewSrc} height="200" className="card-image"/>
                        <Card.Body>
                          <Card.Text>{post.content}</Card.Text>
                          <Button variant="primary">Do somthing</Button>
                        </Card.Body>
                      </Card>
                    </div>)
                  }
                </div>
                  
                  :
                  <div>No posts was created.</div>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
