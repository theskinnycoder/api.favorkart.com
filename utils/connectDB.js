import mongoose from 'mongoose'
import { MONGO_URI } from './constants.js'

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB connected: ${conn.connection.name}`)
  } catch (error) {
    console.log(error?.message)
    process.exit(1)
  }
}
