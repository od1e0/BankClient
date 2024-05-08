/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import { Input } from "../input"
import { useForm } from "react-hook-form"
import { Button } from "@nextui-org/react"
import {
  useSendTransactionMutation,
} from "../../app/services/transactionsApi"
import { useState } from "react"
import { ErrorMessage } from "../error-message"
import { hasErrorField } from "../../utils/has-error-field"
import type { User } from "../../app/types"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"

type SendMoney = {
  fromCard: string
  amount: number
  toCard: string
  user?: User
  userId: String
}

type SendMoneyProps = {
  onTransactionSuccess: () => void;
};

export const SendMoney = ({ onTransactionSuccess }: SendMoneyProps) => {
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
  } = useForm<SendMoney>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      fromCard: "",
      toCard: "",
      amount: 0,
      user: currentUser,
      userId: id
    },
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sendMoney, { isLoading }] = useSendTransactionMutation()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState("")

  const onSubmit = async (data: SendMoney) => {
    try {
      await sendMoney(data).unwrap()
      setValue("fromCard", "")
      setValue("amount", 0)
      setValue("toCard", "")
      onTransactionSuccess();
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form className=" " onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="amount"
        label="Сумма"
        type="number"
        required="Обязательное поле"
      />
      <div className="mt-[10px]">
        <Input
          control={control}
          name="toCard"
          label="Карта"
          type="text"
          required="Обязательное поле"
        />
      </div>
      <ErrorMessage error={error} />
      <div className="flex gap-2 justify-end mt-[25px]">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Отправить деньги
        </Button>
      </div>
    </form>
  )
}
function setValue(arg0: string, arg1: string) {
  throw new Error("Function not implemented.")
}

