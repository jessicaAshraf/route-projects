import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css'
import { HeroUIProvider} from "@heroui/react";
import MainLayout from './layouts/MainLayout';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {ToastProvider} from "@heroui/toast";
import ProtectedRoute from './protectedRoutes/ProtectedRoute'
import ProtectedAuthRoute from './protectedRoutes/ProtectedAuthRoute'
import AuthContextProvider from './contexts/authContext'
import PostDetails from './pages/PostDetails'
const router= createBrowserRouter([
  {path:'' ,element:<MainLayout/>,children:[
    {index: true, element:<ProtectedRoute><Feed/></ProtectedRoute>},
  
  {path:'profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
  {path:'post/:postId', element:<ProtectedRoute><PostDetails/></ProtectedRoute>},
  {path:'*', element:<NotFound/>},
  ]},
  {
    path:'', element:<AuthLayout/>,children:[
   {path:'signin', element: <ProtectedAuthRoute><SignIn/></ProtectedAuthRoute>},
  {path:'signup', element:<ProtectedAuthRoute><SignUp/></ProtectedAuthRoute>},
    ]
  }
])


function App() {


  return (
    <>
    <AuthContextProvider>
      <HeroUIProvider>
       <ToastProvider />
       <RouterProvider router={router}/>
    </HeroUIProvider>
    
    </AuthContextProvider>
    </>
  )
}

export default App
