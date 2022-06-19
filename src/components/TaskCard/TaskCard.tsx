import React, { useEffect, useState, useRef } from 'react';
import { Task } from "../../types/Task";
import { Draggable } from "react-beautiful-dnd";

import "./TaskCard.scss";

const TaskCard: React.FC <{
  index: number;
  task: Task;
  tasks: Array<Task>;
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
}> = ({ index, task, tasks, setTasks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`taskCard ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="taskCard__title"
              ref={inputRef}
            />
          ) : <span className="taskCard__title">{task.task}</span>

          }
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit
                  ) {
                  setEdit(!edit);
                }
              }}
            >
              🖋
            </span>
            <span className="icon" onClick={() => handleDelete(task.id)}>
              🗑
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TaskCard;
