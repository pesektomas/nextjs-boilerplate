'use client'

import {ToDoItem} from "@/app/dashboard/Todos";

interface ToDoListProps {
    todos: ToDoItem[],
    setTaskAsDone: (idx: number) => void
}

export function ToDoList({ todos, setTaskAsDone }: ToDoListProps) {

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <ul className="space-y-2">
                {todos.map((todo, idx) => (
                    <li
                        key={idx}
                        className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
                    >
                        <span className={`${todo.isDone ? 'line-through: text-gray-500' : 'text-black'}`}>
                            {todo.title}
                        </span>

                        <button
                            onClick={() => setTaskAsDone(idx)}
                            className={`px-2 py-1 rounded ${todo.isDone ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
                        >
                            {todo.isDone ? 'Hotovo' : 'Dokončit'}
                        </button>

                    </li>
                    ))}
                </ul>
            </div>
    );
}
