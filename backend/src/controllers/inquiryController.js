import Inquiry from '../modules/inquiry.js';
import { isITCustomer,isITAdmin } from './userController.js';

export async function submitInquiry(req, res) {
    try{
        if(isITCustomer(req)){
            const data = req.body;
            data.email = req.user.email; // Set the email from the authenticated user
            data.phone = data.phone || ''; // Ensure phone is set, even if not provided

            let id = 0;

            const inquiries = await Inquiry.find().sort({ id: -1 }).limit(1);

            if(inquiries.length == 0){
                id = 1;
            }else{
                id = parseInt(inquiries[0].id) + 1;
            }
            data.id = id;

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();
            res.status(201).json({message: 'Inquiry submitted successfully', id : response.id});
        }

    }
    catch(e){
        console.error(e);
        res.status(500).json({message: 'Failed to submit inquiry'});
    }
}

export async function getInquiries(req, res) {
    try{
        if(isITCustomer(req)){
            const inquiries = await Inquiry.find({email: req.user.email});
            res.json(inquiries);
            return;
        }else if(isITAdmin(req)){
            const inquiries = await Inquiry.find();
            res.json(inquiries);
            return;
        }else{
            res.status(403).json({message: 'You are not authorized to perform this action'});
            return;
        }
    }catch(e){
        console.error(e);
        res.status(500).json({message: 'Failed to get inquiries'});
    }
}
export async function deleteInquiry(req, res) {
    try{
        if(isITAdmin(req)){
            const id = req.params.id;
            await Inquiry.deleteOne({id: id});
            res.json({message: 'Inquiry deleted successfully'});
            return;
        }
        else if(isITCustomer(req)){
            const id = req.params.id;
            const inquiry = await Inquiry.findOne({id: id});
            if(inquiry == null){
                res.status(404).json({message: 'Inquiry not found'});
                return;
            }else{
                if(inquiry.email == req.user.email){
                    await Inquiry.deleteOne({id: id});
                    res.json({message: 'Inquiry deleted successfully'});
                    return;
                }else{
                    res.status(403).json({message: 'You are not the owner of this inquiry'});
                    return;
                }
            }
        }

        else{
            res.status(403).json({message: 'You are not authorized to perform this action'});
        }
    }catch(e){
        console.error(e);
        res.status(500).json({message: 'Failed to delete inquiry'});
    }
}

export async function updateInquiry(req, res) {
    try{
        if(isITAdmin(req)){
            const id = req.params.id;
            const data = req.body;
            await Inquiry.updateOne({id: id}, data);
            res.json({message: 'Inquiry updated successfully'});
            return;
        }
        else if(isITCustomer(req)){
            const id = req.params.id;
            const data = req.body;
            const inquiry = await Inquiry.findOne({id: id});
            if(inquiry == null){
                res.status(404).json({message: 'Inquiry not found'});   
                return;
            }   else{
                if(inquiry.email == req.user.email){
                    await Inquiry.updateOne({id: id}, {message: data.message});
                    res.json({message: 'Inquiry updated successfully'});
                    return;
                }else{
                    res.status(403).json({message: 'You are not the owner of this inquiry'});
                    return;
                }       
            }
        }else{
            res.status(403).json({message: 'You are not authorized to perform this action'});
            return;
        }

    }catch(e){
        console.error(e);
        res.status(500).json({message: 'Failed to update inquiry'});
    }
}