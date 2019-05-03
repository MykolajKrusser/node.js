const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const path = require('path');
const rootDir = require('./utils/path');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')));

const usersList = []

app.get('/users', (req, res) => res.render('userList', {pageTitle: 'user list', users: usersList}))
app.post('/newUser', (req, res)=> {
  usersList.push({ name: req.body.userName });
  res.redirect('/')
})
app.use('/', (req, res) => res.render('addUsers', {pageTitle: 'add user'}))

app.listen(port)