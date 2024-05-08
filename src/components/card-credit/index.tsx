import React, { useState } from 'react'
import { useLazyGetAllCreditsQuery } from '../../app/services/creditApi'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import { hasErrorField } from '../../utils/has-error-field'
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react'
import { ErrorMessage } from '../error-message'


type CardCredit = {
  fullName: string,
  passportId: string,
  number: string,
  amount: Number,
  userId: string,
  status: string,
  createdAt?: Date,
  id?: string
  setSelected: (value: string) => void
}



export const CardCredit = ({
  fullName = "",
  passportId = "",
  number = "",
  amount = 0,
  status = "",
  userId = "",
  createdAt,
  id = "",
  setSelected
}: CardCredit) => {
  const [triggerGetAllCredit] = useLazyGetAllCreditsQuery()
  const [error, setError] = useState("")
  const currentUser = useSelector(selectCurrent)

  const handleClick = async () => {
    try {
      await triggerGetAllCredit(currentUser?.id ?? "")
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  let chipColor: "default" | "warning" | "danger" | "success" | "primary" | "secondary" = "default";

  switch (status) {
    case 'Обработка':
      chipColor = "warning";
      break;
    case 'Отказано':
      chipColor = "danger";
      break;
    case 'Одобрен':
      chipColor = "success";
      break;
    default:
      chipColor = "default";
  }

  return (
    <Card>
      <CardHeader>
        <h4 className="font-bold text-large mb-2 text-center">Ваш кредит</h4>
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <span><strong>ФИО:</strong> {fullName}</span>
          <span><strong>Идентификационный номер:</strong> {passportId}</span>
          <span><strong>Номер:</strong> {number}</span>
          <span><strong>Сумма:</strong> {(amount).toLocaleString()} р.</span>
          <span><strong>Дата:</strong> {new Date(createdAt || Date.now()).toLocaleString()}</span>
          <ErrorMessage error={error} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Chip color={chipColor} variant="bordered">{status}</Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
