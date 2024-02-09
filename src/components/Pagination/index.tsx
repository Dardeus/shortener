import React from "react";
import styles from './Pagination.module.scss'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import ReactPaginate from "react-paginate";
import {setCurrentPage} from "../../redux/slices/filterSlice";

type PaginationProps = {
  currentPage: number,
}
const Pagination: React.FC<PaginationProps> = () => {
  const {totalCount} = useSelector((state: RootState) => state.statistics)
  const dispatch = useAppDispatch()
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected))}
      pageRangeDisplayed={3}
      pageCount={totalCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination