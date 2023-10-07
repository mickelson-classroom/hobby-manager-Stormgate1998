import { TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { RootState, AppDispatch } from '../store';
import { AnyAction } from 'redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
