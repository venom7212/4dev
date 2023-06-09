import { configureStore } from '@reduxjs/toolkit'
import tasksSliceReducer from './features/tasksSlice.js';

export default configureStore({
	reducer: {
		state: tasksSliceReducer,
	},
})

