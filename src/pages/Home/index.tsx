import React, {useEffect} from 'react'
import {fetchStatistics} from "../../redux/slices/statisticSlice";
import {RootState, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import styles from './Home.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {fetchAccessToken} from "../../redux/slices/authState";
import Sort from "../../components/Sort";
import AddLink from "../../components/AddLink";
import Pagination from "../../components/Pagination";

const Home:React.FC = () => {
  const dispatch = useAppDispatch()
  const {items, status} = useSelector((state: RootState) => state.statistics)
  const {username, password, access_token, logIn} = useSelector((state: RootState) => state.auth)
  const {activeSort, currentPage} = useSelector((state:RootState) => state.filter)
  const navigate = useNavigate()

  useEffect(() => {
    if (!logIn) {
      navigate('/shortener/login')
    }
  }, [logIn]);

  useEffect(() => {
    dispatch(fetchStatistics({access_token, sortProperty: activeSort.sortProperty, currentPage}))
  }, [access_token, activeSort, currentPage]);

  useEffect(() => {
    if (status==="error") {
      dispatch(fetchAccessToken({username, password}))
    }
    else {
      if (status==='success' && items.length===0) {
        dispatch(setLogIn(false))
      }
    }
  }, [items]);

  const onClickCopy = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Скопировано');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.root}>
      <Sort activeSort={activeSort}/>
      <AddLink access_token={access_token}/>
      <table>
        <tbody>
          <tr><td>Короткая ссылка</td><td>Исходная ссылка</td><td>Переходы по ссылке</td></tr>
          {status === 'success' && items.map((obj) => <tr key={obj.id}>
            <td className={styles.clicked} key={obj.id+1000}
                onClick={() => onClickCopy(`https://front-test.hex.team/s/${obj.short}`)}
            >https://front-test.hex.team/s/{obj.short}
            </td>
            <td key={obj.id+2000}>{obj.target}</td>
            <td key={obj.id+3000}>{obj.counter}</td>
          </tr>)}
        </tbody>
      </table>
      <Pagination currentPage={currentPage}/>
      <Link to="/shortener/login" className={styles.login}>К авторизации</Link>
    </div>
  )
}

export default Home
