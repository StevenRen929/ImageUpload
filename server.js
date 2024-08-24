//using expressJs to build a server
const express = require('express');
const fileUpload = require('express-fileupload');
const {v4: uuidv4} =require('uuid');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // import filesystem mode

//create a webserver
const app = express();
//create global middleware 

app.use(fileUpload());

app.use(cors());

app.post('/upload',(req,res)=>{
      // Check if files are present in the request
    console.log('Files:', req.files);
    if(!req.files || !req.files.file){
        return res.status(400).json({
            error:'No file uploaded'
        })
    }

    const file = req.files.file;
    const maxSize = 10 * 1024 *1024;//10 mb
    if(file.size >maxSize){
        return res.status(400).json({
            error : 'file is too big' 
        })
    }
    //generate unique filename


    // The __dirname variable in Node.js represents the directory name of the current module.
    //  It is useful when you need to work with file paths relative to the location of your script.
    //   In the context of your Express server setup, 
    //   you can use __dirname to ensure that file paths are correctly resolved, 
    // regardless of where the script is run from. 
    const fileName = uuidv4() + path.extname(file.name);
    const upload_dir = `${__dirname}/client/public/uploads`;

    file.mv(`${upload_dir}/${fileName}`,(err)=>{
        if(err)
        {
        return res.status(500).send(err)
         }
        res.json({
            fileName:fileName,
            filePath:`/uploads/${fileName}`
        })
    })

})




app.get('/images',(req,res)=>{
    const image_dir = `${__dirname}/client/public/uploads`;//this is the folder used for save uploaded file
    fs.readdir(image_dir,(err,files)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"fail to read folder"});
        }else{
            const imageFiles = files.filter(file =>
                ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase())
            );
    
            const imagePaths = imageFiles.map(file => ({
                fileName: file,
                filePath: `/uploads/${file}`
            }));
    
            res.json(imagePaths);
            //return res.status(200).json({comlete: "completion of loading"});
        }
    })

})

app.delete('/deleteImage',(req,res)=>{
   // const image_dir = `${__dirname}/client/public/uploads/${req.fileName}`;
    //path of image need to be deleted
    const fileName = req.body;
    const image_dir = `${__dirname}/client/public/uploads/${fileName}`;
    fs.readdir(image_dir,(err,files)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"fail to read folder"})
        }
    })



})

    

app.listen(80,()=>{
    console.log('server is running on http://localhost:80');
    console.log(__dirname);//lab11-imageUpload
})

