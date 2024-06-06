import { connectDb } from "./config/db.js";
import createServer from "./config/serverConfig.js";
import incomeExpenseRouter from "./routes/incomeExpenseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv"

dotenv.config();

connectDb()

const app = createServer();

app.use('/api/incomeExpense', incomeExpenseRouter)
app.use('/api/user', userRouter)

const PORT = 3000;

app.listen(PORT, console.log(`Server Run at port ${PORT}`));
