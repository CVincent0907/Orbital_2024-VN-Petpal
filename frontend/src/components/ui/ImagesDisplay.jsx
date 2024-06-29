import React from "react";


export function ImagesDisplay({ images }) {
    return (
        <div className="images-container">
            {images.length === 0
                ? <p>No uploaded images</p>
                : images.map((image) => <img src={image.image} alt="uploaded image" />)
            }
        </div>
    );
}