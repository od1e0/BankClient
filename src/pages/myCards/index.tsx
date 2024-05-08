import React from 'react'

import { useGetCardByIdQuery } from '../../app/services/cardsApi';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';
import { CreateCard } from '../../components/create-bank-card';
import { BankCard } from '../../components/card-bank';

export const Cards = () => {
  const currentUser = useSelector(selectCurrent)
  const { data } = useGetCardByIdQuery(currentUser?.id ?? "")

  if (!data) {
    return <CreateCard/>
  }

  return (
    <>
      {data && data.length > 0
        ? data.map(
          ({
            cardHolder,
            validity,
            balance,
            userId,
            cardNumber,
            id,
            createdAt,
          }) => (
            <div style={{ marginBottom: '14px' }}>
              <BankCard
                key={id}
                cardHolder={cardHolder}
                balance={balance ?? 0}
                validity={validity}
                cardNumber={cardNumber}
                userId={userId}
                id={id}
                createdAt={createdAt}
              />
            </div>
          ),
        )
        : <CreateCard/>}
    </>
  )
}
