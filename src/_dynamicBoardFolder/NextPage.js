import React from 'react'

const NextPage = ({ onPageChange, page, pageName }) => {
    const handlePagechange = () => {
        onPageChange(page);
    }

    return (
        <div className='NextPage' onClick={handlePagechange}>
            {pageName}
        </div>
    )
}

export default NextPage