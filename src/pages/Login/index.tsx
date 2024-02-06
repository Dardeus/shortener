import React, {useState} from 'react';
import AuthForm from "../../components/AuthForm";
import styles from "./Auth.module.scss"
import {Link} from "react-router-dom";

export type RegLog = "login" | "registration"
const Auth: React.FC = () => {
  const [regLog, setRegLog] = useState<RegLog>("login")

  return (
    <div className={styles.root}>
      {regLog === "login" ? <h1>Вход в систему</h1> : <h1>Регистрация</h1>}
      <AuthForm regLog="login"/>
      <Link to='/registration'
        className={styles.link}
        onClick={() => {setRegLog("registration")}}
      >
        Зарегистрировать аккаунт
      </Link>
    </div>
  )
}

export default Auth