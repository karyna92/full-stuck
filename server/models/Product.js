const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
         type: String, required: true 
        },
    price: { 
        type: Number, required: true
     },
    description: { 
        type: String, required: true 
    },
    image: { 
        type: String
     },
    category: { 
        type: String, required: true 
    },
    stock: { 
        type: Number, required: true 
    },
    discount : {
         type: Number
         },
    reviews : [{ 
        type: Schema.Types.ObjectId, ref: 'Review' 
    }]


})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;