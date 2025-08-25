const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json())

const port = 4000;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// use middleware to serve static images
app.use(express.static('public'))

// read data from file
const travelDataRaw = fs.readFileSync('./travel.json', 'utf-8');
const travelData = JSON.parse(travelDataRaw);

app.get('/products', (req, res) => {
  res.json(travelData.countries)
})

app.get('/options', (req, res) => {
  res.json(travelData.options)
})

let orderHistory = [];

app.post('/order', (req, res) => {
  const orderNumber = Math.floor(Math.random() * 1000000);

  // 클라이언트에서 이미 배열로 보내주므로 변환 없이 바로 사용합니다.
  const productsArray = req.body.products;
  const optionsArray = req.body.options;

  const productUnitPrice = 1000; // 여행상품 단가
  const optionUnitPrice = 500;   // 옵션 단가
  
  // 가격 계산
  const productsPrice = productsArray.reduce((sum, [_, count]) => sum + count * productUnitPrice, 0);
  const optionsPrice = optionsArray.reduce((sum, [_, count]) => sum + count * optionUnitPrice, 0);
  const totalPrice = productsPrice + optionsPrice;

   const order = {
    orderNumber,
    totalPrice,
    productsCount: productsArray.reduce((sum, [_, count]) => sum + count, 0),
    optionsCount: optionsArray.reduce((sum, [_, count]) => sum + count, 0),
    productsPrice,
    optionsPrice,
    products: productsArray,
    options: optionsArray
  };

  orderHistory.push(order);
  res.status(201).json(orderHistory);
});

if (require.main === module) {
  app.listen(port, () => console.log(`listening on port ${port}`))
}

module.exports = app;