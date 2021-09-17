import { v4 as uuidv4 } from 'uuid';

export const createPost = (media, content) => {
    let newPost = {};
    
    newPost.id = uuidv4();
    newPost.previewSrc = media ? media[0] : null;
    newPost.content = content;

    return newPost;
}

export const createMediaPreview = (media, setMediaPreview, mediaDom) => {
    let reader = new FileReader();
    reader.readAsDataURL(media);
    reader.onloadend = function (e) {
        setMediaPreview([reader.result]);
        mediaDom.imageSrc = reader.result;
    }.bind(this);
}