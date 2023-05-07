import React, { useState } from "react";
import OneTask from "./OneTask";
import DropDown from "./DropDown";

const Container = ({ title, status, tasks }) => {
  const [filter, setFilter] = useState("По возрастанию");

  const filterList = [{increase:"По возрастанию"},{decrease:"По убыванию"}]
  const classDivStyle = `${
    status === 0
      ? "in_queue"
      : status === 1
      ? "in_progress"
      : status === 2
      ? "done"
      : ""
  }`;

  // const changerFilter = () => {
  //   setFilter(!filter);
  // };

  const genTask = () => {
    return tasks
      .sort((a, b) => {
        if (filter === "По убыванию") {
          return Date.parse(a.schedule.creation_time) >
            Date.parse(b.schedule.creation_time)
            ? -1
            : 1;
        }
        if (filter === "По возрастанию") {
          return Date.parse(a.schedule.creation_time) <
            Date.parse(b.schedule.creation_time)
            ? -1
            : 1;
        }
      })
      .map((item, index) => {
        return <OneTask data={item} key={index} />;
      });
  };
  const getDropdownItems = (array, setter, state) => {
    return (
      <DropDown options={array} selectedOption={state} setOption={setter} />
    );
  };

  return (
    <div className={classDivStyle}>
      <div className="one_task_header">{title}</div>
      {/* <button
        onClick={() => {
          changerFilter();
        }}
      >
        SORT
      </button> */}
      {getDropdownItems(filterList, setFilter, filter)}
      {genTask()}
    </div>
  );
};

export default Container;
