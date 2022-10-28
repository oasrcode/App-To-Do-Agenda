module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photo", {

      title: {
        type: Sequelize.STRING
      },
      filename:{
        type: Sequelize.STRING 
      },
    });
  
    return Photo;
  };