"use strict"

require("dotenv").config()

const mongoose = require("mongoose")
const DB_URL = process.env.DB_URL

const JobSchema = new mongoose.Schema(
  {
    nextRunAt: Date
  },
  { collection: "agendaJobs" }
)

const AgendaJob = mongoose.model("AgendaJob", JobSchema)

const PositionSchema = new mongoose.Schema({
  pair: String,
  timeframe: String,
  exchange: String,
  openPrice: Number,
  closePrice: Number,
  time: Number,
  status: String,
  amount: Number
})

const Position = mongoose.model("Position", PositionSchema)

async function run() {
  // No need to `await` on this, mongoose 4 handles connection buffering
  // internally
  mongoose.connect(DB_URL)
}

run().catch(error => console.error(error.stack))

module.exports = {
  Position,
  AgendaJob
}
