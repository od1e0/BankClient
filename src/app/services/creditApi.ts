import type { Credit } from "../types"
import { api } from "./api"

export const creditApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createCredit: builder.mutation<
            Credit,
            { amount: number; fullName: string; number: string; passportId: string }
        >({
            query: (transactionData) => ({
                url: "/credit",
                method: "POST",
                body: transactionData,
            }),
        }),
        getAllCredits: builder.query<Credit[], string>({
            query: (id) => ({
                url: `/credits/${id}`,
                method: "GET",
            }),
        }),
        getAllCreditForAdmin: builder.query<Credit[], string>({
            query: (id) => ({
                url: `/credits/admin/${id}`,
                method: "GET",
            }),
        }),
        updateCredit: builder.mutation<void, { id: string, status: string }>({
            query: ({ id, status }) => ({
                url: `/credit/${id}`,
                method: "PATCH",
                body: { status },
            }),
        }),
    }),
})

export const {
    useCreateCreditMutation,
    useGetAllCreditsQuery,
    useGetAllCreditForAdminQuery,
    useUpdateCreditMutation,
    useLazyGetAllCreditForAdminQuery,
    useLazyGetAllCreditsQuery,
} = creditApi

export const {
    endpoints: { createCredit, getAllCredits, getAllCreditForAdmin, updateCredit },
} = creditApi
