import React, { useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import { useLazyGetAllCreditForAdminQuery, useUpdateCreditMutation } from '../../app/services/creditApi'
import { Button, Card, CardBody, CardFooter } from '@nextui-org/react'

export const AdminCredit = () => {
  const currentUser = useSelector(selectCurrent)

  const [triggerGetAllCreditForAdmin, { data: credits }] = useLazyGetAllCreditForAdminQuery()
  const [updateCredit] = useUpdateCreditMutation()

  useEffect(() => {
    if (currentUser) {
      triggerGetAllCreditForAdmin(currentUser.id)
    }
  }, [currentUser, triggerGetAllCreditForAdmin])

  const handleApprove = async (creditId: string) => {
    await updateCredit({ id: creditId, status: 'Одобрен' })
    window.location.reload()
  }

  const handleReject = async (creditId: string) => {
    await updateCredit({ id: creditId, status: 'Отказано' })
    window.location.reload()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      {credits?.map((credit) => (
        <Card key={credit.id} className='w-[500px]'>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <span><strong>ФИО:</strong> {credit.fullName}</span>
              <span><strong>Идентификационный номер:</strong> {credit.passportId}</span>
              <span><strong>Номер:</strong> {credit.number}</span>
              <span><strong>Сумма:</strong> {(credit.amount).toLocaleString()} р.</span>
              <span><strong>Дата:</strong> {new Date(credit.createdAt || Date.now()).toLocaleString()}</span>
            </div>
          </CardBody>
          <CardFooter>
            {credit.status === 'Обработка' && (
              <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button color="success" onClick={() => handleApprove(credit.id)}>Одобрить</Button>
                <Button color="danger" onClick={() => handleReject(credit.id)}>Отказать</Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )


}
