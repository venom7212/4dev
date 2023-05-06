import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/features/tasksSlice.js";
// import Detected from "./Detected";
import deleteJPG from "../img/deleteJPG.jpg";
import save from "../img/save.jpg";

const EditModal = ({ active, closeModal, data, onClose }) => {
  const { id, status, priority, title, description, schedule, author_name } =
    data;
  const statuses = useSelector((state) => state.state.statuses);
  const priorities = useSelector((state) => state.state.priorities);

  const [statusState, setStatus] = useState(status);
  const [priorityState, setPriority] = useState(priority);

  const dispatch = useDispatch();
  // console.log("editmodal", data);

  const inputHandlerDropDownUniversal = (firstValue, setter) => {
    setter(firstValue);
    console.log("statusState", statusState);
    console.log("priorityState", priorityState);
  };

  const universalGen = (array, setter) => {
    return array.map((item, index) => {
      const [key, value] = Object.entries(item)[0];
      return (
        <div
          key={index}
          onClick={() => {
            inputHandlerDropDownUniversal(key, setter);
          }}
        >
          {value}
        </div>
      );
    });
  };
  return (
    <div
      // onClick={(e) => {
      //   e.stopPropagation();
      //   onClose();
      // }}
      className="modal"
    >
      <div className="modal_body">
        <div className="modal_title">{title}</div>
        <div className="modal_author_name">{author_name}</div>
        <div className="modal_content">Описание задачи</div>
        <div className="modal_content_text">{description}</div>
        <div className="modal_input">
          <div className="modal_status">Cостояние: </div>
          <div className="dropdown">
            <button className="dropbtn">
              {statusState === 0
                ? "в очереди"
                : statusState === 1
                ? "в работе"
                : statusState === 2
                ? "выполнено"
                : "в очереди"}
            </button>
            <div className="dropdown-content">
              {universalGen(statuses, setStatus)}
            </div>
          </div>
        </div>
        <div className="modal_input">
          <div className="modal_priority">Приоритет: {}</div>
          <div className="dropdown">
            <button className="dropbtn">
              {priorityState === 0
                ? "низий"
                : priorityState === 1
                ? "средний"
                : priorityState === 2
                ? "высокий"
                : "низкий"}
            </button>
            <div className="dropdown-content">
              {universalGen(priorities, setPriority)}
            </div>
          </div>
        </div>
        <div className="modul_footer">
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteTask(id));
              console.log("del");
              onClose();
            }}
          >
            <img className="modul_btn" src={deleteJPG} alt="" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(updateTask({ id, statusState, priorityState }));
              onClose();
            }}
          >
            <img className="modul_btn" src={save} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
