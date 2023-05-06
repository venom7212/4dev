import React, { useState, useEffect, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
import EditModal from "./EditModal";

const OneTask = ({ data }) => {
  const { id, status, priority, title, description, schedule, author_name } =
    data;
  const [active, setActive] = useState(false);

  const closeModal = useCallback(() => {
    setActive(false);
  }, [setActive]);

  return (
    <div onClick={() => setActive(true)} className="one_task">
      <div className="one_task_header">
        <div>{status}</div>
        <div>{title}</div>
      </div>
      <div>{author_name}</div>
      {active === true ? <EditModal data={data} active={active} onClose={closeModal} /> : null}
    </div>
  );
};

export default OneTask;
