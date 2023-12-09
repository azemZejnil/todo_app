import React, { useEffect, useState } from "react";
import { getTodo, saveTodo, updateTodo } from "../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  function submit(e) {
    e.preventDefault();
    const todo = { title, description, completed };
    if (id) {
      updateTodo(id, todo)
        .then((response) => {
          navigator("/todos");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      saveTodo(todo)
        .then((response) => {
          navigator("/todos");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Todo</h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2">
                <label htmlFor="" className="form-label">
                  Todo title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Todo title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className="form-label">
                  Todo description:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Todo description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className="form-label">
                  Todo completed:
                </label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <button className="btn btn-success" onClick={(e) => submit(e)}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
