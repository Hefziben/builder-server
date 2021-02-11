var express = require("express");
var router = express.Router();
var FormData = require("../modelos/formData");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  }
});
const upload = multer({
  storage: storage
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
  const formData = req.body;
  const new_FormData = new FormData(formData);
  new_FormData.save((err, response) => {
    if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send("FormData save success");
    }
  });
});

router.post("/file/", upload.fields([{
  name: 'signature', maxCount: 1
}, {
  name: 'file', maxCount: 1
}]), (req, res) => {
  
  const files = req.files;
  const signature = files.signature[0].path;
  const postdata = JSON.parse(req.body.formData);
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
