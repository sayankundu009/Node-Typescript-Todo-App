import { Router } from "express"
import Todo from "../models/Todo";

const router = Router();

router.post("/", (req, res) => {

    const { todo } = req.body;

    if (todo.length) {

        const todoList = new Todo(todo.toString());

        todoList.save((err: string) => {
            res.redirect("/");
        })

    } else {
        res.redirect("/");
    }
});

router.get("/delete/:todoId", (req, res) => {

    const { todoId } = req.params;

    if (todoId) {
        Todo.delete(parseInt(todoId), (err: any) => {
            res.redirect("/");
        });

    } else {
        res.redirect("/");
    }
});

export default router;