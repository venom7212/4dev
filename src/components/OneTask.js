import React, { useState, useEffect, useCallback } from "react";
import EditModal from "./EditModal";
import red from "../img/red.jpg";
import orange from "../img/orange.jpg";
import green from "../img/green.jpg";

const OneTask = ({ data }) => {
  const { priority, title, author_name } =
    data;
  const [active, setActive] = useState(false);

  const closeModal = useCallback(() => {
    setActive(false);
  }, [setActive]);

  return (
    <div onClick={() => setActive(true)} className="one_task">
      <div className="one_task_header">
        <img
          className="one_task_img"
          src={
            priority === 0
              ? green
              : priority === 1
              ? orange
              : priority === 2
              ? red
              : ""
          }
          alt=""
        />
        <div>{title}</div>
      </div>
      <div>{author_name}</div>
      {active === true ? (
        <EditModal data={data} active={active} onClose={closeModal} />
      ) : null}
    </div>
  );
};

export default OneTask;
