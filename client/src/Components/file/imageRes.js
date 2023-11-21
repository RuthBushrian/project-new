import React, { useState, useEffect } from 'react';
import { Image } from 'primereact/image';

const ImageComponent = (props) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Fetch image from the server
    fetch(props.src)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        // Convert blob to data URL
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }, []);

  return (<div className="card flex justify-content-center">
  <Image src={imageSrc} height="320" preview />
</div>)
};

export default ImageComponent;
