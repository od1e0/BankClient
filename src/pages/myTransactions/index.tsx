import { useState } from 'react'
import { useGetAllTransactionsQuery } from '../../app/services/transactionsApi'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import { CardTransaction } from '../../components/card-transaction'
import { Pagination } from '@nextui-org/pagination'
import './Transactions.css'

export const Transactions = () => {
  const currentUser = useSelector(selectCurrent)
  
  const { data } = useGetAllTransactionsQuery(currentUser?.id ?? "")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  if (!currentUser) {
    return null
  }
  if (!data) {
    return <h2>транзакции отсутствуют</h2>
  }

  const transactionsOnPage = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <div className="transactions-container">
        {transactionsOnPage && transactionsOnPage.length > 0
          ? transactionsOnPage.map(
              ({
                fromCard,
                amount,
                toCard,
                userId,
                id,
                createdAt,
              }) => (
                <div style={{ marginBottom: '10px' }}> 
                <CardTransaction
                  key={id}
                  fromCard={fromCard ?? ""}
                  amount={amount ?? 0}
                  toCard={toCard}
                  userId={userId}
                  id={id}
                  createdAt={createdAt}
                />
              </div>
              ),
            )
          : <h4 className="font-bold text-large text-center">Транзакций нету</h4>}
      </div>
      <div className="pagination-container">
        <Pagination
          total={Math.ceil(data.length / itemsPerPage)}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  )
}
