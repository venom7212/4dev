import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, useNavigate,useLocation } from "react-router-dom";
import CreateModal from "./CreateModal";
import Container from "./Container";


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
  const location = useLocation();

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

  useEffect(() => {
    const loginCheck = localStorage.getItem('current_login')!== null;
    if (location.pathname === "/tasks" && loginCheck===false) {
      navigate("/error");
    }
  }, [location]);


  return (
    <div className="tasks">
      <div onClick={()=>{setActive(true)}} className="new_task">НОВАЯ ЗАДАЧА</div>
      <div className="all_task">
        {filterTask()}
      </div>
      {active === true ? <CreateModal  onClose={closeModal} /> : null}
    </div>
  );
};

export default TasksBoard;
