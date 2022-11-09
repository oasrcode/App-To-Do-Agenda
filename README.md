# App To-Do/Agenda

## Table of Contents
 - [Intro](#intro)
 - [Technologies](#technologies)
 - [Requirements](#requirements)
 - [How to clone](#how-to-clone)
 - [Postman](#postman)


### Intro
***
To-Do/Agenda App lets us create cards with our schelude and, also, you can save your photos.

### Technologies
***
* [Ionic](https://ionic.io/)
* [React](https://es.reactjs.org/)
* [Node.js](https://nodejs.org/es/)
* [express.js](https://expressjs.com/es/)
* [Sequelize](https://sequelize.org/)
* [Mysql](https://www.mysql.com/)

### Requirements

- [Nodejs](https://nodejs.org/es/download/) v16.16.0 .
- IDE [VS Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) . (Optional)
- [Git](https://git-scm.com/downloads) .

### How to clone

```bash
cd existing_folder
git clone https://github.com/oasrcode/App-To-Do-Agenda.git

```
#### Install nodejs node_modules

Open a new terminal to run the backend

```bash
npm install

```

:alert: In the root of the backend you must create a folder public and inside other named images to store photo

#### Install ionic node_modules

Same with the frontend

```bash
ionic serve

```
 :warning: Type 'y' to install react scripts.
#### Run

Execute xampp and create a database with the name 'DB: ...' [link](https://github.com/oasrcode/App-To-Do-Agenda/blob/main/AgendaApp-backend/app/config/db.config.js)

On the backend

```bash
node server.js

```
On the frontend
```bash
ionic serve

```
### Postman

Link to postman -> [documentación](https://www.postman.com/restless-firefly-229974/workspace/oasrcode/documentation/20512831-53234c34-ccfa-4941-8ee1-0ce41650c803)
