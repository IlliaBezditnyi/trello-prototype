import React from "react";
import { Task } from '../../types/Task';
import TaskCard from '../../components/TaskCard/TaskCard';
import { Droppable } from "react-beautiful-dnd";

import "./TaskList.scss";

type Props = {
  tasks: Array<Task>;
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  completedTasks: Array<Task>;
}

const TaskList: React.FC<Props> = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <>
      <h1 className="title">Progress desk</h1>
      <div className="container">
        <Droppable droppableId="tasksList">
          {(provided, snapshot) => (
            <div
              className={`tasks ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="tasks__title">
                In progress
                <img 
                  src="https://img.icons8.com/fluency-systems-regular/40/undefined/hard-working.png"
                  alt="In progress icon"
                />
              </span>
              {tasks?.map((task, index) => (
                <TaskCard
                  index={index}
                  key={task.id}
                  tasks={tasks}
                  task={task}
                  setTasks={setTasks}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="tasksRemove">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`tasks  ${
                snapshot.isDraggingOver ? "dragcomplete" : "remove"
              }`}
            >
              <span className="tasks__title">
                Completed
                <img 
                  src="https://img.icons8.com/material-outlined/40/undefined/completed-task.png"
                  alt="Completed icon"
                />
              </span>
              {completedTasks?.map((task, index) => (
                <TaskCard
                  index={index}
                  key={task.id}
                  tasks={completedTasks}
                  task={task}
                  setTasks={setCompletedTasks}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default TaskList;