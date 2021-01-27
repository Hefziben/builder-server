var express = require("express");
var router = express.Router();
var Category = require("../modelos/category");
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

/* GET categoryes listing. */
router.get("/", function(req, res, next) {
  Category.find({}, (err, categoryes) => {
    if (res.status == 400) {
      res.send({ mensaje: "error in request", res: status, err });
    } else {
      res.send(categoryes);
    }
  });
});



//add category
router.post("/", (req, res) => {
  const category = req.body;
  const createCategory = new Category(category);
  createCategory.save((err, new_Category) => {
    if (err) {
      errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send("Category save success");
    }
  });
});


//get category by ID
router.get("/:id", (req, res) => {
  var categoryId = req.params.id;
  Category.findById(categoryId)
    .exec()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

//Update Category
router.put("/:id", (req, res) => {
  const categoryId = req.params.id;
  console.log(categoryId);

  Category.findByIdAndUpdate(categoryId, { $set: req.body }, { new: true })
    .then(data => res.status(200).send("Updated"))
    .catch(err => res.status(400).send(err));
});

//delete category
router.delete("/:id", (req, res) => {
  const categoryId = req.params.id;
  Category.findByIdAndDelete(categoryId)
    .then(data => res.status(200).send("category deleted"))
    .catch(err => res.status(400).send(err.message));
});


module.exports = router;
