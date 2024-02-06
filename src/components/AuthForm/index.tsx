import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './AuthForm.module.scss'
import axios from "axios";

type AuthProps = {
  regLog: RegLog
  setRegLog: Dispatch<SetStateAction<RegLog>>
}

type LoginResponse = {
  access_token: string,
  token_type: "bearer"
}

type RegLog = {
  regLog: "login" | "registration"
}

const AuthForm: React.FC<RegLog> = ({ regLog}) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  console.log(localStorage.getItem("access_token"))
  const onClickSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const url = "https://front-test.hex.team/api/login"
    const logIn = async () => {
      try {
        const response = await axios.post(url,
          {
            username: login,
            password: password
          })
        localStorage.setItem("access_token", response.data.access_token)
        setError('')
      }
      catch (e: any) {
        setLogin("")
        setPassword("")
        setError(e.response.data.detail)
      }
    }
    logIn()
  }

  return (
    <form className={styles.root}>
        <input value={login}
               onChange={(e) => setLogin(e.target.value)}
               className={styles.input}
               placeholder='Логин'
        />
        <input value={password}
               onChange={(e) => setPassword(e.target.value)}
               className={styles.input}
               placeholder='Пароль'
        />
        <input
          className={styles.submit}
          type="submit"
          value="Отправить"
          onClick={onClickSubmit}
        />
        {error && <p className={styles.error}>Неправильный логин или пароль</p>}
    </form>
  )
}

export default AuthForm