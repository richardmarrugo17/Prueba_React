import React from "react";
import { TodoItem } from "./TodoItem";

export function TodoList({ listas, ...props }) {
  return (
    <ul>
      {listas.map((lista) => (
        <TodoItem key={lista.id} lista={lista} {...props} />
      ))}
      {!listas.length && <p>No hay Items en la lista</p>}
    </ul>
  );
}
