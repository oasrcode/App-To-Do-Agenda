const { photo } = require("../models");
const db = require("../models");
const Photo = db.photo;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const photo = {
    title: req.body.title,
    comment: req.body.comment,
    filename: req.file ? req.file.filename : ""
  };



  Photo.create(photo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });
};


exports.findAll = (req, res) => {
    Photo.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving portraits."
        });
      });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Photo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find a portrait with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ToDo with id=" + id
      });
    });
};





exports.update=(req,res)=>{
  const id = req.params.id;
  
  const photo = {
    title: req.body.title,
    comment: req.body.comment,
    filename: req.file ? req.file.filename : ""
  };

  Photo.update(photo, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Photo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Portrait was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete a portrait with id=${id}. Maybe ToDo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ToDo with id=" + id
      });
    });
};


