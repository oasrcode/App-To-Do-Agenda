require('dotenv').config();

// // module.exports = {
// //     HOST: "localhost",
// //     USER: "root",
// //     PASSWORD: "",
// //     DB: "agenda",
// //     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
// //   };
// module.exports = {
//   HOST: process.env.HOST,
//   USER: process.env.USER,
//   PASSWORD: process.env.PASSWORD,
//   DB: process.env.DB,
//   dialect: 'mysql'
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: process.env.DIALECT,
    pool: process.env.POOL
  };