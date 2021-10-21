const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');


const app = express();
const saltRounds = 10;


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }

    ],
    login: [
        {
            id: '987',
            hash: '$2b$10$7O8RCOygHzYLqulOFj2KPeC8ELhjGvDRce3LDr1X5UxK2BX7sSsrm',
            email:'john@gmail.com'
        }
    ]    
 }

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res)=> {
   res.send(database.users); 
})

app.post('/signin', (req, res)=> {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date() 
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
           found = true;
           return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('Not Found');
    }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
    if (user.id === id) {
       found = true;
       user.entries++
       return res.json(user.entries);
    }   
})
if (!found) {
        res.status(400).json('Not Found');
    }
})


app.listen(5000, ()=> {
    console.log('App is running on port 5000');
})
