import Product from '../models/Product.model.js'
import User from '../models/User.model.js'
import connectDB from '../utils/connectDB.js'
import { products } from './data.js'

await connectDB()

async function importData() {
  try {
    await Product.deleteMany()

    const vendor1 = await User.findOne({
      uid: 'Z56cIVMz6LY9iwIgdq8CSlKig3I3',
    })

    const vendor2 = await User.findOne({
      uid: 'pyhayGHaEPg23xfzy1ek0dC7IUl1',
    })

    await Product.insertMany(
      products.map((product, idx) => ({
        ...product,
        vendor: idx % 2 === 0 ? vendor1._id : vendor2._id,
      })),
    )

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

async function destroyData() {
  try {
    await Product.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
