import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const DB_NAME = process.env.DB_NAME || 'morrow-cafe'

const connectDB = async () => {
  try {
    const baseUri =
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'

    const connectionInstance = await mongoose.connect(baseUri, {
      dbName: DB_NAME,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
    })
    console.log(
      `\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}, DB: ${connectionInstance.connection.name}`
    )
    return connectionInstance
  } catch (error) {
    console.error('MONGODB connection FAILED: ', error)
    process.exit(1)
  }
}

export default connectDB
