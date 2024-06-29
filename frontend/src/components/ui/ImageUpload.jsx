import React, { useRef, useState } from 'react';
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";

export function ImageUpload({ onChange, initImage }) {
  const [selectedImage, setSelectedImage] = useState(initImage);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onChange(file); // Pass the file to the parent component
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-photo-upload">
      <div className="image-upload" onClick={handleImageClick}>
        {selectedImage 
          ? <img src={selectedImage} alt="Profile" className="uploaded-image" />
          : <img src={imagePlaceholder} alt="Placeholder profile" className="uploaded-image" />
        }
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept='image/png, image/jpeg' />
    </div>
  );
}