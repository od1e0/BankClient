import type { Transaction } from "../types"
import { api } from "./api"

export const transactionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendTransaction: builder.mutation<
            Transaction,
            { amount: number; fromCard: string; toCard: string }
        >({
            query: (transactionData) => ({
                url: "/transactions/send",
                method: "POST",
                body: transactionData,
            }),
        }),
        getAllTransactions: builder.query<Transaction[], string>({
            query: (id) => ({
                url: `/transactions/all/${id}`,
                method: "GET",
            }),
        }),
        getRecentTransactions: builder.query<Transaction[], string>({
            query: (id) => ({
                url: `/transactions/recent/${id}`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useSendTransactionMutation,
    useGetAllTransactionsQuery,
    useGetRecentTransactionsQuery,
    useLazyGetAllTransactionsQuery,
    useLazyGetRecentTransactionsQuery,
} = transactionsApi

export const {
    endpoints: { sendTransaction, getAllTransactions, getRecentTransactions },
} = transactionsApi
