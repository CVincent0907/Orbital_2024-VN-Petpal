import React, { useState } from "react";
import MediaUpload from "./MediaUpload";


export function MediaUploadSection({ initMediaArr, onChange }) {
    // Media data structure: {image: "...", type: "image/video"}
    const [mediaArr, setMediaArr] = useState(initMediaArr ? initMediaArr : []);

    const addImage = (file) => onChange(file);
    const addMedia = (media) => {
        setMediaArr((mediaArr) => [
            ...mediaArr,
            media
        ]);
    };

    return (
        <div className="media-upload-container">
            {mediaArr.map((media) => (<img src={media.image} alt="Uploaded content" className="uploaded-image" />))}
            <MediaUpload addFile={addImage} addMedia={addMedia} />
        </div>
    );
}