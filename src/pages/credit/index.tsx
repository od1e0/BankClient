import React, { useState } from 'react'
import { CreateCredit } from '../../components/create-credit'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { CardCredit } from '../../components/card-credit'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import { useGetAllCreditsQuery } from '../../app/services/creditApi'
import { AdminCredit } from '../../components/admin-credit'

export const Credit = () => {
  const currentUser = useSelector(selectCurrent)

  const isAdmin = currentUser?.email === 'admin@admin.com';

  const { data, refetch } = useGetAllCreditsQuery(currentUser?.id ?? "")
  const [selected, setSelected] = useState("createCredit")

  if (isAdmin) {
    return <AdminCredit />;
  }

  return (
    <div className="flex justify-center">
      <div className="flex">
        <Card className='max-w-full w-[500px] h-[500px]'>
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
            >
              <Tab key="createCredit" title="Взять кредит">
                <CreateCredit setSelected={setSelected} />
              </Tab>
              <Tab key="allCredits" title="Ваши кредиты">
                {data && data.length > 0
                  ? data.map(
                    ({
                      fullName,
                      amount,
                      number,
                      passportId,
                      status,
                      userId,
                      id,
                      createdAt,
                    }) => (
                      <div style={{ marginBottom: '14px' }}>
                        <CardCredit
                          key={id}
                          fullName={fullName ?? ""}
                          amount={amount ?? 0}
                          number={number}
                          passportId={passportId}
                          status={status}
                          userId={userId}
                          id={id}
                          createdAt={createdAt}
                          setSelected={setSelected}
                        />
                      </div>  
                    ),
                  )
                  : <h1>У вас нету кредитов</h1>}
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
