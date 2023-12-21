'use client'

import {useEffect, useState} from "react";
import {ToDoList} from "@/app/dashboard/ToDoList";
import {ToDoNew} from "@/app/dashboard/ToDoNew";
import addData from "@/firebase/addData";
import getData from "@/firebase/getData";

const LOCAL_STORAGE_KEY = 'todos';

export interface ToDoItem {
    title: string,
    isDone: boolean;
}

    export function Todos() {

        const [tasks, setTasks] = useState<ToDoItem[]>([]);

        useEffect(() => {
            const tasksInJson = window.localStorage.getItem(LOCAL_STORAGE_KEY);

            if (tasksInJson) {
                const tasksFromLs = JSON.parse(tasksInJson);
                setTasks(tasksFromLs);
            } else {
                void (async () => {
                    const dataFromFirebase = await getData();
                    setTasks(dataFromFirebase);

                })();
            }
        }, []);


    const addTaskHandler = async (newTaskTitle: string) => {
        setTasks(tasks => {
            const newTasks = [
                ...tasks
            ];
            newTasks.push({
                title: newTaskTitle,
                isDone: false
            });

            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
            return newTasks;
        });

        try {
            const data = {
                title: newTaskTitle,
                isDone: false
            }

            const { result, error } = await addData(data);

            if (error) {
                return console.log(error)
            }
        } catch (e) {
            console.log(e);
        }

    }

    const setTaskAsDone = (taskIdx: number) => {
        setTasks(tasks => {
            const newTasks = tasks.map((task, idx) => {
                if (idx === taskIdx) {
                    task.isDone = true;
                }

                return task;
            })

            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
            return newTasks;
        });
    }

    return (
        <>
            <ToDoList todos={tasks} setTaskAsDone={setTaskAsDone} />
            <ToDoNew addTaskHandler={addTaskHandler} />
        </>
    );
}
