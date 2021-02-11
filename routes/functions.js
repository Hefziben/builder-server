var express = require("express");
var router = express.Router();
var FormData = require("../modelos/formData");
const Forms = require('../modelos/form');
const Fnc = require('../modelos/function')


//get functions
router.get("/", function(req, res, next) {
  Fnc.find({}, (err, ides) => {
    if (res.status == 400) {
      res.send({ mensaje: "error in request", res: status, err });
    } else {
      res.send(ides);
    }
  });
});

//add function
router.post("/", (req, res) => {
  const fn = req.body;
  const createFn = new Fnc(fn);
  createFn.save((err, new_Fn) => {
    if (err) {
      const errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send("Function save success");
    }
  });
});


//get type by ID
router.get("/:id", (req, res) => {
  var fncId = req.params.id;
  Fnc.findById(fncId)
    .exec()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

//Update fnc
router.put("/:id", (req, res) => {
  const fncId = req.params.id;
  console.log(fncId);

  Fnc.findByIdAndUpdate(fncId, { $set: req.body }, { new: true })
    .then(data => res.status(200).send("Updated"))
    .catch(err => res.status(400).send(err));
});

//delete type
router.delete("/:id", (req, res) => {
  const fncId = req.params.id;
  Fnc.findByIdAndDelete(fncId)
    .then(data => res.status(200).send("function deleted"))
    .catch(err => res.status(400).send(err.message));
});


async function inFunction() {
  console.log("here");
  Forms.find({}, (err, forms) => {
    if (err) {
    } else {
      for (const form of forms) {
        if (form.function) {
          const id = form._id
          const formId = form.formId;
          const myFunction = form.function;
          console.log(myFunction);

          FormData.find({ "formData.formId": formId }, (err1, formData) => {
            let myData = formData
            console.log(myData);
            if (err1) {
              console.log(err1);
            } else {
              var code = myFunction.function
              console.log(code);              
                            
              var infunction = new Function ('form', code)
              
              var result = {
                functionResult:infunction(myData)
              }
             
              Forms.findByIdAndUpdate(id, { $set: result }, { new: true })
              .then(data => console.log(data))
              .catch(err => console.log(err));
              

            }
          });
        }
      }
    }
  });

}


/* GET formData by id. */
router.get("/formId/:id", function(req, res, next) {
  var formId = req.params.id;
  

});



//add formData
router.post("/", (req, res) => {
  const formData = req.body;
  const new_FormData = new FormData(formData);
  new_FormData.save((err, response) => {
    if (err) {
      const errMsj = err.message;

      res.send(errMsj);
    } else {
      res.send("FormData save success");
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




module.exports = router;
// setInterval(() => {
//   inFunction();
// }, 350000);

inFunction();
