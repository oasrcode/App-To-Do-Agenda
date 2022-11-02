module.exports = (sequelize, Sequelize) => {
    const ToDo = sequelize.define("toDo", {

      title: {
        type: Sequelize.STRING
      },
      summ: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      type:{
        type: Sequelize.STRING 
      },
    });

    return ToDo;
  };

