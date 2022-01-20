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
      <div className="py-1">
        <input style={{marginRight: '0.5em'}} type={"checkbox"} checked={completed} onChange={handleTaskClick} />
        {isEditing ? <input {...descriptionField} /> : description}
        {!isEditing && <button className="btn btn-primary btn-sm" style={{marginLeft: '0.5em'}} onClick={handledEditTask}>Editar</button>}
        {isEditing && <button className="btn btn-primary btn-sm" style={{marginLeft: '0.5em'}} onClick={handledCancelTask}>Cancelar</button>}
        {isEditing && <button className="btn btn-success btn-sm" style={{marginLeft: '0.5em'}} onClick={handledSave}>Guardar</button>}
        <button className="btn btn-primary btn-sm" style={{marginLeft: '0.5em'}} onClick={handleDeleteTask}>Eliminar Tarea</button>
      </div>
    </li>
  );
}
