import React, {useState} from 'react';
import styles from './AuthForm.module.scss'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {fetchAccessToken, setLogIn, setPassword, setUsername} from "../../redux/slices/authState";
import {RootState, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";


type RegLog = {
  regLog: "login" | "registration"
}

const AuthForm: React.FC<RegLog> = ({ regLog }) => {
  const {username, password} = useSelector((state:RootState) => state.auth)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onClickLogin = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    try {
        dispatch(fetchAccessToken({username, password}))
        dispatch(setLogIn(true))
        setError('')
        navigate('/shortener/')
    } catch (e: any) {
        dispatch(setPassword(""))
        setError(e.response.data.detail)
        console.log(error)
      }
  }

  const onClickRegister = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    try {
      await axios.post(
        `https://front-test.hex.team/api/register?username=${username}&password=${password}`
      )
      setError('')
      navigate('/shortener/login')
    } catch (e: any) {
      dispatch(setPassword(""))
      setError(e.response.data.detail)
      console.log(error)
    }
  }

  return (
    <form className={styles.root}>
        <input value={username}
               onChange={(e) => dispatch(setUsername(e.target.value))}
               className={styles.input}
               placeholder='Логин'
        />
        <input value={password}
               onChange={(e) => dispatch(setPassword(e.target.value))}
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