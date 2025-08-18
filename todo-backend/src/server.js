import express from 'express';
import cors from 'cors';
import './config.js';
// MongoDB 연결
import todoRoutes from './routes/todo.routes.js';
import { setupSwagger } from './swagger.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);
setupSwagger(app);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 에러 발생' });
});
export default app;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);