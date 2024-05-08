// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody } from "@nextui-org/react"
import {Chip} from "@nextui-org/chip";
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import {useLazyGetRecentTransactionsQuery } from "../../app/services/transactionsApi"
import { useNavigate } from "react-router-dom"

type Props = {
  fromCard: string
  amount: Number
  toCard: string
  userId: string
  createdAt: Date
  id: string
}

export const CardRecentTransaction = ({
  fromCard = "",
  amount = 0,
  toCard = "",
  userId = "",
  createdAt,
  id = "",
}: Props) => {
  const [triggerGetRecentTransactions] = useLazyGetRecentTransactionsQuery()
  const [error, setError] = useState("")


  const handleClick = async () => {
    try {
      await triggerGetRecentTransactions(id)
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
      <CardBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong></strong>{fromCard}</span>
        <span><strong></strong>{toCard}</span>
        <span><strong></strong>{(amount).toLocaleString()}</span>
        <span><strong></strong>{new Date(createdAt).toLocaleString()}</span>
        <Chip color="success" variant="bordered">Успешно</Chip>
    </CardBody>
    </Card> 
  ) 

}