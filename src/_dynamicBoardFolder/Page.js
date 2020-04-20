import React from 'react'
import styles from './Page.module.css'

const Page = ({ onPageChange, isSelectd, currentPage, page }) => {

    const handlePagechange = () => {
        if (currentPage === page) { return; }
        onPageChange(page);
    }

    return (
        <div className={styles.Page} onClick={handlePagechange} style={{ color: isSelectd && 'red' }}>
            {page}
        </div>
    )
}

export default Page