import axios from "axios";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../feature/todo/todoSlice";
import { useState } from "react";

const Todo = ({ id, text, completed }) => {
  const [todo, setTodo] = useState(text);
  const dispatch = useDispatch();
  const toggleComplete = () => {
    const data = {
      completed: !completed,
    };
    axios.patch(`http://localhost:3000/todos/${id}`, data).then(() => {
      dispatch(fetchTodos());
    });
  };
  const deleteTodo = () => {
    axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
      dispatch(fetchTodos());
    });
  };

  const editTodo = () => {
    if (!completed) {
      if (todo !== text) {
        axios
          .patch(`http://localhost:3000/todos/${id}`, {
            text: todo,
          })
          .then(() => {
            dispatch(fetchTodos());
          });
      }
    }
  };
  return (
    <div className=" bg-white bg-opacity-5 flex p-4 text-xl font-light items-center gap-x-4 rounded-xl border-[1px]">
      {!completed ? (
        <FaRegCircle
          className=" text-orange-600 text-2xl hover:cursor-pointer shrink-0"
          onClick={toggleComplete}
        />
      ) : (
        <FaCircle
          className=" text-green-500 text-2xl hover:cursor-pointer shrink-0"
          onClick={toggleComplete}
        />
      )}
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className={`bg-transparent grow focus:outline-none overflow-hidden ${
          completed && "line-through"
        }`}
        disabled={completed}
      />
      <FiEdit
        className="text-2xl hover:cursor-pointer shrink-0"
        onClick={editTodo}
      />
      <FiTrash
        className="text-2xl hover:cursor-pointer shrink-0"
        onClick={deleteTodo}
      />
    </div>
  );
};

export default Todo;
