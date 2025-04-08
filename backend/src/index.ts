import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { todoRouter } from './routes/todo.routes'
import { authRouter } from './routes/auth.router'
import { httpErrorMiddleware } from './middlewares/http-error.middleware'

dotenv.config()

const PORT = process.env.PORT || 3000

const app: Express = express()

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/todo', todoRouter)
app.use((req: Request, res: Response) => {
	res.status(404).json({ message: 'Route not found' })
})
app.use(httpErrorMiddleware)

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})