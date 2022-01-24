# A Blogging Platform

## This project is built using Node, React and Next.

### Author : Ankur Srivastava


npm packages used : 
    express-validator 
    jsonwebtoken 
    express-jwt 
    formidable 
    lodash 
    slugify 
    string-strip-html 
    mongoose 
    express
    nprogress : Progree Bar
    @zeit/next-css


Tech Stack

    frontend : Next : https://nextjs.org/docs/getting-started
    backend  : Node : https://nodejs.org/en/
    bootstrap

Approach

For adding a feature like Category, which needs CRUD operations via API

    1. Add schema
    2. Add routes / APIs : CRUD operations
    3. Add to server.js
    4. Create UI to enable users to perform CRUD


Clone the repo.

Add a .env file in backend with configuration that look like

    NODE_ENV=development
    PORT=8000
    CLIENT_URL=http://localhost:3000
    MONGO_URL=mongodb+srv://<user>:<pwd>@<mongo_url>/<database_name>?retryWrites=true&w=majority

Add a next.config.js file in /frontend. This will have env variables for Next project

    module.exports = {
        publicRuntimeConfig: {
            APP_NAME: 'Articles',
            API_DEV: 'http://localhost:8000/api',
            PRODUCTION: false
        }
    }


Navigate to backend.

    $ cd backend
    $ npm install
    $ npm start


Navigate to frontend.

    $ cd frontend
    $ npm install
    $ npm dev build


URLs

    frontend - http://localhost:3000/
    backend  - http://localhost:8000/


To Test

POST http://localhost:8000/api/signup

Sample JSON body to test

    {
        "name": "Test",
        "email": "a@a.com",
        "password": "123456"
    }

Notes

I have used an older version of string-strip-html. The new one requires import to be used.
