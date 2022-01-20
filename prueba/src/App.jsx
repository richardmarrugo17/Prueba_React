import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";
import catsApi from "./api/catsApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useField } from "./hooks/useField";

export function App() {
  const [listas, setListas] = useState(() => {
    const lista = localStorage.getItem("listApp.lists");
    if (lista) return JSON.parse(lista);
    return [];
  });

  const search = useField("");

  const catsnumber = useField("");

  const taskRef = useRef();

  useEffect(() => {
    localStorage.setItem("listApp.lists", JSON.stringify(listas));
  }, [listas.length]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("listApp.lists"));
    if (storedTasks) {
      setListas(storedTasks);
    }
  }, []);

  const toggleTask = (id) => {
    const newTasks = [...listas];
    const task = newTasks.find((task) => task.id === id);
    task.completed = !task.completed;
    setListas(newTasks);
  };

  const handleTaskAdd = () => {
    const description = taskRef.current.value;

    if (description === "") return;

    setListas((prevTasks) => {
      return [...prevTasks, { id: uuidv4(), description, completed: false }];
    });
    taskRef.current.value = null;
  };

  const deleteTaskById = (id) => {
    const newTasks = listas.filter((task) => task.id !== id);
    setListas(newTasks);
  };
  const editTaskDescription = (id, description) => {
    const newTasks = listas.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          description,
        };
      }
      return task;
    });
    setListas(newTasks);
  };
  const listaFiltered = listas.filter(({ description }) =>
    description.includes(search.value)
  );
  const addTaskAleatory = async () => {
    if (catsnumber) {
      const response = await catsApi(Number(catsnumber.value));
      const newTasks = response.map((cat) => ({
        id: uuidv4(),
        description: cat.data.fact,
        completed: false,
      }));
      setListas([...listas, ...newTasks]);
    }
  };
  return (
    <Fragment>
      <input placeholder="Buscar" {...search} />
      <TodoList
        listas={listaFiltered}
        toggleTask={toggleTask}
        deleteTask={deleteTaskById}
        editTask={editTaskDescription}
      />
      <input ref={taskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTaskAdd}>Agregar Tarea</button>
      <div>
        <input {...catsnumber} type="number" placeholder="numeros" />
        <button onClick={addTaskAleatory}>Agregar Aleatoriamente</button>
      </div>
      <div>
        Te quedan {listas.filter((task) => !task.completed).length} tareas por
        terminar
      </div>
    </Fragment>
  );
}
