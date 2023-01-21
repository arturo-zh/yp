import React from "react";
import styles from "./preloader.module.css";


const PreLoader = () => {
  return (
      <div className={styles.inner}>
        <div className={styles.loader}>
        </div>
      </div>
  )
}


export default PreLoader