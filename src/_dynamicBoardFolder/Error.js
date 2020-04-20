import React from 'react'

const Error = ({ error }) => {
    console.log('DynamicBoard Error', error)
    return (
        <div className="Error">
            게시판 오류발생
        </div>
    )
}

export default Error