import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Details from './details';

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

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Main />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default function AppRouter() {
  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );
}
