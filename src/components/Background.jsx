// import { useState } from "react";
import styles from "../styles/Background.module.css";
import classNames from "classnames";

export default function Background() {
  return (
    <>
      <div className={classNames(styles.Background)}></div>

      <footer className="page_footer">
        <div className={classNames(styles.logo, styles.logo_left)}>Rekume</div>
        <div className={classNames(styles.logo, styles.logo_right)}>Copyright © Ku YunJhe 2025</div>
      </footer>
    </>
  );
}
