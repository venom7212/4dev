import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTasks } from "../redux/features/tasksSlice";

const CreateModal = ({ onClose }) => {
  const tasks = useSelector((state) => state.state.tasks);
  const authors = useSelector((state) => state.state.authors);
  const statusTask = useSelector((state) => state.state.status);
  const priorityTask = useSelector((state) => state.state.priority);

  const lastObject = tasks[tasks.length - 1];
  const lastId = parseInt(lastObject.id)

  const [id, setId] = useState(lastId+1);
  const [status, setStatus] = useState(0);
  const [priority, setPriority] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("John Smith");

  const dispatch = useDispatch();

  const inputHandler = (e, setter) => {
    const value = e.currentTarget.value;
    setter(value);
  };

  const inputHandlerDropDown = (e, setter) => {
    const value = e.target.innerText;
    setter(value);
  };

  const inputHandlerDropDownUniversal = (firstKey, setter) => {
    setter(firstKey);
  };

  const addTask = () => {
    const oneTask = {
      id: id.toString(),
      status: status,
      priority: priority,
      title: title,
      description: description,
      author_name: authorName,
      schedule: { creation_time: "2023-08-01T09:15:00" },
    };
    dispatch(addTasks(oneTask));
    console.log(tasks);
    console.log("add");
  };


  useEffect(() => {
    setId(lastId+1)
    },[tasks]);

  // authors,setAuthorName
  const universalGen = (array, setter) => {
    return array.map((item, index) => {
      const firstKey = Object.keys(item)[0];
      const firstValue = Object.values(item)[0];
      return (
        <div
          key={index}
          onClick={() => inputHandlerDropDownUniversal(firstValue, setter)}
        >
          {firstValue}
        </div>
      );
    });
  };

  //     - schedule {Object}
  //   - creation_time {string} // Дата создания задачи в формате YYYY-MM-DDTHH:MM:SS

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
          <div className="modal_title">Название</div>
          <input
            onChange={(e) => inputHandler(e, setTitle)}
            className="modal_modal_title_input"
          ></input>
        </div>
        <div className="modal_input">
          <div className="modal_author_name">Исполнитель</div>
          <div className="dropdown">
            <button className="dropbtn">{authorName}</button>
            <div className="dropdown-content">
              {universalGen(authors, setAuthorName)}
            </div>
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
            <button className="dropbtn">
              {/* {status} */}
              {status === 0
                ? "в очереди"
                : status === 1
                ? "в работе"
                : status === 2
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
              {priority === 0
                ? "низий"
                : priority === 1
                ? "средний"
                : priority === 2
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

        <button onClick={onClose}>ОТМЕНА</button>
        <button
          onClick={() => {
            addTask();
          }}
        >
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
};

export default CreateModal;
