import React, { useRef, useState } from 'react';


function PhotoUpload({ onChange }) {
  const [selectedImage, setSelectedImage] = useState(null);
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
        {selectedImage ? (
          <img src={selectedImage} alt="Profile" className="uploaded-image" />
        ) : (
          <div className="image-placeholder">+</div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept='image/png, image/jpeg'
      />
    </div>
  );
}

export default PhotoUpload;
