import React from 'react'

const PrevPage = ({ onPageChange, page, pageName }) => {
    const handlePagechange = () => {
        onPageChange(page);
    }

    return (
        <div className='PrevPage' onClick={handlePagechange}>
            {pageName}
        </div>
    )
}

export default PrevPage