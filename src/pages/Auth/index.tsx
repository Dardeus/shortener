import React from 'react';
import AuthForm from "../../components/AuthForm";
import styles from "./Auth.module.scss"
import {Link} from "react-router-dom";


const Auth: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Вход в систему</h1>
      <AuthForm regLog="login"/>
      <Link to='/registration'
        className={styles.link}
      >
        Зарегистрировать аккаунт
      </Link>
    </div>
  )
}

export default Auth