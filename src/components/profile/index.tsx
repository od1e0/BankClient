import { Card, CardHeader, CardBody } from "@nextui-org/react"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { MdAlternateEmail } from "react-icons/md"
import { BASE_URL } from "../../constants"
import { Link } from "react-router-dom"

export const Profile = () => {
  const current = useSelector(selectCurrent)

  if (!current) {
    return null
  }

  const { name, email, avatarUrl, id } = current

  return (
    <>
      <h4 className="font-bold text-large">{name}</h4>
    </>

  )
}