import { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import CardImage from '../../images/Card.png';
import { selectCurrent } from '../../features/user/userSlice'
import { useLazyGetCardByIdQuery } from '../../app/services/cardsApi'
import { useNavigate } from 'react-router-dom'
import { hasErrorField } from '../../utils/has-error-field'

type Props = {
  cardHolder: string,
  validity: string,
  cardNumber: string,
  balance: Number,
  userId: string,
  createdAt?: Date,
  id?: string
}

export const BankCard = ({
  cardHolder = "",
  validity = "",
  cardNumber = "",
  balance = 0,
  userId = "",
  createdAt,
  id = ""
}: Props) => {
  const [triggerGetCardById] = useLazyGetCardByIdQuery()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrent)

  const handleClick = async () => {
    try {
      await triggerGetCardById(currentUser?.id ?? "")
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      } else {
        setError(err as string)
      }
    }
  }

  function formatCardNumber(number: string) {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', }}>
      <div style={{ position: 'absolute', width: '300px', height: '200px' }}>
        <img src={CardImage} alt="Card" style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', top: '81%', left: '7%', color: 'white' }}>
          <p style={{ fontSize: '11px', fontWeight: 'bold' }}>{cardHolder}</p>
        </div>
        <div style={{ position: 'absolute', top: '85%', left: '64%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          <p style={{ fontSize: '11px', fontWeight: 'bold' }}>{validity}</p>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '35%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCardNumber(cardNumber)}</p>
        </div>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Баланс: {(balance).toLocaleString()}р.</p>
      </div>
    </div>
  )
}
