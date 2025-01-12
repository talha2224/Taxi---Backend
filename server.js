const express = require("express")
const cors = require("cors")
const dbConnection = require("./config/db.connection")
const combineRouter = require("./routes/index")
require("dotenv").config()





const app = express()
const port = process.env.PORT || 3002
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/api/v1",combineRouter)
dbConnection()

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})