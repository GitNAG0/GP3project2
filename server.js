const express = require('express')

const app = express()

app.listen(process.env.PORT,() => console.log(`App listening at localhost://${process.env.PORT}`))