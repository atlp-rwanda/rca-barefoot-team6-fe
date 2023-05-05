import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './plugins/react-query';
import { Toaster } from 'react-hot-toast';

import ErrorPage from './error-page'
import RootLayout from './pages/root'
import About from './pages/about';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ForgotPassword from './pages/auth/forgot';
import Dashboard from './pages/dashboard';
import Requests from './components/dashboard/Requests';
import VerifyEmail from './components/VerifyEmail';

function App() {
  const router = createBrowserRouter([
    {
      children: [
        {
          path: '',
          element: <RootLayout />
        },
        {
          path: '',
          errorElement: <ErrorPage />
        },
        {
          path: 'home',
          element: <RootLayout />
        },
        {
          path: 'about',
          element: <About />
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
          path: 'verify/:token',
          element: <VerifyEmail />
        },
        {
          path: 'auth',
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <Register />
            },
            {
              path: 'forgot-password',
              element: <ForgotPassword />
            }

          ]
        },
        {
          path: 'dashboard',
          children: [
            {
              path: '',
              element: <Dashboard />
            },
            {
              path: 'requests',
              element: <Requests />
            }
          ]
        }
      ],
    }
  ]);

  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App