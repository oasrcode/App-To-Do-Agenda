const db = require("../models");
const ToDo = db.toDo;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const toDO = {
    title: req.body.title,
    summ: req.body.summ,
    time: req.body.time,
    type: req.body.type
  };

  ToDo.create(toDO)
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
    ToDo.findAll({
     order: [ [ 'time', 'ASC' ]]
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ToDo."
        });
      });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ToDo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ToDo with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ToDo with id=" + id
      });
    });
};





exports.update = (req, res) => {
  const id = req.params.id;

  ToDo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ToDo with id=${id}. Maybe Todo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ToDo with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  ToDo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ToDo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ToDo with id=${id}. Maybe ToDo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ToDo with id=" + id
      });
    });
};


