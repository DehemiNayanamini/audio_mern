//import { useState } from 'react'
import './App.css'
import ProductCard from './components/productCart'

function App() {
 

  return (
    <>
    <div >
      <ProductCard
  image="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
  title="Dove Intense Repair Shampoo, 180ml"
  price={488}
  oldPrice={750}
  discount={35}
/>
<ProductCard
  image="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
  title="Dove Intense Repair Shampoo, 180ml"
  price={488}
  oldPrice={750}
  discount={35}
/>
    </div>
    </>
  )
}

export default App
