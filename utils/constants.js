import dotenv from 'dotenv-safe'

dotenv.config()

export const { PORT, NODE_ENV, MONGO_URI } = process.env
export const IS_DEV = NODE_ENV === 'development'
