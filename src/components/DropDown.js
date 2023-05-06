import React, { useEffect, useState } from "react";
import styles from "../dropdown.module.css";

// const DropDown = ({ options, selectedOption, setOption }) => {
  const DropDown = ({ options, selectedOption, setOption }) => {



  return (

    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>{selectedOption}</button>
      <div className={styles.dropdownContent}>
        {options &&
          options.map((opt, ind) => (
            <div
              className={`${
                selectedOption === opt[Object.keys(opt)[0]] ? `${styles.currentSelected}` : null
              } ${styles.opt[Object.keys(opt)[0]]}`}
              key={ind}
              onClick={() => setOption(opt[Object.keys(opt)[0]])}
            >
              {/* {opt.author_name} */}
              {opt[Object.keys(opt)[0]]}
            </div>
          ))}
      </div>
    </div>
  );
};
export default DropDown;
