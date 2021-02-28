var express = require("express");
var router = express.Router();
var Form = require("../modelos/form");
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

/* GET forms listing. */
router.get("/", function(req, res, next) {
  Form.find({}, (err, forms) => {
    if (res.status == 400) {
      res.send({ mensaje: "Error in the request", res: status, err });
    } else {
      res.send(forms);
    }
  });
});



//add form 
router.post("/", (req, res) => {
  console.log(req.body);
    const crearForm = new Form(req.body);
  
    crearForm.save((err, new_Form) => {
      if (err) {
        errMsj = err.form;
  
        res.send(errMsj);
      } else {
        res.send("Form save success");
      }
    });
  
});

router.post("/file/", upload.single("file_path"), (req, res) => {
  const file = req.file;  
  const form = req.body;
  form.userTypes = JSON.parse(req.body.userTypes);
  form.values = JSON.parse(req.body.values);
  form.tags = JSON.parse(req.body.tags);
  form.template = JSON.parse(req.body.template);

  form.templateDoc = file.path
  console.log(form);
  const createForm = new Form(form);
  createForm.save((err, newForm) => {
    if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send({ msg:"Form save sucess"});
    }
  });
});

//get form by ID
router.get("/:id", (req, res) => {
  var formId = req.params.id;
  Form.findById(formId)
    .exec()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

router.get("/formId/:id", (req, res) => {
  var id = req.params.id;
  Form.findOne({formId:id}, (err, response) => {
    if (res.status == 400) {
      res.send({ mensaje: "error in request", res: status, err });
    } else {
      res.send(response);
     }
  });
});

//Update Form
router.put("/:id", (req, res) => {
  const formId = req.params.id;
  console.log(formId);

  Form.findByIdAndUpdate(formId, { $set: req.body }, { new: true })
    .then(data => res.status(200).send("Updated"))
    .catch(err => res.status(400).send(err));
});
router.put("/file/:id", upload.single("file_path"), (req, res) => {
  const formId = req.params.id;
  const file = req.file;  
  const form = req.body;
  form.userTypes = JSON.parse(req.body.userTypes);
  form.values = JSON.parse(req.body.values);
  form.tags = JSON.parse(req.body.tags);
  form.template = JSON.parse(req.body.template);

  form.templateDoc = file.path
  console.log(form);
  Form.findByIdAndUpdate(formId, { $set: form }, { new: true })
    .then(data => res.status(200).send("form uddated"))
    .catch(err => res.status(400).send(err));
});


//delete form
router.delete("/:id", (req, res) => {
  const formId = req.params.id;
  Form.findByIdAndDelete(formId)
    .then(data => res.status(200).send("form deleted"))
    .catch(err => res.status(400).send(err.form));
});


module.exports = router;
