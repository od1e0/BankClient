// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/userSlice'
import { useForm } from 'react-hook-form'
import type { User } from '../../app/types'
import { useCreateCreditMutation } from '../../app/services/creditApi'
import { useState } from 'react'
import { Button, Card, CardBody, Slider, Image, Link } from '@nextui-org/react'
import { Input } from '../input'
import { ErrorMessage } from '../error-message'
import { hasErrorField } from '../../utils/has-error-field'



type CreateCredit = {
  fullName: string
  passportId: string
  number: string
  amount: number
  user?: User
  userId: String
}

type Props = {
  setSelected: (value: string) => void
}

export const CreateCredit = ({ setSelected }: Props) => {
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
  } = useForm<CreateCredit>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      fullName: "",
      passportId: "",
      number: "",
      amount: 0,
      user: currentUser || "",
      userId: id || "" 
    },
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [createCredit, { isLoading }] = useCreateCreditMutation()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState("")

  const onSubmit = async (data: CreateCredit) => {
    try {
      await createCredit(data).unwrap()
      setValue("number", "")
      setValue("fullName", "")
      setValue("passportId", "")
      setValue("amount", 0)
      window.location.reload()
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="fullName"
        label="ФИО"
        type="text"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="passportId"
        label="Идентификационный номер"
        type="text"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="number"
        label="Ваш номер телефона"
        type="tel"
        required="Обязательное поле"
      /><Input
        control={control}
        name="amount"
        label="Сумма"
        type="number"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Подать заявку
        </Button>
      </div>
    </form>
  )
}
