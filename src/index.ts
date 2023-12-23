import express, { Application, Request, Response } from "express"
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const PORT = 8000;


const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.listen(
  PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  }
)

