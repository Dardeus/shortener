import React, {useState} from "react";
import styles from "./Sort.module.scss"
import {useDispatch} from "react-redux";
import {setActiveSort} from "../../redux/slices/filterSlice";

export type SortItem = {
  name: string,
  sortProperty: string,
}

export const sortList: SortItem[] = [
  {name: 'короткой ссылке (+)', sortProperty: 'asc_short'},
  {name: 'короткой ссылке (-)', sortProperty: 'desc_short'},
  {name: 'исходной ссылке (+)', sortProperty: 'asc_target'},
  {name: 'исходной ссылке (-)', sortProperty: 'desc_target'},
  {name: 'переходам по ссылке (+)', sortProperty: 'asc_counter'},
  {name: 'переходам по ссылке (-)', sortProperty: 'desc_counter'}
]

type SortProps = {
  activeSort: SortItem
}

const Sort:React.FC<SortProps> = ({activeSort}) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const onClickSort = (obj: SortItem) => {
    dispatch(setActiveSort(obj));
    setVisible(false);
  }

  return (
    <div className={styles.root}>
      <b>Сортировка по: </b>
      <span onClick={() => setVisible(!visible)}>{activeSort.name}</span>
      <div className={styles.sort_popup + (visible ? '' : styles.inactive)}>
        {visible && (
            <ul>
              { sortList.map( (obj, i) =>
                <li key={i}
                    onClick={ () => onClickSort(obj)}
                    className={obj.sortProperty===activeSort.sortProperty ? styles.active : ''}>{obj.name}</li> ) }
            </ul>
          )}
      </div>
    </div>)
}

export default Sort