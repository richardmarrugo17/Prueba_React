import React, { useState } from "react";

export function TodoItem({ lista, toggleTask, deleteTask, editTask }) {
    const {id, task, completed} = lista;
    const [description, setDescription] = useState(task);

    const [isEdited, setIsedited] = useState(false);


    const handleTaskClick = () =>{
        toggleTask(id);
    };

    const handleDeleteTask = () =>{
        deleteTask(id);
    };

    const handledEditTask = () =>{
        editTask(id, description);
    };
    const handledSave 
    return (
        <li>
            <input type={"checkbox"} checked={completed} onChange={handleTaskClick} />
            {task}
            <button onClick={handledEditTask}>editar</button>
            <button onClick={handledEditTask}>Guardar</button>
            <button onClick={handleDeleteTask}>Eliminar Tarea</button>
        </li>
    );
}