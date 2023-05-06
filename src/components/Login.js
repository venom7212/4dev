import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import Deck from "./Deck";
import {  } from "../redux/features/tasksSlice";
// import {
//   increaseRealHp,
// } from "../redux/features/stats/statsSlice.js";
// import Detected from "./Detected";

const Login = () => {
  const users = useSelector((state) => state.state.users);
  
  const isAuthorized = useSelector((state) => state.state.isAuthorized);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputHandler = (e, setter) => {
    const value = e.currentTarget.value;
    setter(value);
  };
  const loginFunction = (login, password) => {
    const user = users.find(
      (item) => item.login === login && item.password === password
    );
    if (user) {
      setAuth(true);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (auth === true) {
      const uniqueKey =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let keyId = "";
      for (let i = 0; i < 20; i++) {
        keyId += uniqueKey.charAt(
          Math.floor(Math.random() * uniqueKey.length)
        );
      }
      localStorage.setItem('current_login', JSON.stringify({login,keyId}));
    }
  }, [auth]);

  useEffect(() => {
    const loginCheck = localStorage.getItem('current_login')!== null;
    if (auth === true && loginCheck === true) {
      navigate("/tasks");
    }
  }, [auth]);


  return (
    <div className="login_form">
      <div className="auth">АВТОРИЗАЦИЯ</div>
      <input
        onChange={(e) => inputHandler(e, setLogin)}
        value={login}
        className="login_form_login"
        placeholder="ЛОГИН"
      ></input>
      <input
        onChange={(e) => inputHandler(e, setPassword)}
        value={password}
        className="login_form_password"
        placeholder="ПАРОЛЬ"
      ></input>
      <button
        onClick={() => {
          loginFunction(login, password);
        }}
        className="login_form_enter"
      >
        ВОЙТИ
      </button>
    </div>
  );
};

export default Login;
