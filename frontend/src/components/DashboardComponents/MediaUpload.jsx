import React, { useRef, useState } from 'react';
import './dashboard.css';

export default function MediaUpload({ addFile, addMedia }) {
    const fileInputRef = useRef(null);

    const handleMediaClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                addMedia({
                    url: reader.result,
                    type: file.type.startsWith('image/') ? 'image' : 'video'
                });
                addFile(file); // Pass the file to the parent component
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-photo-upload">
            <div className="image-upload" onClick={handleMediaClick}>
                <div className="image-placeholder">+</div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                // TODO: handle videos
                accept="image/*"
            />
        </div>
    );
}
