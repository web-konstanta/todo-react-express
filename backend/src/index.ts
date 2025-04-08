import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { userRouter } from './routes/user.routes'

dotenv.config()

const PORT = process.env.PORT || 3000

const app: Express = express()

app.use(express.json())
app.use('/api/todo', userRouter)
app.use((req: Request, res: Response) => {
	res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})