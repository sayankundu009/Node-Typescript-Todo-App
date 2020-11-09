import { Router } from "express"
import Todo from "../models/Todo";
import TodoType from "../types/Todo";

const router = Router();

router.get("/", (req, res) => {

    Todo.all((err: any, data: TodoType[]) => {

        if (err) throw err;

        res.render("home", { todos: data });
    });

});

export default router;