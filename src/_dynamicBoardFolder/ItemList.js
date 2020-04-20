import React from 'react'
import styles from './ItemList.module.css'

const ItemList = ({ itemListClassName, Item, itemKeyName, datas }) => {
    console.log();
    return (
        <div className={styles[itemListClassName]}>
            {datas.map(data => <Item key={data[itemKeyName]} data={data} />)}
        </div>
    )
}

export default ItemList