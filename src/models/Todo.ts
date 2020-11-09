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

    static all(callback: (err: any, data: TodoType[]) => void): void {

        fs.readFile(filePath, 'utf8', (err, todos) => {
            if (err) console.log(err)

            const todosList = JSON.parse(todos)

            callback(err, todosList)
        })
    }

    save(callback: (err: any) => void): void {
        fs.readFile(filePath, 'utf8', (err, todos) => {

            if (err) console.log(err)

            let todosList = [];

            todosList = JSON.parse(todos);

            todosList.push({ id: this.id, title: this.title });

            fs.writeFile(filePath, JSON.stringify(todosList), (err) => {

                if (err) console.log(err)

                callback(err);
            })
        })
    }

    static delete(id: number, callback: (err: any) => void): void {
        fs.readFile(filePath, 'utf8', (err, todos) => {

            if (err) console.log(err)

            let todosList = [];

            todosList = JSON.parse(todos);

            todosList = todosList.filter((todo: TodoType) => todo.id != id);

            fs.writeFile(filePath, JSON.stringify(todosList), (err) => {

                if (err) console.log(err)

                callback(err);
            })
        })
    }
}