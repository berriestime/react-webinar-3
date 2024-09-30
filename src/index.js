import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Details from './app/details';

const store = new Store();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/details/:id',
    element: <Details />,
  },
]);

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
);
