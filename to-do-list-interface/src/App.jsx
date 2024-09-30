import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReactDOM } from "react"
import './App.css'
import LadingPageToDo from './pages/landing page/landingPageToDo'
import LoggedIndexPage from "./pages/internal/loggedIndexPage"
import LoginSignUpPage from "./pages/login_signup/login_SignupPage"
import ManageUsersByAdmin from "./pages/manage_users/manageUsersByAdmin"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LadingPageToDo />
  },
  {
    path: '/dashboard',
    element: <LoggedIndexPage />
  },
  {
    path: '/login',
    element: <LoginSignUpPage />
  },
  {
    path: '/manage-users',
    element: <ManageUsersByAdmin />
  }
])

function App() {
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
