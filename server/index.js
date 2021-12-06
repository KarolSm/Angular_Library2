const { xml } = require('./XMLDataParserService.js')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

async function init() {

  const data = await xml.getData()

  app.get('/', (_req, res) => {
    res.json(data)
  })

  app.get('/pisma', (req, res) => {
    console.log(req.url)
    let resp_obj = []
    for (let key of Object.keys(data)) {
      console.log(key)
      resp_obj.push(data[key].zmienne)
    }
    resp_obj.sort((a, b) => (a.klik > b.klik) ? 1 : ((b.klik > a.klik) ? -1 : 0))

    res.json(resp_obj)
  })

  app.get('/lata/:magazyn', (req, res) => {
    console.log(req.url)
    console.log(req.query)
    let resp_obj = []
    if (data[req.params.magazyn] != undefined) {
      resp_obj = data[req.params.magazyn].lata
    }
    res.json(resp_obj)

  })

  app.get('/dane/:magazyn', (req, res) => {
    console.log(req.url)
    console.log(req.query)
    let resp_obj = []
    if (data[req.params.magazyn] != undefined) {
      for (let [key, value] of Object.entries(data[req.params.magazyn].czasopisma)) {
        if (req.query.rok == undefined | value.$.rok == req.query.rok) {
          resp_obj.push(value)
        }
      }
    }
    res.json(resp_obj)
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

}

init()