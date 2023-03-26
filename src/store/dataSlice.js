import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// define a asynchronous function that will fetch data and dispatch the results
const fetchData = () => async(dispatch) => {
    try {
        const res = await axios.get('http://localhost:4000/product')
        dispatch(setData(res.data))
    } catch (err) {
        console.error(err)
    }
}

// slice of the store to manage data
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: []
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setData } = dataSlice.actions
export { fetchData }
export default dataSlice.reducer
