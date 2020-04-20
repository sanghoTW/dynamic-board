import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types';
// board component
import Pagination from './_dynamicBoardFolder/Pagination';
import Header from './_dynamicBoardFolder/Header';
import NoItems from './_dynamicBoardFolder/Noitems';
import Loading from './_dynamicBoardFolder/Loading';
import Error from './_dynamicBoardFolder/Error';
import ItemList from './_dynamicBoardFolder/ItemList';
import Item from './_dynamicBoardFolder/Item';
// pagination component
import FirstPage from './_dynamicBoardFolder/FirstPage';
import LastPage from './_dynamicBoardFolder/LastPage';
import PrevPage from './_dynamicBoardFolder/PrevPage';
import NextPage from './_dynamicBoardFolder/NextPage';
import Page from './_dynamicBoardFolder/Page';
// css
import styles from './DynamicBoard.module.css'

const DynamicBoard = ({
    // board props
    onPageChangeCallBack,
    containerClassName,
    itemListClassName,
    isShowLoadingCpnt,
    isShowNoItemsCpnt,
    isShowHeaderCpnt,
    isShowErrorCpnt,
    onGetBoardItems,
    itemKeyName,
    startPage,
    boardCpntObj: {
        ItemCpnt,
        ErrorCpnt,
        HeaderCpnt,
        LoadingCpnt,
        NoItemsCpnt,
    },
    // pagination props
    isShowFirstNLastCpnt,
    paginationClassName,
    paginationCpntObj,
    countPage,
    countList,
}) => {

    const isInitialMount = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState({
        items: [],
        isNoItems: false,
        totalCount: 0,
        currentPage: startPage,
    });

    // classComponent's componentDidMount 
    useEffect(() => {
        handleGetBoardItems(currentPage, countList);
    }, []);

    // classComponent's componentDidUpdate
    useEffect(() => {
        // initialMount skip
        if (!isInitialMount.current) {
            isInitialMount.current = true;
        } else {
            const { items, totalCount, currentPage } = datas;
            onPageChangeCallBack && onPageChangeCallBack({ items, totalCount, currentPage });
        }
    }, [datas]);

    // handleGetBoardItems
    const handleGetBoardItems = useCallback(async (page, countList) => {
        setError(null)
        setIsLoading(true);

        try {
            const { datas, totalCount } = await onGetBoardItems(page, countList);
            console.log('DynamicBoard onGetBoardItems success : ', { datas, totalCount });

            const datasCount = datas.length;
            if (page > 1 && datasCount === 0) {
                handleGetBoardItems(page - 1);
            } else {
                setDatas({
                    items: datas,
                    isNoItems: (totalCount === 0) && (datasCount === 0) && (page === 1),
                    totalCount,
                    currentPage: page,
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.log('DynamicBoard onGetBoardItems err : ', error);
            setError(error);
            setIsLoading(false);
        }
    }, [])

    const { items, isNoItems, currentPage, totalCount } = datas;
    if (isShowErrorCpnt && error) { return <ErrorCpnt error={error} /> } //error
    if (isShowLoadingCpnt && isLoading) { return <LoadingCpnt /> } //loading
    if (isShowNoItemsCpnt && isNoItems) { return <NoItemsCpnt /> } //noitems
    return ( // board render
        <div className={styles[containerClassName]}>
            {isShowHeaderCpnt && <HeaderCpnt />}
            <ItemList
                itemListClassName={itemListClassName}
                itemKeyName={itemKeyName}
                Item={ItemCpnt}
                datas={items}
            />
            <Pagination
                isShowFirstNLastCpnt={isShowFirstNLastCpnt}
                paginationClassName={paginationClassName}
                paginationCpntObj={paginationCpntObj}
                onPageChange={handleGetBoardItems}
                currentPage={currentPage}
                totalCount={totalCount}
                countPage={countPage}
                countList={countList}
            />
        </div>
    )
}

export default DynamicBoard

DynamicBoard.propTypes = {
    // board props
    onPageChangeCallBack: PropTypes.func,
    containerClassName: PropTypes.string.isRequired,
    itemListClassName: PropTypes.string.isRequired,
    isShowLoadingCpnt: PropTypes.bool.isRequired,
    isShowNoItemsCpnt: PropTypes.bool.isRequired,
    isShowErrorCpnt: PropTypes.bool.isRequired,
    onGetBoardItems: PropTypes.func.isRequired,
    boardCpntObj: PropTypes.object.isRequired,
    itemKeyName: PropTypes.string.isRequired,
    startPage: PropTypes.number.isRequired,
    // pagination props
    isShowFirstNLastCpnt: PropTypes.bool.isRequired,
    paginationClassName: PropTypes.string.isRequired,
    paginationCpntObj: PropTypes.object.isRequired,
    countPage: PropTypes.number.isRequired,
    countList: PropTypes.number.isRequired,
};

DynamicBoard.defaultProps = {
    // board default props
    containerClassName: 'DynamicBoard',
    itemListClassName: 'ItemList',
    isShowLoadingCpnt: true,
    isShowNoItemsCpnt: true,
    isShowHeaderCpnt: true,
    isShowErrorCpnt: true,
    onGetBoardItems: () => console.warn('DynamicBoard onGetBoardItems props not exist'),
    boardCpntObj: {
        ItemCpnt: Item,
        ErrorCpnt: Error,
        HeaderCpnt: Header,
        LoadingCpnt: Loading,
        NoItemsCpnt: NoItems,
    },
    startPage: 1,
    // pagination default props
    paginationClassName: 'Pagination',
    paginationCpntObj: {
        PrevCpnt: PrevPage,
        NextCpnt: NextPage,
        PageCpnt: Page,
        FirstCpnt: FirstPage,
        LastCpnt: LastPage,
    },
    isShowFirstNLastCpnt: false,
    countPage: 5,
    countList: 5,
}

