const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./Controllers/register');
const signin = require('./Controllers/signIn');
const profile = require('./Controllers/profile');
const images = require('./Controllers/images');

const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());



const db = knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1', //localhost
          user : 'postgres', //add your user name for the database here
          port: 5432, // add your port number here
          password : '7777', //add your correct password in here
          database : 'smartBrain' //add your database name you created here
        }
});

app.get('/', (req, res) => {console.log})

app.post('/register', register.handleRegister(db, bcrypt, saltRounds))

app.post('/signin', signin.handleSignIn(db, bcrypt))

app.get('/profile/:id', profile.getProfile(db))

app.put('/images', images.searchImage(db))

app.put('/imageurl', images.getClarifaiReq())

app.listen(process.env.PORT, () => {
	console.log(process.env.PORT)
});