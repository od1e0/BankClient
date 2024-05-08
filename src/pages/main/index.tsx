import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { SendMoney } from "../../components/send-money"
import { CardRecentTransaction } from '../../components/card-recent-transaction'
import { useGetRecentTransactionsQuery } from '../../app/services/transactionsApi'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import Footer from '../../components/footer'

export const Main = () => {
  const currentUser = useSelector(selectCurrent)

  const { data, refetch } = useGetRecentTransactionsQuery(currentUser?.id ?? "")

  if (!currentUser) {
    return null
  }
  if (!data) {
    return <h2>транзакции отсутствуют</h2>
  }
  return (
    <div>
      <div className="flex">
        <Card className='max-w-full w-[340px] h-[410px]'>
          <CardHeader className='z-10 top-1 flex-col'>
            <h4 className="font-bold text-large mb-2 text-center">Отправка денежных средств</h4>
          </CardHeader>
          <CardBody className="overflow-hidden">
            <SendMoney onTransactionSuccess={refetch} />
          </CardBody>
        </Card>
        <Card className='max-w-full w-[750px] h-[410px] ml-5'>
          <CardBody>
            {data && data.length > 0
              ? data.map(
                ({
                  fromCard,
                  amount,
                  toCard,
                  userId,
                  id,
                  createdAt,
                }) => (
                  <div style={{ marginBottom: '14px' }}>
                    <CardRecentTransaction
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
              : <h1 style={{textAlign: "center", fontWeight: 'bold', fontSize: '18px'}}>Транзакции отсутствуют</h1>}
          </CardBody>
        </Card>
      </div>
      <div style={{ marginTop: '20px'}}>
        <Footer />
      </div>
    </div>
  )
}
