const combineRouter = require("express").Router()


combineRouter.use("/account",require("./account.router"))
combineRouter.use("/card",require("./card.router"))
combineRouter.use("/booking",require("./booking.router"))
combineRouter.use("/category",require("./category.router"))
combineRouter.use("/dashboard",require("./dashboard.router"))
combineRouter.use("/wallet",require("./wallet.router"))





module.exports = combineRouter

