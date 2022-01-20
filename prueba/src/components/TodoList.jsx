import React from "react";
import { TodoItem } from "./TodoItem";

export function TodoList({ listas, toggleTask, deleteTask }){
    return (
        <ul>
            {listas.map((lista) =>(
                <TodoItem key={lista.id} lista={lista} toggleTask={toggleTask} deleteTask={deleteTask} />
            ))}
        </ul>
    );
}