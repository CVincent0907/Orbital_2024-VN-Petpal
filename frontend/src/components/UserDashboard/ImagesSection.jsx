import React from "react";


export function ImagesSection({ images }) {
    return (
        <div className="images-container">
            {images.map((image) => <img src={image.image} alt={image.description} />)}
        </div>
    );
}