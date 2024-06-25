// import React, { useRef, useState } from 'react';
// import './dashboard.css';

// export default function MediaUpload() {
//   const fileInputRef = useRef(null);
//   const [media, setMedia] = useState(null);

//   const handleMediaClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMedia({
//           url: reader.result,
//           type: file.type.startsWith('image/') ? 'image' : 'video'
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="profile-photo-upload">
//       <div className="image-upload" onClick={handleMediaClick}>
//         {media ? (
//           media.type === 'image' ? (
//             <img src={media.url} alt="Uploaded content" className="uploaded-image" />
//           ) : (
//             <video src={media.url} controls className="uploaded-image" />
//           )
//         ) : (
//           <div className="image-placeholder">+</div>
//         )}
//       </div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//         accept="image/*,video/*"
//       />
//     </div>
//   );
// }




import React, { useRef, useState } from 'react';
import './dashboard.css';

export default function MediaUpload({ onChange }) {
  const fileInputRef = useRef(null);
  const [media, setMedia] = useState(null);

  const handleMediaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia({
          url: reader.result,
          type: file.type.startsWith('image/') ? 'image' : 'video'
        });
        onChange(file); // Pass the file to the parent component
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-photo-upload">
      <div className="image-upload" onClick={handleMediaClick}>
        {media ? (
          media.type === 'image' ? (
            <img src={media.url} alt="Uploaded content" className="uploaded-image" />
          ) : (
            <video src={media.url} controls className="uploaded-image" />
          )
        ) : (
          <div className="image-placeholder">+</div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*,video/*"
      />
    </div>
  );
}
