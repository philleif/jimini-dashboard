"use strict"

const express = require("express")
const db = require("../lib/db")

const router = express.Router()

router.get("/stats", async (req, res, next) => {
  let nextJob = await db.AgendaJob.findOne()

  let now = new Date()
  let nextTime = new Date(nextJob.nextRunAt)
  let eta = Math.abs(nextTime.getTime() - now.getTime())

  let closedPositions = await db.Position.find({ status: "CLOSED" })

  // net profit
  let net = 0
  for (let p of closedPositions) {
    net += Math.round(p.amount * (p.closePrice - p.openPrice))
  }

  // hit rate
  let hits = 0
  for (let p of closedPositions) {
    if (p.closePrice - p.openPrice > 0) {
      hits++
    }
  }
  let hitRate = Math.round((hits / closedPositions.length) * 100)

  res.json({
    stats: {
      nextJob: eta,
      hitRate: hitRate,
      net: net
    }
  })
})

/* GET home page. */
router.get("/positions", async (req, res, next) => {
  let positions = await db.Position.find()
    .select({
      pair: 1,
      amount: 1,
      timeframe: 1,
      time: 1,
      exchange: 1,
      openPrice: 1,
      closePrice: 1,
      status: 1,
      net: 1,
      _id: 0
    })
    .sort("-time")

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
