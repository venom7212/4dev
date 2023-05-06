import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
import OneTask from "./OneTask";

const Container = ({ title, classDiv, status, tasks }) => {
  const { id, priority, description, schedule, author_name } = tasks;
  const [filter, setFilter] = useState(true);
  const classDivStyle = `${
    status === 0
      ? "in_queue"
      : status === 1
      ? "in_progress"
      : status === 2
      ? "done"
      : ""
  }`;

  const changerFilter = () =>{
    setFilter(!filter)
  }


  const genTask = () => {
    return tasks
      .sort((a, b) => {
        if (filter === false) {
          return Date.parse(a.schedule.creation_time) > Date.parse(b.schedule.creation_time)
            ? -1
            : 1;
        }
        if (filter === true) {
          return Date.parse(a.schedule.creation_time) < Date.parse(b.schedule.creation_time)
            ? -1
            : 1;
        }
      })
      .map((item, index) => {
        return <OneTask data={item} key={index} />;
      });
  };


  return (
    <div className={classDivStyle}>
      <div className="one_task_header">{title}</div>
      <button onClick={()=>{changerFilter()}}>SORT</button>
      {genTask()}
    </div>
  );
};

export default Container;
