'use client'

import {useRef, useState} from "react";

interface ToDoNewProps {
    addTaskHandler: (newTaskTitle: string) => void;
}

export function ToDoNew({ addTaskHandler }: ToDoNewProps) {

    const inputRef = useRef();

    const [newTodo, setNewTodo] = useState<string>('');

    const handleSubmit = () => {
        addTaskHandler(newTodo);
        setNewTodo('');

        if (inputRef?.current) {
            // @ts-ignore
            inputRef.current.focus();
        }
    }

    return (
        <div className="max-w-md mx-auto mt-4">
            <form className="flex space-x-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="add new task"
                    className="flex-1 border p-2 rounded-l-md"
                />
                <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-r-md">
                    Add
                </button>
            </form>
        </div>
    );
}
