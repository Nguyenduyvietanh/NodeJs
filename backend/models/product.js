import mongoose, { isValidObjectId } from "mongoose";

const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            strim: true,
            maxLength: 32,
            required: true,
        },
        description: {
            type: String,
            required: true,
            maxLength: 2000,
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        // photo {
        //     data: Buffer,
        //     contentType: String
        // },
        price: {
            type: Number,
        },
        shipping: {
            required: true,
            type: Boolean,
        },
        sold: {
            type: Number,
            default: 0,
        },
    },
    { timeStamps: true }
);
module.exports = mongoose.model("Product", productSchema);