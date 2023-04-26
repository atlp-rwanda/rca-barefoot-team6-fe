import {
  createBrowserRouter,
  RouterProvider
 } from 'react-router-dom'
 import {QueryClientProvider} from 'react-query';
 import {ReactQueryDevtools} from 'react-query/devtools';
 import {queryClient} from './plugins/react-query';
 import { Toaster } from 'react-hot-toast';

 import ErrorPage from './error-page'
 import RootLayout from './pages/root'
import About from './pages/about';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ForgotPassword from './pages/auth/forgot';
import NewPassword from './pages/auth/newPassword';
import Reset from './pages/auth/reset';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: 'about',
          element: <About/>
        },
        {
          path: 'contact',
          element: <div>Contact</div>
        },
        {
          path: 'services',
          element: <div>services</div>
        },
        {
          path: 'auth',
          children: [
            {
              path: 'login',
              element: <Login/>
            },
            {
              path: 'register',
              element: <Register/>
            },
            {
              path: 'forgot-password',
              element: <Reset/>
            },
            {
              path:'reset',
              element:<NewPassword/>
            }

          ]
        }
      ]
    }
  ]);

  return (
    <>
    <Toaster/>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/> 
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    </>
  )
}

export default App
