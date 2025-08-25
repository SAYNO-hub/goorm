import React from 'react'

const Products = ({ name, imagePath, updateItemCount }) => {
  console.log("👉 Props:", { name, imagePath });

  const fullUrl = `http://localhost:4000${imagePath}`;
  console.log("👉 최종 이미지 URL:", fullUrl);

  const handleChange = (event) => {
    const currentValue = event.target.value;
    updateItemCount(name, currentValue);
  }

  return (
    <div style={{ textAlign: 'center'}}>
      <img 
        style={{ width: '90%' }}
        src={fullUrl}
        alt={`${name} product`}
      />
      <form style={{ marginTop: 10 }}>
        <label style={{ textAlign: 'right' }}>
          {name} :
        </label>
        <input 
          style={{ margin: '7px', width: '50px', textAlign: 'center' }}
          type='number'
          defaultValue={0}
          min="0"
          name="quantity"
          onChange={handleChange}
        />
        <label style={{ textAlign: 'right' }}>
          개
        </label>
      </form>
    </div>
  )
}

export default Products