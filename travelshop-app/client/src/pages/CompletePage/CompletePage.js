import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../contexts/OrderContext'
import axios from 'axios';

// 테이블 스타일
const thStyle = { border: "1px solid black", padding: "5px" };
const tdStyle = { 
  border: "1px solid black", 
  padding: "5px",
  whiteSpace: 'pre-line' // 이 줄을 추가하세요!
};

const CompletePage = ({ setStep }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderData, _, resetOrder] = useContext(OrderContext); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderData && orderData.totals && orderData.totals.total !== undefined) {
      orderCompleted(orderData);
    }
  }, []); // 최초 렌더링 시 한 번만 실행되도록 의존성 배열을 비워두기

  const orderCompleted = async (orderData) => {
    try {
      const payload = {
        totals: orderData.totals,
        products: Array.from(orderData.products.entries()),
        options: Array.from(orderData.options.entries())
      };

      const response = await axios.post('http://localhost:4000/order', payload);
      setOrderHistory(response.data);
      setLoading(false);
      
      // 👇 주문이 성공적으로 완료되었으므로 Context 데이터를 초기화합니다!
      resetOrder();
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <div>...loading</div>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>주문이 성공했습니다.</h2>
      <h3>지금까지 모든 주문</h3>

      <table style={{ margin: "auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>주문 번호</th>
            <th style={thStyle}>총 가격</th>
            <th style={thStyle}>여행 상품 개수</th>
            <th style={thStyle}>여행 상품 가격</th>
            <th style={thStyle}>옵션 개수</th>
            <th style={thStyle}>옵션 가격</th>
            <th style={thStyle}>선택한 여행 상품</th>
            <th style={thStyle}>선택한 옵션</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map(order => (
            <tr key={order.orderNumber}>
              <td style={tdStyle}>{order.orderNumber}</td>
              <td style={tdStyle}>{order.totalPrice}</td>
              <td style={tdStyle}>{order.productsCount}</td>
              <td style={tdStyle}>{order.productsPrice}</td>
              <td style={tdStyle}>{order.optionsCount}</td>
              <td style={tdStyle}>{order.optionsPrice}</td>
              <td style={tdStyle}>
                {order.products.map(([name, count]) => `${name} x ${count}`).join("\n")}
              </td>
              <td style={tdStyle}>
                {order.options.map(([name, count]) => `${name} x ${count}`).join("\n")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={() => setStep(0)}>첫 페이지로</button>
    </div>
  )
}

export default CompletePage
