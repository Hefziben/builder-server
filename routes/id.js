var express = require("express");
var router = express.Router();
var Id = require("../modelos/id");

/* GET ides listing. */
router.get("/", function(req, res, next) {
  Id.find({}, (err, ides) => {
    if (res.status == 400) {
      res.send({ mensaje: "error in request", res: status, err });
    } else {
      res.send(ides);
    }
  });
});



//add id
router.post("/", (req, res) => {
  const id = req.body;
  const createId = new Id(id);
  createId.save((err, new_Id) => {
    if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send("Id save success");
    }
  });
});


//get id by ID
router.get("/:id", (req, res) => {
  var id = req.params.id;
  Id.findOne({value:id}, (err, response) => {
    if (res.status == 400) {
      res.send({ mensaje: "error en la petición", res: status, err });
    } else {
      if (response) {
        res.send('invalid');
      } else{
        res.send('valid');
      }

    }
  });
});


//delete id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Id.findByIdAndDelete(id)
    .then(data => res.status(200).send("id deleted"))
    .catch(err => res.status(400).send(err.message));
});


module.exports = router;
