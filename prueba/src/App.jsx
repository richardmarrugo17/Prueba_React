import React, { Fragment, useState, useRef, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import { TodoList } from "./components/TodoList";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App(){
    const [listas, setListas] = useState(() => JSON.parse(localStorage.getItem("listApp.lists" ) || [] ));

    const taskRef = useRef();

    useEffect(() =>{
        localStorage.setItem("listApp.lists", JSON.stringify(listas));
    }, [listas.length]);

    useEffect(() =>{
        const storedTasks = JSON.parse(localStorage.getItem("listApp.lists"));
        if (storedTasks){
            setListas(storedTasks);
        }
    }, []);

    const toggleTask = (id) => {
        const newTasks = [...listas];
        const task = newTasks.find((task) => task.id === id);
        task.completed = !task.completed;
        setListas(newTasks);
    };

    const handleTaskAdd = () =>{
        const task = taskRef.current.value;

        if (task === "") return;

        setListas((prevTasks) =>{
            return[...prevTasks, {id: uuidv4(), task, completed:false}];
        });
        taskRef.current.value = null;
    };

    const handleClearAll = () =>{
        const newTasks = listas.filter((task) => !task.completed);
        setListas(newTasks);
    };

    const deleteTaskById = (id) => {
        const newTasks = listas.filter((task) => task.id !== id );
        setListas(newTasks);
    };

    return (
        <Fragment>
            <TodoList listas={listas} toggleTask={toggleTask} deleteTask={deleteTaskById}/>
            <input ref={taskRef} type="text" placeholder="Nueva Tarea" />
            <button onClick={handleTaskAdd}>Agregar Tarea</button>
            
            <div>
                Te quedan {listas.filter((task) => !task.completed).length} tareas por terminar
            </div>
        </Fragment>
    ); 
}