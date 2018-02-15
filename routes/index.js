"use strict"

const express = require("express")
const db = require("../lib/db")
const router = express.Router()

/* GET home page. */
router.get("/positions", async (req, res, next) => {
  let positions = await db.Position.find().select({
    pair: 1,
    amount: 1,
    timeframe: 1,
    time: 1,
    exchange: 1,
    openPrice: 1,
    closePrice: 1,
    status: 1,
    _id: 0
  })

  let openPositions = positions.filter(position => position.status === "OPEN")
  let closedPositions = positions.filter(
    position => position.status === "CLOSED"
  )

  console.log(closedPositions)

  res.json({
    positions: {
      open: openPositions,
      closed: closedPositions
    }
  })
})

router.get("/", async (req, res, next) => {
  res.render("index")
})

module.exports = router
