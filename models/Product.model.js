import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'please provide a name for your product'],
    },
    description: {
      type: String,
      required: [true, 'please provide some description for your product'],
      minlength: [
        20,
        'description too short. Make it atleast 20 characters long',
      ],
    },
    primaryImage: {
      type: String,
      required: [true, 'please provide an image for your product'],
    },
    images: {
      type: [String],
    },
    price: {
      type: Number,
      required: [true, 'please provide the price of your product'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Product', productSchema)
