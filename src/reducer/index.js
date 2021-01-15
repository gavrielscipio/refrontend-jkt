import {combineReducers} from 'redux'

import {productReducer} from './productReducer'

const allReducers = combineReducers ({
    product: productReducer
}) 

export default allReducers