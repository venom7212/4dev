import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTasks } from "../redux/features/tasksSlice";
import decline from "../img/decline.jpg";
import save from "../img/save.jpg";
import DropDown from "./DropDown";

const CreateModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.state.tasks);
  const authors = useSelector((state) => state.state.authors);
  const statuses = useSelector((state) => state.state.statuses);
  const priorities = useSelector((state) => state.state.priorities);

  const [id, setId] = useState(tasks.length);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");

  const inputHandler = (e, setter) => {
    const value = e.currentTarget.value;
    setter(value);
  };

  const addTask = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const minutes = date.getMinutes();
    const preparedDate = `${year}-${month < 10 ? 0 : ""}${month}-${
      day < 10 ? 0 : ""
    }${day}'T'${hrs}:${minutes}`;
    // schedule: { creation_time: "2023-08-01T09:15:00" },
    const foundStatus = statuses.find((item, index) => item[index] == status);
    const statusId = Object.keys(foundStatus)[0];

    const foundPriority = priorities.find(
      (item, index) => item[index] == priority
    );
    const priorityId = Object.keys(foundPriority)[0];

    const oneTask = {
      id: id.toString(),
      status: Number(statusId),
      priority: Number(priorityId),
      title: title,
      description: description,
      author_name: authorName,
      // schedule: { creation_time: "2023-08-01T09:15:00" },
      schedule: { creation_time: preparedDate },
    };

    dispatch(addTasks(oneTask));
    console.log(tasks);
    console.log("add");
    onClose();
  };

  useEffect(() => {
    setId(tasks.length);
  }, [tasks]);
  const [selectedOption, setSelectedOption] = useState("");

  const getDropdownItems2 = (array, setter,state) => {
    // const [_, value] = Object.entries(item)[0];
    return (
      <DropDown
        options={array}
        selectedOption={state}
        setOption={setter}
      />
      // <div key={index} onClick={() => setter(value)}>
      //   {value}
      // </div>
    );
  };
  const getDropdownItems = (array, setter) => {
    return array.map((item, index) => {
      const [_, value] = Object.entries(item)[0];
      return (
        <div key={index} onClick={() => setter(value)}>
          {value}
        </div>
      );
    });
  };

  return (
    <div
      //   onClick={(e) => {
      //     e.stopPropagation();
      //     onClose();
      //   }}
      className="modal"
    >
      <div className="modal_body">
        <div className="modal_header">Новая задача</div>
        <div className="modal_input">
          <div className="modal_input_title">Название</div>
          <input
            onChange={(e) => inputHandler(e, setTitle)}
            className="modal_modal_title_input"
          ></input>
        </div>
        <div className="modal_input">
          <div className="modal_author_name">Исполнитель</div>
          <div className="dropdown">
            {/* <button className="dropbtn">{authorName}</button> */}
            {/* <div className="dropdown-content">
            </div> */}
            {getDropdownItems2(authors, setAuthorName,authorName)}

          </div>
        </div>
        <div className="modal_content_textarea">
          <div className="modal_content">Описание задачи</div>
          <textarea
            onChange={(e) => inputHandler(e, setDescription)}
            className="modal_textarea"
          ></textarea>
        </div>
        <div className="modal_input">
          <div className="modal_status">Cостояние: </div>
          <div className="dropdown">
            {/* <button className="dropbtn">{status}</button> */}
            {/* <div className="dropdown-content">
            </div> */}
            {getDropdownItems2(statuses, setStatus,status)}

          </div>
        </div>
        <div className="modal_input">
          <div className="modal_priority">Приоритет: {}</div>
          <div className="dropdown">
            {/* <button className="dropbtn">{priority}</button> */}
            {/* <div className="dropdown-content">
            </div> */}
            {getDropdownItems2(priorities, setPriority,priority)}

          </div>
        </div>

        <div className="modul_footer">
          <div onClick={onClose}>
            <img className="modul_btn" src={decline} alt="" />
          </div>
          <div
            onClick={() => {
              addTask();
            }}
          >
            <img className="modul_btn" src={save} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
