import React, { useState } from "react";
import "./dashboard.css";
import MediaUpload from "./MediaUpload";


export function MediaUploadSection({ onChange }) {
    // Media data structure: {url: "...", type: "image/video"}
    const [mediaArr, setMediaArr] = useState([])

    const addImage = (file) => onChange(file);
    const addMedia = (media) => {
        setMediaArr((mediaArr) => [
            ...mediaArr,
            media
        ]);
        console.log("update mediaArr");
    };

    return (
        <div className="media-upload-container">
            {mediaArr.map((media) => media.type === 'image'
                ? (<img src={media.url} alt="Uploaded content" className="uploaded-image" />)
                : (<video src={media.url} controls className="uploaded-image" />))
            }
            <MediaUpload addFile={addImage} addMedia={addMedia} />
        </div>
    );
}