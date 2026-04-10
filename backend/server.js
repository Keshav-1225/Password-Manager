import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import database from './config/db.js'
import router from './routes/route.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server working")
});


// async () => await database()
database()

app.use("/api",router)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})