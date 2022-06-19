import React, { useRef } from 'react';
import './AddTask.scss';

type Props = {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const AddTask: React.FC<Props> = ({ task, setTask, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        ref={inputRef}
        onChange={(e) => setTask(e.target.value)}
        className="form__input"
      />
      <button type="submit" className="form__submit">
        <img 
          src="https://img.icons8.com/plasticine/100/undefined/plus-2-math.png"
          alt="Add icon"
        />
      </button>
    </form>
  );
};

export default AddTask;