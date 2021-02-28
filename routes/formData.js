var express = require("express");
var router = express.Router();
var FormData = require("../modelos/formData");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const libre = require('libreoffice-convert');
var docxConverter = require('docx-pdf');

const extend = '.pdf'


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  }
});
const storage_2 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "downloads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  }
});
const upload = multer({
  storage: storage
});
const download = multer({
  storage: storage_2
});


/* GET formDatas listing. */
router.get("/", function(req, res, next) {
  FormData.find({}, (err, formData) => {
    if (res.status == 400) {
      res.send({ mensaje: "error in request", res: status, err });
    } else {
      res.send(formData);
    }
  });
});
/* GET formData by id. */
router.get("/formId/:id", function(req, res, next) {
  var formId = req.params.id;
  
  FormData.find({'formData.formId':formId}, (err, formData) => {
    if (res.status == 400) {
      res.send({ mensaje: "error in request", res: status, err });
    } else {
      res.send(formData);
    }
  });
});



//add formData
router.post("/", (req, res) => {
  const date = new Date().toLocaleDateString();
  const cleanFecha = date.replace(/\\|\//g,'')
  const number = Math.floor(Math.random() * 1000) + 1;   
  const docNombre = cleanFecha + number + ".pdf";
  const formData = req.body;
  console.log(formData.template);
  const new_FormData = new FormData(formData);
  const sourceFilePath = path.resolve(formData.template);
const outputFilePath = path.resolve(`${formData.template}.pdf`);
docxConverter(formData.template,`uploads/${docNombre}`,function(err,result){
  if(err){
    console.log(err);
  }
  console.log(result);
  new_FormData.save((err, response) => {
    if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send({message:"FormData save success",data:`uploads/${docNombre}`});
    }
  });
});

 
  
});

router.post("/download/", download.fields([{
  name: 'template', maxCount: 1
}]), (req, res) => {
  
  const files = req.files;
  const date = new Date().toLocaleDateString();
  const cleanFecha = date.replace(/\\|\//g,'')
  const number = Math.floor(Math.random() * 1000) + 1;   
  const docNombre = cleanFecha + number + ".pdf";
  const template = `${files.template[0].path}.docx`;    
  fs.rename(files.template[0].path, `${files.template[0].path}.docx`, function(err) {
      if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send({message:"FormData save success",data:template});
    }

});


 

    
  
    
  

});

router.post("/file/", upload.fields([{
  name: 'signature', maxCount: 1
}, {
  name: 'file', maxCount: 1
}]), (req, res) => {
  
  const files = req.files;
  console.log(files);
  const signature = files.signature[0].path;
  const postdata = JSON.parse(req.body.formData);
  console.log(postdata);
  postdata.formData.signature = signature;
  const fileExist = postdata.file in postdata.formData;
  if (fileExist && files.file) {
    postdata.formData[postdata.file] = files.file[0].path
  }
  console.log(files);
  console.log(postdata);
  const new_FormData = new FormData(postdata);
  console.log(new_FormData);
  new_FormData.save((err, response) => {
    if (err) {
      console.log(err);
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send({ msg:"FormData save success", data:response});
    }
  });
});





//get formData by ID
router.get("/:id", (req, res) => {
  var formData = req.params.id;
  FormData.findOne({value:formData}, (err, response) => {
    if (res.status == 400) {
      res.send({ mensaje: "error in request", res: status, err });
    } else {
      if (response) {
        res.send('invalid');
      } else{
        res.send('valid');
      }

    }
  });
});


//delete formData
router.delete("/:id", (req, res) => {
  const formData = req.params.id;
  FormData.findByIdAndDelete(formData)
    .then(data => res.status(200).send("formData deleted"))
    .catch(err => res.status(400).send(err.message));
});


module.exports = router;
