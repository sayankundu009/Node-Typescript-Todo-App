import fs from "fs";
import path from "path";
import TodoType from "../types/Todo";

const filePath = path.join(path.dirname(__dirname), "data", "todos.json");

export default class Todo {
    public title: string;
    private id: number;

    constructor(title: string) {
        this.id = Date.now();
        this.title = title;
    }

    public static all(callback: (err: any, data: TodoType[]) => void): void {

        fs.readFile(filePath, 'utf8', (err, todos) => {
            if (err) console.log(err)

            const todoList = JSON.parse(todos)

            callback(err, todoList)
        })
    }

    private static saveToFile(todoList: TodoType[], callback: (err: any) => void): void {

        fs.writeFile(filePath, JSON.stringify(todoList), (err) => {

            if (err) console.log(err)

            callback(err);
        })

    }

    public save(callback: (err: any) => void): void {
        Todo.all((err, todos) => {

            if (err) console.log(err)

            let todoList = [];

            todoList = todos;

            todoList.push({ id: this.id, title: this.title });

            Todo.saveToFile(todoList, callback);
        })
    }

    public static delete(id: number, callback: (err: any) => void): void {
        Todo.all((err, todos) => {

            if (err) console.log(err)

            let todoList = [];

            todoList = todos;

            todoList = todoList.filter((todo: TodoType) => todo.id != id);

            Todo.saveToFile(todoList, callback);
        })
    }
}