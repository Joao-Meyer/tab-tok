import { LoadingPage } from 'presentation/atomic-component/atom/loading/loading-page';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout, setRedirectPath } from 'store/persist/slice';
import { paths } from 'main/config';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTokenIsExpired } from 'main/utils/token';
import type { FC } from 'react';

export const PrivateRoute: FC = () => {
  const isExpired = useTokenIsExpired();

  const { isLoading, accessToken, user } = useAppSelector((state) => state.persist);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = (): void => {
      if (accessToken === null || user === null) {
        navigate(paths.login);
        return;
      }

      if (isExpired) {
        dispatch(setRedirectPath(location.pathname));
        dispatch(logout());
        navigate(paths.login);
        return;
      }

      setTimeout(() => dispatch(setRedirectPath(null)), 1000);
    };

    checkToken();
  }, [isExpired, accessToken]);

  if (isExpired) return null;

  return isLoading ? <LoadingPage /> : <Outlet />;
};
