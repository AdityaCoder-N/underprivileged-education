import mongoose, { Schema } from "mongoose";

const DonationSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    itemQuantity: {
        type: String,
        required: true,
    },
    itemCondition: {
        type: String,
        required: true,
        enum: ['Good Condition', 'Usable Condition', 'Not Great'],
    },
    itemImage: {
        type: String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    }
}, { timestamps: true });

const Donation = mongoose.models.Donation || mongoose.model('Donation', DonationSchema);

export default Donation;
