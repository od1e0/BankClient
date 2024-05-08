import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Auth } from "./pages/auth"
import { AuthGuard } from "./features/user/authGuard"
import { Layout } from "./components/layout"
import { Main } from "./pages/main"
import { Cards } from "./pages/myCards"
import { Transactions } from "./pages/myTransactions"
import { UserProfile } from "./pages/user-profile"
import { Credit } from "./pages/credit"

const router = createBrowserRouter([
  {
    path: '/auth',
    element:<Auth/>
  },
  {
    path: '/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Main/>
      },
      {
        path:"users/:id",
        element:<UserProfile/>
      },
      {
        path:"cards",
        element:<Cards/>
      },
      {
        path:"transactions",
        element:<Transactions/>
      },
      {
        path:"credit",
        element:<Credit/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthGuard>
          <RouterProvider router={router} />
        </AuthGuard>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
