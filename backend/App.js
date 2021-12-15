const express = require('express')
const app = express()
const port = 5000
const db = require('./database/connect')
const dotenv=require('dotenv');
dotenv.config();
app.use(require('cors')())
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
const exhbs= require('express-handlebars');
const UserModel=require('./database/schemas/User')
const ProductModel= require('./database/schemas/Product');

app.set('view engine', 'handlebars')
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/verify', (req, res) => {
    console.log(req.body);
    const userMail=req.body.mail;
    UserModel.findOne(userMail,(err,docs)=>{
      if(!err)
      {
        console.log(docs.password);
        res.send(docs);
      }
      else{
        res.send(err);
      }
    })
})

app.get('/getProducts', (req, res) => {
  ProductModel.find((err,docs)=>{
    if(!err)
    {
     res.send(docs);
    }
    else{
      res.send(err);
    }
  })
})

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`)
})