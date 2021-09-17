import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Posts.css';
import { Button, ButtonGroup, Card, Dropdown } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const CreatePost = (props) => {

    let newPost = {};

    const [previewSrc, setPreviewSrc] = useState(null);
    const [content, setContent] = useState('');

    const handleFileChange = (imageFile) => {
        let file = imageFile;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setPreviewSrc([reader.result]);
            newPost.imageSrc = reader.result;
        }.bind(this);
    }

    const handlePublish = () => {
        newPost.id = uuidv4();
        newPost.previewSrc = previewSrc ? previewSrc[0] : null;
        newPost.content = content;
        props.setPosts([newPost, ...props.posts]);

        // clear up
        setPreviewSrc(null);
        setContent('');
    }

    return <div className="create-post-container" style={props.isMobile ? { display: 'none' } : { display: 'block' }}>

        <div style={{textAlign: 'left', marginLeft: 5}}>
            <input type="file" id="create-post-input-image" accept="image/*" style={{marginBottom: 5}} onChange={(e) => handleFileChange(e.target.files[0])} />
        </div>

        <img src={previewSrc} width={previewSrc && "300px"} id="create-post-preview-image" style={{margin: '5px 0'}}/>

        <textarea id="create-post-content" cols="75" rows="5" value={content} 
            style={{marginTop: 5}} onChange={(e) => setContent(e.target.value)} 
        />

        <div style={{textAlign: 'right'}}>
            <Button onClick={() => handlePublish()}>Publish</Button>
        </div>
    </div>
}

export default CreatePost;