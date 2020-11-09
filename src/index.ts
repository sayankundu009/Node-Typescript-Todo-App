import express from "express"
import path from "path"
import homeRoutes from "./Routes/home"
import todoRoutes from "./Routes/todo"

const app = express();
const PORT: string | number = process.env.PORT ?? 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }))

app.use("/", homeRoutes);
app.use("/todo", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
});