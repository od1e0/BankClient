import type { Card } from "../types"
import { api } from "./api"

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCard: builder.mutation<Card, { cardHolder: string }>({
      query: (postData) => ({
        url: "/cards",
        method: "POST",
        body: postData,
      }),
    }),
    updateCardById: builder.query<Card[], void>({
      query: () => ({
        url: "/cards",
        method: "PATCH",
      }),
    }),
    getCardById: builder.query<Card[], string>({
      query: (id) => ({
        url: `/cards/${id}`,
        method: "GET",
      }),
    }),
    deleteCard: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cards/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreateCardMutation,
  useUpdateCardByIdQuery,
  useGetCardByIdQuery,
  useDeleteCardMutation,
  useLazyUpdateCardByIdQuery,
  useLazyGetCardByIdQuery,
} = postApi

export const {
  endpoints: { createCard, updateCardById, getCardById, deleteCard },
} = postApi