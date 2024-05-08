// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody, CardHeader} from "@nextui-org/react"
import {Chip} from "@nextui-org/chip";
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import { useLazyGetAllTransactionsQuery } from "../../app/services/transactionsApi"
import { useNavigate } from "react-router-dom"

type Props = {
  key: string
  fromCard: string
  amount: Number
  toCard: string
  userId: string
  createdAt: Date
  id: string
}

export const CardTransaction = ({
  fromCard = "",
  amount = 0,
  toCard = "",
  userId,
  createdAt,
  id,
}: Props) => {
  const [triggerGetAllTransactions] = useLazyGetAllTransactionsQuery()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrent)

  const handleClick = async () => {
    try {
      await triggerGetAllTransactions(id)
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      } else {
        setError(err as string)
      }
    }
  }

  return(
    <Card>
      <CardHeader>
        <h4 className="font-bold text-large mb-2 text-center">Перевод:</h4>
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>Ваша карта:</strong> {fromCard}</span>
        <span><strong>Карта получателя:</strong> {toCard}</span>
        <span><strong>Сумма:</strong> {(amount).toLocaleString()}</span>
        <span><strong>Дата:</strong> {new Date(createdAt).toLocaleString()}</span>
        <Chip color="success" variant="bordered">Успешно</Chip>
      </div>
    </CardBody>
    </Card>
  )

}