import React from 'react'
import styles from './Item.module.css'
const Item = ({ data }) => {
    return (
        <div className={styles.Item}>
            {JSON.stringify(data)}
        </div>
    )
}

export default Item