// This component uses React Icons
// Icon library: https://react-icons.github.io/react-icons/

import { useState } from "react";
import { AiOutlineClose, AiOutlineCheck, AiOutlineUndo } from "react-icons/ai";

type ToDoList = {
  id: number;
  title: string;
  completed: boolean;
};

const ToDoList = () => {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<ToDoList[]>([]);
  const [error, setError] = useState<string>("");

  const addTask = () => {
    if (input.trim() === "") {
      setError("Task input can't be empty");
      return;
    }
    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: input,
        completed: false,
      },
    ]);
    setInput("");
    setError("");
  };

  const toggleTaskCompletion = (id: number) => {
    setList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setList((prev) => {
      const updatedList = prev.filter((task) => task.id !== id);
      return updatedList;
    });
  };

  const deleteCompletedTasks = () => {
    setList((prev) => {
      const updatedList = prev.filter((task) => !task.completed);
      return updatedList;
    });
  };

  return (
    <div className="bg-linear-to-t from-violet-950 to-violet-700 px-4 py-8 min-h-[70vh] rounded-xl flex justify-center">
      <div className="w-full max-w-[650px] p-5 bg-white rounded-xl flex flex-col">
        <div className="grow">
          <h2 className="text-xl font-bold mb-4">My To-Do List</h2>

          <div className="sm:relative sm:rounded-full overflow-hidden">
            <input
              type="text"
              className="border border-gray-300 sm:rounded-full h-[50px] px-4 w-full"
              placeholder="Add task here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              type="button"
              className="bg-black text-white w-full py-2 sm:absolute sm:w-auto top-0 right-0 bottom-0 z-10 px-8 cursor-pointer"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          {error !== "" && (
            <div className="block mt-2 text-red-700 text-sm italic">
              {error}
            </div>
          )}

          {list.length === 0 && (
            <div className="text-gray-500 mt-4 text-center text-lg font-bold">
              No tasks yet
            </div>
          )}

          {list.length > 0 && (
            <div className="task-list mt-6">
              <ul>
                {list.map((task) => {
                  return (
                    <li
                      key={task.id}
                      className="flex items-center gap-x-5 py-1 border-b border-gray-200"
                    >
                      <span
                        className={`text-lg grow ${
                          task.completed
                            ? "text-gray-400 pointer-events-none"
                            : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      <div className="flex">
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          {task.completed ? (
                            <AiOutlineUndo
                              className="text-4xl p-2"
                              aria-label="Undo task completed"
                            />
                          ) : (
                            <AiOutlineCheck
                              className="text-4xl p-2"
                              aria-label="Complete the Task"
                            />
                          )}
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => removeTask(task.id)}
                        >
                          <AiOutlineClose
                            className="text-4xl p-2"
                            aria-label="Delete the task"
                          />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="text-right">
          <button
            type="button"
            className="bg-transparent border-0 text-xs font-bold text-violet-700 py-2 cursor-pointer"
            onClick={deleteCompletedTasks}
          >
            Delete Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
