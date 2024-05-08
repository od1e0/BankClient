import { useState } from 'react'
import { useCreateCardMutation } from '../../app/services/cardsApi'
import { useForm } from 'react-hook-form'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import { IoMdCreate } from "react-icons/io"
import { selectCurrent } from '../../features/user/userSlice'
import { ErrorMessage } from '../error-message'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { Input } from '../input'
import type { User } from '../../app/types'

type CreateCard = {
  cardHolder: string
  user?: User
  userId: String
}

export const CreateCard = () => {
  const currentUser = useSelector(selectCurrent)
  if (!currentUser) {
    return null
  }

  const { id } = currentUser
  const {
    handleSubmit,
    control,
    setValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<CreateCard>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      cardHolder: "",
      user: currentUser,
      userId: id
    },
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [createCard, { isLoading }] = useCreateCardMutation()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [setError] = useState("")

  const onSubmit = async (data: CreateCard) => {
    try {
      await createCard(data).unwrap()
      setValue("cardHolder", "")
      window.location.reload()
    } catch (error) {
      console.log("err", error)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', }}>
      <Card className='w-[250px]'>
        <CardHeader>
          <h1 style={{textAlign: "center", fontWeight: 'bold', fontSize: '16px'}}>Карта отсутствует</h1>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              control={control}
              name="cardHolder"
              label="Ваша имя и фамилия"
              type="text"
              required="Обязательное поле"
            />
            <Button
              color="primary"
              className="flex-end"
              type="submit"
            >
              Создать карту
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
