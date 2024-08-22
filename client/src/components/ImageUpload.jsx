import React, { Fragment, useState } from 'react'
import Message from './Message';
import Progress from './Progress';
import axios from '../request/axios';
import{isEmpty} from 'lodash'

export default function ImageUpload() {
  const [message,setMessage] = useState('Please upload your image');
  const[uploadPercentage,setUploadPercentage] = useState(0);
  const[file,setFile] =useState('');
  const[uploadFile,setUploadedFile] = useState({});

  const onChange = (e) =>{
    console.log('e',e.target.files);
    if(e.target.files.length){
      setFile(e.target.files[0]);

    }

  }
  const handleSubmit = async(e)=>{
    e.preventDefault();//防止默认跳转
    const formData = new FormData();
    //作用: 将文件添加到 FormData 对象中
    formData.append('file',file);
    try{
      const res = await axios.post('/upload',formData,{
      onUploadProgress:(ProgressEvent)=>{
          setUploadPercentage(    
            parseInt(
              Math.round((ProgressEvent.loaded*100)/ProgressEvent.total)
             
            )
          
          );
        },
      });
      //clear percentage
      setTimeout(()=>setUploadPercentage(0),5000);
      setMessage('File uploaded');
      const{fileName,filePath} = res.data;
      console.log(fileName);
      setUploadedFile({fileName,filePath});

  
    }catch(error){
      console.error();
      setMessage('An unexpected error occured')
    }
  }


  return (

  <Fragment>
  <form onSubmit={handleSubmit}>
        {message && <Message message = {message} setMessage={setMessage}/>}
      <div className='input-group mb-3'>
      <input type="file" className='form-control' onChange={onChange}  />
    
      </div>
      <Progress percentage = {uploadPercentage}/>
      <input type="submit" 
      value='Upload'
      className='btn btn-primary btn-block mt-4' 
      />

  </form>
{
  !isEmpty(uploadFile) &&(
    <div className='row mt-5'>
      <div className='col-md-6 m-auto'>
        <h3 className='text-center'>
            {uploadFile.fileName}
        </h3>
        <img src={uploadFile.filePath} alt='upload image' style ={{width:'100%'}} />
      </div>
    </div>
  )
}
</Fragment>
  )
}

