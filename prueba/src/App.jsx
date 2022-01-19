import React, { Fragment, useState, useRef } from "react";
import {v4 as uuidv4} from "uuid";
import { TodoList } from "./components/TodoList";

export function App(){
    const taskRef = useRef();

    const handleTaskAdd = () =>{
        const task = taskRef.current.value;

        if (task === "") return;

        setListas((prevTasks) =>{
            return[...prevTasks, {id: uuidv4(), task, completed:false}];
        });
        taskRef.current.value = null;
    };

    const [listas,setListas] = useState([
        {id: 1, task:"Tarea", completed:false},
    ]);
    return (
        <Fragment>
            <TodoList listas={listas}/>
            <input ref={taskRef} type="text" placeholder="Nueva Tarea" />
            <button onClick={handleTaskAdd}>+</button>
            <button>-</button>
        </Fragment>
    ); 
}