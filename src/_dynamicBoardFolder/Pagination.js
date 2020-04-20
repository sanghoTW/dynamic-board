import React, { useCallback } from 'react'
import PropTypes from 'prop-types';
import styles from './Pagination.module.css'

const Pagination2 = ({
    isShowFirstNLastCpnt,
    paginationClassName,
    paginationCpntObj: {
        PrevCpnt,
        NextCpnt,
        PageCpnt,
        FirstCpnt,
        LastCpnt,
    }, // 페이지네이션 관련 컴포넌트, 클레스 이름 및 스타일
    onPageChange, // 페이지 클릭
    currentPage,  // 페이지 번호
    totalCount,   // 총 게시물 수
    countPage,    // 한 화면에 출력될 페이지 수
    countList     // 한 화면에 출력될 게시물 수
}) => {

    const getPager = useCallback(() => {
        // - 총 페이지 수 계산
        let totalPage = parseInt(totalCount / countList); //ex) 22 / 5 = 4
        if (totalCount % countList > 0) { totalPage++; }  //ex) 22 % 5 = 2

        // - 현재 페이지가, 총 페이지 번호보다 크면, 강제로 총 페이지 번호로 치환
        if (totalPage < currentPage) { currentPage = totalPage; }

        // - 시작, 종료 페이지
        let startPage = (parseInt((currentPage - 1) / countPage)) * countPage + 1;
        let endPage = startPage + countPage - 1;
        if (endPage > totalPage) { endPage = totalPage; }

        // - 이전, 다음 버튼
        const next = ((Math.ceil(currentPage / countPage) * countPage) + 1) <= totalPage ? true : false;
        const prev = (currentPage > countPage) && ((Math.ceil((currentPage - countPage) / countPage) * countPage)) ? true : false;

        // - 이전, 다음 페이지
        const prevPage = Math.ceil((currentPage - countPage) / countPage) * countPage;
        const nextPage = (Math.ceil(currentPage / countPage) * countPage) + 1;

        // - 처음, 마지막 버튼
        const first = currentPage > 1;
        const last = currentPage < totalPage;

        // - 페이지
        const pageArr = ((start, end) => [...Array(end - start)].map((_, i) => start + i))(startPage, endPage + 1);

        return {
            first,
            last,
            prev,
            next,
            totalPage,
            pageArr,
            prevPage,
            nextPage
        }
    }, [currentPage, totalCount, countPage, countList])

    const {
        first,
        last,
        prev,
        next,
        totalPage,
        pageArr,
        prevPage,
        nextPage
    } = getPager();
    const isShowFirstCpnt = isShowFirstNLastCpnt && first;
    const isShowLastCptn = isShowFirstNLastCpnt && last;
    return (
        <div className={styles[paginationClassName]}>
            {isShowFirstCpnt &&
                <FirstCpnt
                    onPageChange={onPageChange}
                    page={1}
                    pageName="처음"
                />}
            {prev &&
                <PrevCpnt
                    onPageChange={onPageChange}
                    page={prevPage}
                    pageName="이전"
                />}
            {pageArr.map(page =>
                <PageCpnt
                    key={page}
                    isSelectd={currentPage === page}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    page={page}
                />)}
            {next &&
                <NextCpnt
                    onPageChange={onPageChange}
                    page={nextPage}
                    pageName="다음"
                />}
            {isShowLastCptn &&
                <LastCpnt
                    onPageChange={onPageChange}
                    page={totalPage}
                    pageName="끝"
                />}
        </div>
    )
}

Pagination2.propTypes = {
    isShowFirstNLastCpnt: PropTypes.bool.isRequired,
    paginationClassName: PropTypes.string.isRequired,
    paginationCpntObj: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    countPage: PropTypes.number.isRequired,
    countList: PropTypes.number.isRequired,
};

export default Pagination2