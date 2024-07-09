import { FaPlusCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import Todo from "./components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTodos } from "./feature/todo/todoSlice";
import axios from "axios";

function App() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const createTodo = () => {
    axios
      .post("https://todo-app-react-m2a3.onrender.com/todos", {
        text: todo,
        completed: false,
      })
      .then(() => {
        dispatch(fetchTodos());
        setTodo("");
      });
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <>
      <header className=" container mx-auto flex items-center justify-between p-7 text-2xl font-bold">
        <h2 className=" tracking-wider">
          GOAL<span className=" text-orange-600">GETTER</span>
        </h2>
        <IoLogOut className=" text-3xl shrink-0" />
      </header>
      <main className=" container mx-auto p-7">
        <div className="max-w-[500px] mx-auto">
          <div className="flex gap-x-8 items-center justify-center border-[1px] p-10 px-14 rounded-3xl">
            <div>
              <h2 className="text-3xl font-bold tracking-wide">Todo Done</h2>
              <p className="text-2xl tracking-wider">keep it up</p>
            </div>
            <div className="min-w-28 h-28 bg-orange-600 flex items-center justify-center rounded-full text-3xl font-bold">
              {todos.filter((todo) => todo.completed).length}/{todos.length}
            </div>
          </div>
          <form className="flex gap-x-2 items-center justify-center mt-6">
            <input
              type="text"
              placeholder="Write your next task"
              className="text-xl font-light tracking-wide grow p-2 bg-white bg-opacity-5 rounded-2xl focus:outline-none pl-4"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <FaPlusCircle
              className=" text-orange-600 text-3xl hover:cursor-pointer shrink-0"
              onClick={createTodo}
            />
          </form>
          <div className="mt-6 space-y-4">
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
