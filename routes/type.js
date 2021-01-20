var express = require("express");
var router = express.Router();
var Type = require("../modelos/type");
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

/* GET typees listing. */
router.get("/", function(req, res, next) {
  Type.find({}, (err, typees) => {
    if (res.status == 400) {
      res.send({ mensaje: "error en la petición", res: status, err });
    } else {
      res.send(typees);
    }
  });
});



//add type
router.post("/", (req, res) => {
  const type = req.body;
  const createType = new Type(type);
  createType.save((err, new_Type) => {
    if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send("Type save success");
    }
  });
});


//get type by ID
router.get("/:id", (req, res) => {
  var typeId = req.params.id;
  Type.findById(typeId)
    .exec()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

//Update Type
router.put("/:id", (req, res) => {
  const typeId = req.params.id;
  console.log(typeId);

  Type.findByIdAndUpdate(typeId, { $set: req.body }, { new: true })
    .then(data => res.status(200).send("Updated"))
    .catch(err => res.status(400).send(err));
});

//delete type
router.delete("/:id", (req, res) => {
  const typeId = req.params.id;
  Type.findByIdAndDelete(typeId)
    .then(data => res.status(200).send("type deleted"))
    .catch(err => res.status(400).send(err.message));
});


module.exports = router;
