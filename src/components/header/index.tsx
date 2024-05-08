import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
  } from "@nextui-org/react"
  import { LuSunMedium } from "react-icons/lu"
  import { FaRegMoon } from "react-icons/fa"
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  import { useDispatch, useSelector } from "react-redux"
  import { CiLogout } from "react-icons/ci"
  import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
  import { useNavigate } from "react-router-dom"
  import { useContext } from "react"
  import { ThemeContext } from "../theme-provider"
import { Profile } from "../profile"

export const Header = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const hadleLogout = () => {
      dispatch(logout())
      localStorage.removeItem('token')
      navigate("/auth")
    }
  
    return (
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Banking App</p>
        </NavbarBrand>
  
        <NavbarContent justify="end">
          <NavbarItem>
            <Profile/>
          </NavbarItem>
          <NavbarItem>
            {isAuthenticated && (
              <Button
                color="default"
                variant="flat"
                className="gap-2"
                onClick={hadleLogout}
              >
                <CiLogout /> <span>Выйти</span>
              </Button>
            )}
          </NavbarItem>
          <NavbarItem
            className="lg:flex text-3xl cursor-pointer"
            onClick={() => toggleTheme()}
          >
            {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
  }