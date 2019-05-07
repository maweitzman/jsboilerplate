# Full-Stack JavaScript Application Boilerplate

## Table of Contents
- **[Description](#description)**
- **[Technologies](#technologies-frameworks-and-node-modules-)**
- **[Installation & Startup](#installation-startup)**

## Description
The sole and entire purpose of this entire repository is to provide a single-language, modular and current approach to a full-stack, server-side rendered, JavaScript application. This repository encompasses/utilizes server-side rendering with Next, front-end components using React, a fully functional Node/Express API, complete implementation of MVC concept, complete implementation of front-end store concept with Mobx, complete implementation of back-end request validation and front-end view models, along with complete jwt, passport and bcyrpt authentication implementation. Configured with fixtures for rapid development startup, complete Formik implementation to remove form management from component state, and file structure based routing for the added ***WOW*** factor, ***jsboilerplate*** should be all you need to create robust, dynamic, full-stack JavaScript applications.

## Technologies *(main frameworks and node modules)*
| Backend / API | Frontend / Client |
| --- | --- |
| **[Node](https://nodejs.org/)** - *server* | **[Next](https://nextjs.org/)** - *framework* |
| **[Express](https://expressjs.com/)** - *framework* | **[React](https://reactjs.org/)** - *user interface (ui) library* |
| **[Passport](http://www.passportjs.org/)** - *authentication strategy* | **[Mobx](https://mobx.js.org/)** - *state management* |
| **[JSON Web Token (JWT)](https://jwt.io/)** - *authentication token* | **[SASS](https://sass-lang.com/)** - *styles preprocessor* |
| **[Joi](https://github.com/hapijs/joi/)** - *request validation* | **[Reactstrap](https://reactstrap.github.io/)** - *bootstrap for react* |
| **[Sequelize](http://docs.sequelizejs.com/)** - *object relational mapper (ORM)* | **[Formik](https://jaredpalmer.com/formik/)** - *form library with internal state* |
| **[MySQL](https://www.mysql.com/)** - *database* | **[Font Awesome](https://fontawesome.com/)** - *icon library* |
| **[Bcrypt](https://www.npmjs.com/package/bcrypt/)** - *password encryption* | **[Yup](https://www.npmjs.com/package/yup/)** - *form state validation* |

## Installation & Startup
1. Clone the repository and install the dependencies:
```
sudo git clone https://wwww.github.com/maweitzman/jsboilerplate
cd jsboilerplate
npm install
```
2. Create a ***/.env*** file in the root of the application directory. Copy and paste the code below, and replace the temporary values with the values you desire if necessary:
```
NODE_ENV='development'
PORT=5000
HOST='localhost'
USERNAME='root'
PASSWORD='root'
JWT_SECRET='secretkey'
COOKIE_SECRET='secretkey'
```
3. Replace ***'5000'*** in ***api_url*** in the ***development*** constant in ***/api/config/config.js*** with the port number you specified in your ***/.env*** file from step 2.
4. Replace ***'jsboilerplate'*** in the ***'database'*** object in the ***development*** constant in ***/api/config/config.js*** with the database name you desire to use for your application.
5. Start the application:
```
npm start
```
6. Open your browser and navigate to your ***localhost*** at the port number you specified in your ***/.env*** file. Login with the username: ***admin*** and the password: ***admin***.