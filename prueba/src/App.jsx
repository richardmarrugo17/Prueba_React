import React, { Fragment, useState, useRef, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import { TodoList } from "./components/TodoList";

export function App(){
    const [listas, setListas] = useState([
        {id:1, task:"Tarea 1", completed:false},
    ]);

    const taskRef = useRef();

    useEffect(() =>{
        localStorage.setItem("listApp.lists", JSON.stringify(listas));
    }, [listas]);

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

    return (
        <Fragment>
            <TodoList listas={listas} toggleTask={toggleTask}/>
            <input ref={taskRef} type="text" placeholder="Nueva Tarea" />
            <button onClick={handleTaskAdd}>+</button>
            <button onClick={handleClearAll}>-</button>
            <div>
                Te quedan {listas.filter((task) => !task.completed).length} tareas por terminar
            </div>
        </Fragment>
    ); 
}