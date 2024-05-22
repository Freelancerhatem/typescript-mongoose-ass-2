import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import productRoutes from './app/Routes/ProductRoutes';
import orderRoutes from './app/Routes/OrderRoutes';
const app: Application = express()
const port = 3000

//parser
app.use(express.json())
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('Server Running Successfully!');
});
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send(`Your route "${req.path}" is not found.`);
});
export default app