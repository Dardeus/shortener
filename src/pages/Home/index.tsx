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
  const {username, password, access_token} = useSelector((state: RootState) => state.auth)
  const {activeSort, currentPage} = useSelector((state:RootState) => state.filter)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchStatistics({access_token, sortProperty: activeSort.sortProperty, currentPage}))
  }, [access_token, activeSort, currentPage]);

  useEffect(() => {
    if (status==="error") {
      dispatch(fetchAccessToken({username, password}))
    }
    else if (status==="success" && !username && !items.length) {
      navigate('/shortener/login')
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
      <div className={styles.header}>
        <Sort activeSort={activeSort}/>
        <AddLink access_token={access_token}/>
        <Link to="/shortener/login" className={styles.login}>К авторизации</Link>
      </div>
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
    </div>
  )
}

export default Home
