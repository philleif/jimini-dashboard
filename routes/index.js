"use strict"

const express = require("express")
const db = require("../lib/db")
const router = express.Router()

/* GET home page. */
router.get("/", async (req, res, next) => {
  let closedPositions = await db.Position.find({ status: "CLOSED" }).select({
    pair: 1,
    amount: 1,
    timeframe: 1,
    time: 1,
    exchange: 1,
    openPrice: 1,
    closePrice: 1,
    _id: 0
  })

  let openPositions = await db.Position.find({ status: "OPEN" }).select({
    pair: 1,
    amount: 1,
    timeframe: 1,
    time: 1,
    exchange: 1,
    openPrice: 1,
    _id: 0
  })

  let value = 0
  for (let position of closedPositions) {
    value += position.amount * (position.closePrice - position.openPrice)
  }

  res.render("index", {
    positions: {
      today: openPositions,
      total: openPositions,
      open: openPositions,
      closed: closedPositions,
      value: Math.round(value)
    }
  })
})

module.exports = router
