import express from 'express';
import { submitInquiry, getInquiries, deleteInquiry, updateInquiry } from '../controllers/inquiryController.js';
const inquiryRouter = express.Router();

inquiryRouter.post('/', submitInquiry);
inquiryRouter.get('/', getInquiries);
inquiryRouter.delete('/:id', deleteInquiry);
inquiryRouter.put('/:id', updateInquiry); //delete and update are the same because we only have a delete button in the frontend, we can change this later if we want to add an update button in the frontend

export default inquiryRouter;