import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'

const Home = () => {

  // call axios to get backend data
  const [data, setData] = useState({})

  axios.get('http://localhost:3000/api/v1/products', {
    auth: {
      username: '#',
      password: '#'
    },

  })


  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Home
