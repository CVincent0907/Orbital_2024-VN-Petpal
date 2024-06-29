import React from "react";


export function ImagesSection({ images }) {
    return (
        <div className="images-container">
            {images.length == 0
                ? <p>No images uploaded</p>
                : images.map((image) => <img src={image.image} alt={image.description} />)
            }
        </div>
    );
}