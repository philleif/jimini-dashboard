"use strict"

const express = require("express")
const db = require("../lib/db")
const router = express.Router()

/* GET home page. */
router.get("/", async (req, res, next) => {
  let allPositions = await db.Position.find({ status: "CLOSED" }).select({
    openPrice: 1,
    closePrice: 1,
    _id: 0
  })

  res.render("index", {
    positions: {
      today: allPositions,
      total: allPositions,
      open: allPositions,
      closed: allPositions
    }
  })
})

module.exports = router