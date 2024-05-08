export type User = {
    id: string
    email: string
    password: string
    name?: string
    avatarUrl?: string
    createdAt: Date
    updatedAt: Date
    location?: string
    cards: Card[]
    transactions: Transaction[]
}

export type Transaction= {
    id: string
    user: User
    userId: string
    fromCard: string
    toCard: string
    createdAt: Date
    amount: number
}

export type Card={
    id: string
    user: User
    userId: string
    cardHolder: string
    cardNumber: string
    validity: string
    balance: number
    createdAt: Date
    updatedAt: Date
}

export type Credit={
    id: string
    user: User
    userId: string
    fullName: string
    passportId: string
    number: string
    amount: number
    status: string
    createdAt: Date
}