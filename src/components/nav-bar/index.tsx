import type React from "react"
import { FaCreditCard, FaRetweet, FaHome, FaClipboardList } from "react-icons/fa";
import { NavButton } from "../nav-button"

export const NavBar: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <NavButton href="/" icon={<FaHome />}>
            Главная
          </NavButton>
        </li>
        <li>
          <NavButton href="transactions" icon={<FaRetweet />}>
            Транзакции
          </NavButton>
        </li>
        <li>
          <NavButton href="cards" icon={<FaCreditCard />}>
            Карты
          </NavButton>
        </li>
        <li>
          <NavButton href="credit" icon={<FaClipboardList />}>
            Кредиты
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}