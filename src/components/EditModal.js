import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/features/tasksSlice.js";
import deleteJPG from "../img/deleteJPG.jpg";
import save from "../img/save.jpg";
import DropDown from "./DropDown";

const EditModal = ({ active, closeModal, data, onClose }) => {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.state.statuses);
  const priorities = useSelector((state) => state.state.priorities);

  const { id, status, priority, title, description, schedule, author_name } =
    data;
  const [statusState, setStatus] = useState("");
  const [priorityState, setPriority] = useState("");

  const updateTaskFunction = () => {
    if (statusState !== "" || priorityState !== "") {
      const foundStatus = statuses.find(
        (item, index) => item[index] == statusState
      );
      const statusId = Number(Object.keys(foundStatus)[0]);
      const foundPriority = priorities.find(
        (item, index) => item[index] == priorityState
      );
      const priorityId = Number(Object.keys(foundPriority)[0]);
      dispatch(updateTask({ id, statusId, priorityId }));
    }else{
      onClose();
    }
  };

  const getDropdownItems = (array, setter, state) => {
    return (
      <DropDown options={array} selectedOption={state} setOption={setter} />
    );
  };

  return (
    <div className="modal">
      <div className="modal_body">
        <div className="modal_title">{title}</div>
        <div className="modal_author_name">Исполнитель: {author_name}</div>
        <div className="modal_content">Описание задачи: </div>
        <div className="modal_content_text">{description}</div>
        <div className="modal_input">
          <div className="modal_status">Cостояние: </div>
          <div className="dropdown">
            {getDropdownItems(statuses, setStatus, statusState)}
          </div>
        </div>
        <div className="modal_input">
          <div className="modal_priority">Приоритет: {}</div>
          <div className="dropdown">
            {getDropdownItems(priorities, setPriority, priorityState)}
          </div>
        </div>
        <div className="modul_footer">
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteTask(id));
              onClose();
            }}
          >
            <img className="modul_btn" src={deleteJPG} alt="" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              updateTaskFunction();
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
