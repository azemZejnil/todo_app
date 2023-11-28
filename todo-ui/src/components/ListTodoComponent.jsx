import React, { useEffect, useState } from "react";
import { completeTodo, deleteTodo, getAllTodos, uncompleteTodo } from "../services/TodoService";
import { useNavigate } from "react-router-dom";

function ListTodoComponent() {
  const [todos, setTodos] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addNewTodo() {
    navigator("/add-todo");
  }

  function updateTodo(id) {
    console.log(id);
    navigator(`/update-todo/${id}`);
  }

  function markComplete(id) {
    completeTodo(id).then((response) => {
        listTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function markUncomplete(id) {
    uncompleteTodo(id).then((response) => {
        listTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeTodo(id) {
    deleteTodo(id).then((response) => {
        listTodos();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Todos</h2>
      <button className="btn btn-primary mb-2" onClick={addNewTodo}>
        Add Todo
      </button>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "YES" : "NO"}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTodo(todo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => markComplete(todo.id)}
                  >
                    Complete
                  </button>                  <button
                    className="btn btn-warning"
                    onClick={() => markUncomplete(todo.id)}
                  >
                    Uncomplete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTodoComponent;
