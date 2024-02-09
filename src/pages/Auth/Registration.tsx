import React from 'react';
import AuthForm from "../../components/AuthForm";
import styles from "./Auth.module.scss"
import {Link} from "react-router-dom";

const Registration: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Регистрация</h1>
      <AuthForm regLog={"registration"}/>
      <Link to='/shortener/login'
            className={styles.link}
      >
        Назад ко входу
      </Link>
    </div>
  )
}

export default Registration