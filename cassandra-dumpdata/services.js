const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')


const cors = require("cors");
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)



app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/api/tags?:name', db.getTags)


app.get('/api/customers', db.getCustomers)


app.listen(5252, () => {
  console.log(`App running on ports 5252.`)
})
