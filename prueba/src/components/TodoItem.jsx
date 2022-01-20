import React, { useState } from "react";

import { useField } from "../hooks/useField";

export function TodoItem({ lista, toggleTask, deleteTask, editTask }) {
  const { id, description, completed } = lista;

  const [isEditing, setIsediting] = useState(false);
  const descriptionField = useField(description);

  const handleTaskClick = () => {
    toggleTask(id);
  };

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  const handledEditTask = () => {
    setIsediting(true);
  };
  const handledCancelTask = () => {
    setIsediting(false);
    descriptionField.setvalue(description);
  };

  const handledSave = () => {
    editTask(id, descriptionField.value);
    setIsediting(false);
  };

  return (
    <li>
      <input type={"checkbox"} checked={completed} onChange={handleTaskClick} />
      {isEditing ? <input {...descriptionField} /> : description}

      {!isEditing && <button onClick={handledEditTask}>Editar</button>}
      {isEditing && <button onClick={handledCancelTask}>Cancelar</button>}
      {isEditing && <button onClick={handledSave}>Guardar</button>}
      <button onClick={handleDeleteTask}>Eliminar Tarea</button>
    </li>
  );
}
