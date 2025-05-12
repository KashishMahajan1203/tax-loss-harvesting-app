"use client";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase";
import { child, get, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";

import React from "react";

export default function ViewUpdateDeletePage({ params }) {
  const unwrappedParams = React.use(params);

  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    assigned_user: "",
    deadline: "",
  });

  const getUserList = () => {
    get(child(ref(db), `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setUsersList(Object.values(data));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTaskDetails = () => {
    get(child(ref(db), `tasks/${unwrappedParams.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setFormData(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUserList();
    getTaskDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

const handleSubmit = (e) => {
    e.preventDefault();

    set(ref(db, `tasks/${unwrappedParams.id}`), formData);
    window.alert("Updated Details");
  };

const handleDelete = (e) => {
  e.preventDefault();
  remove(ref(db,"tasks/" + unwrappedParams.id))
    .then(() => {
      console.log("Deleted Task");
      window.alert("Task deleted successfully");
      // Optionally, redirect or update UI after deletion
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      window.alert("Failed to delete task");
    });
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle1" className="form-label">
            Title
          </label>
          <input
            type="title"
            className="form-control"
            id="exampleInputTitle1"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputDescription1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleInputDescription1"
            rows={6}
            name="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>
        <div className="d-flex">
          <div className="mb-3 col-3 me-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              value={formData.status}
            >
              <option>Select Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="mb-3 col-3 me-3">
            <label htmlFor="assigned_user" className="form-label">
              Assigned User
            </label>
            <select
              name="assigned_user"
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              value={formData.assigned_user}
            >
              <option>Select User</option>
              {usersList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {`${item.username} <${item.email}>`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3 col-3 me-3">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              onChange={handleChange}
              type="date"
              className="form-control"
              name="deadline"
              id="deadline"
              min={new Date().toISOString().split("T")[0]}
              value={formData.deadline}
            />
          </div>
        </div>
        <div className="d-flex mt-3">
          <button type="submit" className="btn btn-success">
            Update Task ✍️
          </button>

          <button
            className="btn btn-outline-danger mx-3"
            onClick={handleDelete}
          >
            Delete Task ⚠️
          </button>
        </div>
      </form>
    </div>
  );
}
