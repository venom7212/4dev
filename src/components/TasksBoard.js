import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, useNavigate } from "react-router-dom";
import CreateModal from "./CreateModal";
import Container from "./Container";
import createIcon from "../img/cross.jpg";

const TasksBoard = () => {
  const tasks = useSelector((state) => state.state.tasks);
  const isAuthorized = useSelector((state) => state.state.isAuthorized);

  const status = [
    {
      title: "В ОЧЕРЕДИ",
      status: 0,
    },
    {
      title: "В РАБОТЕ",

      status: 1,
    },
    {
      title: "ВЫПОЛНЕНО",
      status: 2,
    },
  ];

  const [active, setActive] = useState(false);

  const closeModal = useCallback(() => {
    setActive(false);
  }, [setActive]);

  const navigate = useNavigate();

  const filterTask = () => {
    return status.map((item, index) => {
      const { title, status } = item;
      const filteredTasks = tasks.filter((item) => item.status === status);
      return (
        <Container
          key={index}
          title={title}
          status={status}
          tasks={filteredTasks}
        />
      );
    });
  };

  return (
    <div className="tasks">
      <div
        className="tasks_header"
        onClick={() => {
          setActive(true);
        }}
      >
        <img className="one_task_img" src={createIcon} alt="" />
        <div className="new_task">НОВАЯ ЗАДАЧА</div>
      </div>
      <div className="all_task">{filterTask()}</div>
      {active === true ? <CreateModal onClose={closeModal} /> : null}
    </div>
  );
};

export default TasksBoard;
