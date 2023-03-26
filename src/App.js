import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './store/dataSlice'

function App() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.data)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  
  return (
    <>
      <ul>
        {data.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
