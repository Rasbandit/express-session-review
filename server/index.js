const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  console.log('first');
  if (!req.session.todo) {
    console.log('there was no todo');
    req.session.todo = []
  }
  next()
})

app.use((req, res, next) => {
  console.log('modified');
  req.body.todo = req.body.todo + ' Get nothing'
  next()
})

app.get('/api/todo', (req, res) => {
  res.status(200).send(req.session.todo);
})

app.post('/api/todo', (req, res) => {
  console.log('post made');
  req.session.todo.push(req.body.todo)
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('running')
})