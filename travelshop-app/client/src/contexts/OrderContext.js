import { createContext, useState, useEffect, useMemo } from "react";

export const OrderContext =createContext();

export function OrderContextProvider(props) {
  
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map()
  })

  // 주문 데이터를 초기화하는 함수
  const resetOrder = () => {
    setOrderCounts({
      products: new Map(),
      options: new Map(),
    });
  };

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0
  })
 
  const pricePerItem = {
    products: 1000,
    options: 500
  }

  function calculateSubtotal(orderType, orderCounts) {
    let optionCount = 0;
    
    for (const count of orderCounts[orderType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
  }

  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total
    })
  }, [orderCounts]) 

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const oldOrderMap = orderCounts[optionType];
      const newOrderMap = new Map(oldOrderMap);

      newOrderMap.set(itemName, parseInt(newItemCount));

      const newOrderCounts = { ...orderCounts }; // { ... sth } : 얕은 복사 = 첫 번째 depth만 복사
      newOrderCounts[optionType] = newOrderMap;

      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount, resetOrder]
  }, [orderCounts, totals])

  return <OrderContext.Provider value={value} {...props} />;
}
   