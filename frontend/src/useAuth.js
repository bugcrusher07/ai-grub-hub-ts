import { useSelector, useDispatch } from 'react-redux';
import {clearError} from './authSlice';

export function useAuth() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setError = () => dispatch(clearError());

  return { user, loading, error, setError };
}
