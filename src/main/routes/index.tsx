import { AuthContent, HomeContent } from 'presentation/environment';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';
import { MainTemplate, PublicTemplate } from 'presentation/atomic-component/template';
import { PrivateRoute, PublicRoute } from 'main/proxies';
import { Suspense } from 'react';
import { routePaths } from 'main/config';
import type { FC } from 'react';

const RouterConfig: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Outlet />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicTemplate />}>
            <Route element={<AuthContent />} path={routePaths.login} />
          </Route>
        </Route>

        {/* Restaurant Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainTemplate />}>
            <Route element={<HomeContent />} path={routePaths.home} />
          </Route>
        </Route>

        <Route>
          <Route
            element={
              <div className={'flex flex-col gap-2 items-center justify-center w-full h-screen'}>
                Not Found <Button onClick={(): void => window.history.back()}>go back</Button>
              </div>
            }
            path={'*'}
          />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default RouterConfig;
