import "./App.css";
import ReactDOM from "react-dom/client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/Login";
import TasksBoard from "./components/TasksBoard";
import Error from "./components/Error";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setIsAuthorized } from "../src/redux/features/tasksSlice";

const App = () => {
  const isAuthorized = useSelector((state) => state.state.isAuthorized);
  const loginCheck = localStorage.getItem("current_login") !== null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginCheck === true) {
      dispatch(setIsAuthorized(true));
    }
  }, []);

  useEffect(() => {
    if (isAuthorized === true) {
      navigate("/tasks");
    }
  }, [isAuthorized]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<TasksBoard />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const NotFound = () => {
  return (
    <main>
      <h2>This is NotFound page</h2>
    </main>
  );
};

export default App;
