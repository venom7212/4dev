import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
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
