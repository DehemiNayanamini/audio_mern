import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    }, 
    phone : {
        type: String,
        required: false,
        default: ''
    },
    date : {
        type: Date,
        required: true,
        default: Date.now
    },
    response : {
        type: String,
        required: false,
        default: ''
    },
    isResponded : {
        type: Boolean,
        required: true,
        default: false
    }
})
const Inquiry = mongoose.model('Inquiry',inquirySchema);
export default Inquiry;