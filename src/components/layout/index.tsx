import { useEffect } from "react"
import { Container } from "../container"
import { NavBar } from "../nav-bar"
import { Outlet, useNavigate } from "react-router-dom"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import {
  selectIsAuthenticated,
} from "../../features/user/userSlice"
import { Header } from "../header"

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  )
}