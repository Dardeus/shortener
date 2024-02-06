import React from 'react';
import AuthForm from "../components/AuthForm";
import styles from "./Login/Auth.module.scss"

const Registration: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Регистрация</h1>
      <AuthForm regLog={"registration"}/>
    </div>
  )
}

export default Registration