import React from 'react'

const LastPage = ({ onPageChange, page, pageName }) => {
    const handlePagechange = () => {
        onPageChange(page);
    }

    return (
        <div className='LastPage' onClick={handlePagechange}>
            {pageName}
        </div>
    )
}

export default LastPage