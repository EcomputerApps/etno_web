import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from './store'

//Declare dispach to actions and appSelector =>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector