const express = require('express')

const router = express.Router()
const fs = require('fs')

router.post('/documentWriter',(req,res) => {
  console.log(req.body)
  let {name, canvas} = req.body
  fs.writeFileSync(`./output/${name}`,canvas,err => console.log(err))
  res.sendStatus(200)
})

module.exports = router