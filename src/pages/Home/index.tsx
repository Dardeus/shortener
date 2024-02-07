import React, {useEffect} from 'react'
import {fetchStatistics} from "../../redux/slices/statisticSlice";
import {RootState, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import styles from './Home.module.scss'

const Home = () => {
  const dispatch = useAppDispatch()
  const {items, status} = useSelector ((state: RootState) => state.statistics)

  useEffect(() => {
    dispatch(fetchStatistics())
  }, []);

  console.log(items)
  return (
    <div className={styles.root}>
      <table>
        <tbody>
          <tr><td>Короткая ссылка</td><td>Исходная ссылка</td><td>Переходы по ссылке</td></tr>
          {items.map((obj) => <tr key={obj.id}>
            <td key={obj.id+1000}>https://front-test.hex.team/s/{obj.short}</td>
            <td key={obj.id+2000}>{obj.target}</td>
            <td key={obj.id+3000}>{obj.counter}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Home