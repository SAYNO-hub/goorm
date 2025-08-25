import React, { useContext } from 'react'
import Type from '../../components/Type'
import { OrderContext } from '../../contexts/OrderContext';

const OrderPage = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '30px' }}>
        <h1>Travel Products</h1>

        {/* 주문 현황 보기 버튼 */}
        <div>
          <button onClick={() => setStep(2)}>
            주문 현황 보기
          </button>
        </div>
      </div>
      
      <div>
        <Type orderType="products" />
      </div>
      <div style={{ display: 'flex', marginTop: 20 }}>
        <div style={{ width: '50%'}}>
          <Type orderType="options"/>
        </div>
        <div style={{ width: '50%'}}>
          <p>Total Price: {orderData.totals.total}</p>
          <br/>
          <button onClick={() => setStep(1)}>주문</button>        
        </div>
      </div>
    </div>
  )
}

export default OrderPage