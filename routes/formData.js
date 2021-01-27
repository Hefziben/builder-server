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
  const createFormData = new FormData(formData);
  createFormData.save((err, new_FormData) => {
    if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send("FormData save success");
    }
  });
});

router.post("/", upload.single("file_path"), (req, res) => {
  
  const file = req.file;
  const promo = req.body;
  const nuevaPromo = {
    comercio: promo.comercio,
    validez: promo.validez,
    codigo: promo.codigo,
    categoria:promo.categoria,
    ubicacion: [{lat:Number(promo.lat),lng:Number(promo.lng)}],
    imagen: file.path,
       };
  console.log(nuevaPromo);
  const crearPromo = new Promo(nuevaPromo);
  crearPromo.save((err, nuevo_Promo) => {
    if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send({ msg:"Promo guardado con exito", id:nuevo_Promo});
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
  FormData.findByFormDataAndDelete(formData)
    .then(data => res.status(200).send("formData deleted"))
    .catch(err => res.status(400).send(err.message));
});


module.exports = router;