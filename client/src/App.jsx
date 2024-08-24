import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageGallery from './components/ImageGallery';
import Layout from './components/Layout';
function App() {
  const [count, setCount] = useState(0)

  return (
    // <BrowserRouter>
    // <Routes>
    //     {/* Define a route with a path and an element */}
    //     <Route path="/" element={
           
    //       <div className='container mt-4'>
    //         <h4 className='display-4 text-center mb-4'>Image Upload</h4>
    //         <ImageUpload />
            
    //       </div>
    //     } />
        
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
   
        <Route path="ImageUpload.jsx" element={<ImageUpload />} />
        
        <Route path="ImageGallery.jsx" element={<ImageGallery />} />
       
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App
