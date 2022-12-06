import React from "react";
import styles from "./loading.module.css"
function Loading() {
    return (  
        <div className={styles.modal}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loading;