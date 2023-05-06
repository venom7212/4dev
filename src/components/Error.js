import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch, useNavigate } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";
// import Deck from "./Deck";

// import {
//   increaseRealHp,
// } from "../redux/features/stats/statsSlice.js";
// import Detected from "./Detected";

const Error = () => {
  // forceUpdate()
  //   const defSlot = useSelector((state) => state.stats.defSlot);
  const navigate = useNavigate();

  return (
    <div className="error">
      <div className="auth">ОШИБКА ДОСТУПА</div>
      <div>
        LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ELIT, SED DO EIUSMOD TEMPOR
        INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="enterBtn"
      >
        НАЗАД
      </button>
    </div>
  );
};

export default Error;
