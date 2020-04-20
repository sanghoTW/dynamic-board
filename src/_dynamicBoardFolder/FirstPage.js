import React from 'react'

const FirstPage = ({ onPageChange, page, pageName }) => {

    const handlePagechange = () => {
        onPageChange(page);
    }

    return (
        <div className='FirstPage' onClick={handlePagechange}>
            {pageName}
        </div>
    )
}

export default FirstPage