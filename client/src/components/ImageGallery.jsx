import React, { useEffect, useState } from 'react';
import axios from '../request/axios'; // Adjust the path to match your project structure

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch images from the server
    const fetchImages = async () => {
      try {
        const response = await axios.get('/images');
        setImages(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to load images');
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      {error && <p>{error}</p>}
      <div className="gallery">
        {images.length > 0 ? (
          images.map((image) => (
            <div>
            <img
              key={image.fileName}
              src={image.filePath}
              alt={image.fileName}
              style={{ width: '200px', height: 'auto', margin: '10px' }}
            />
            <button className='btn btn-primary btn-block mt-4'>Delete</button>
            
            </div>
          
   
      
            
          ))
        ) : (
          <p>No images found.</p>
        )}
        
      </div>
    </div>
  );
}