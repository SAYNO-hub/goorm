import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Products from './Products';
import Options from './Options';
import { OrderContext } from '../contexts/OrderContext';

const Type = ({ orderType }) => {

  console.log("👉 Type 컴포넌트 렌더링됨", orderType);

  const [items, setItems] = useState([]);
  const [orderData , updateItemCount] = useContext(OrderContext);
  // [{ ...orderCounts, totals} , updateItemCount]
  
  useEffect(() => {
    loadItems(orderType)
  }, [orderType])

  const loadItems = async (orderType) => {
    try {
      const response = await axios.get(`http://localhost:4000/${orderType}`)
      setItems(response.data);
      console.log('response.data: ', response.data);

    } catch (error) {
      console.error("👉 axios 요청 에러:", error);
    }
  }

  const ItemComponent = orderType === "products" ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponent 
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, orderType)}
    />
  ))

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격: {orderType === "products" ? 1000 : 500}</p>
      <p>총 가격: {orderData.totals[orderType]}</p>
      <div
        style={{
          display: 'flex',
          flexDirection: orderType === "products" ? 'row' : 'column'
        }}
      >
        {optionItems}
      </div>
    </div>
  )
}

export default Type