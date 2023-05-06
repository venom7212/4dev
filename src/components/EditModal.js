import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import Deck from "./Deck";

import { deleteTask,updateStatusTask } from "../redux/features/tasksSlice.js";
// import Detected from "./Detected";

const EditModal = ({ active, closeModal, data, onClose }) => {
  const { id, status, priority, title, description, schedule, author_name } =
    data;
  const statusTask = useSelector((state) => state.state.status);
  const priorityTask = useSelector((state) => state.state.priority);

  const [statusState, setStatus] = useState(status);
  const [priorityState, setPriority] = useState(priority);

  const dispatch = useDispatch();
  console.log("editmodal", data);

  const inputHandlerDropDownUniversal = (firstKey, setter) => {
    setter(firstKey);
  };

  const universalGen = (array, setter) => {
    return array.map((item, index) => {
      const firstKey = Object.keys(item)[0];
      const firstValue = Object.values(item)[0];
      return (
        <div
          key={index}
          onClick={() => {inputHandlerDropDownUniversal(firstValue, setter);dispatch(updateStatusTask(title,status))}}
        >
          {firstValue}
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
        {/* <div className="modal_status">Cостояние: {status}</div> */}
        {/* <div className="modal_priority">Приоритет: {priority}</div> */}
        <div className="modal_input">
          <div className="modal_status">Cостояние: </div>
          <div className="dropdown">
            <button className="dropbtn">
              {/* {status} */}
              {statusState === 0
                ? "в очереди"
                : statusState === 1
                ? "в работе"
                : statusState === 2
                ? "выполнено"
                : "в очереди"}
            </button>
            <div className="dropdown-content">
              {universalGen(statusTask, setStatus)}
              {/* <a onClick={(e) => setStatus(0)}>в очереди</a>
              <a onClick={(e) => setStatus(1)}>в работе</a>
              <a onClick={(e) => setStatus(2)}>выполнено</a> */}
            </div>
          </div>
        </div>
        <div className="modal_input">
          <div className="modal_priority">Приоритет: {}</div>
          <div className="dropdown">
            <button className="dropbtn">
              {/* {priority} */}
              {priorityState === 0
                ? "низий"
                : priorityState === 1
                ? "средний"
                : priorityState === 2
                ? "высокий"
                : "низкий"}
            </button>
            <div className="dropdown-content">
              {universalGen(priorityTask, setPriority)}

              {/* <a onClick={(e) => inputHandlerDropDown(e, setPriority)}>
                низкий
              </a>
              <a onClick={(e) => inputHandlerDropDown(e, setPriority)}>
                средний
              </a>
              <a onClick={(e) => inputHandlerDropDown(e, setPriority)}>
                высокий
              </a> */}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteTask(title));
            console.log("del");
            onClose();
          }}
        >
          УДАЛИТЬ
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
};

export default EditModal;
