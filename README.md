# A Blogging Platform

## This project is built using Node and React.


npm packages used : express-validator jsonwebtoken express-jwt formidable lodash slugify string-strip-html mongoose express


Clone the repo.

Navigate to backend.

$ cd backend
$ npm install
$ npm start

Navigate to frontend.

$ cd frontend
$ npm install
$ npm start


To Test

POST http://localhost:8000/api/signup

JSON Body : 

{
    "name": "Test",
    "email": "a@a.com",
    "password": "123456"
}