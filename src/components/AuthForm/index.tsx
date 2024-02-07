import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './AuthForm.module.scss'
import axios from "axios";
import {useNavigate} from "react-router-dom";

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

const AuthForm: React.FC<RegLog> = ({ regLog }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onClickLogin = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    try {
        const response = await axios.post("https://front-test.hex.team/api/login",
          {
            username: username,
            password: password
          })
        localStorage.setItem("access_token", response.data.access_token)
        setError('')
        navigate('/')
    } catch (e: any) {
        setPassword("")
        setError(e.response.data.detail)
        console.log(error)
      }
  }

  const onClickRegister = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `https://front-test.hex.team/api/register?username=${username}&password=${password}`
      )
      setError('')
      navigate('/login')
      console.log(response)
    } catch (e: any) {
      setPassword ("")
      setError(e.response.data.detail)
      console.log(error)
    }
  }

  return (
    <form className={styles.root}>
        <input value={username}
               onChange={(e) => setUsername(e.target.value)}
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
          onClick={regLog==='login' ? onClickLogin : onClickRegister}
        />
        {error && <p className={styles.error}>
          {regLog==='login' ? 'Неправильный логин или пароль' : 'Пользователь с таким именем уже существует'}
        </p>}
    </form>
  )
}

export default AuthForm