# A Blogging Platform

## This project is built using Node and React.

### Author : Ankur Srivastava


npm packages used : express-validator jsonwebtoken express-jwt formidable lodash slugify string-strip-html mongoose express


Clone the repo.

Add a .env file in backend with configuration that look like

NODE_ENV=development
PORT=8000
CLIENT_URL=http://localhost:3000


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

Sample JSON body to test

{
    "name": "Test",
    "email": "a@a.com",
    "password": "123456"
}
