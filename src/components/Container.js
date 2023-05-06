import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
import OneTask from "./OneTask";

const Container = ({ title,classDiv, status, tasks }) => {
//   const { id, priority, description, schedule, author_name } = tasks;

  const genTask = () => {
      return tasks.map((item, index) => {
        return <OneTask data={item} key={index} />;
      });
    };
  return (
    <div className={classDiv}>
      {title}
      {genTask()}
    </div>
  );
};

export default Container;
