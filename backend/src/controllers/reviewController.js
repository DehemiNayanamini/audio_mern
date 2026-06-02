import Review from "../modules/review.js";

export function addReview(req, res) {
    if(req.user == null){
        res.status(401).json({
            message: 'Please login and try again'
        });
        return;
    }
    const data = req.body;
    
    // Set user info BEFORE creating the Review object
    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data);

    newReview.save()
    .then(()=>{
        res.status(201).json({ 
            message: 'Review added successfully' 
        });
    })
    .catch((error) => {
        res.status(500).json({ 
            message: 'Error adding review',
            error: error.message
        });
    })

    //email": "sarah@gmail.com",
  //"password": "Sarah@123",


// "email": "admsarah@gmail.com",
//   "password": "Sarah@123",

}

export async function getReviews(req, res) {
    const user = req.user;
    // const reviews = await Review.find();
     
    //     // Review.find().then((reviews)=>{
    //     //         res.json(reviews);
    //     // });
    // res.json(reviews);
    try{
        if(user.Role == 'admin'){
        const reviews = await Review.find();
        res.json(reviews);
        }else{
            const reviews = await Review.find({isApproved: true});
            res.json(reviews);
        }
    }catch(e){
        res.status(500).json({message: 'Error fetching reviews'});
    }
}

export function deleteReview(req, res){
    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({message: 'Please login and try again'});
        return;
    }
    if(req.user.role == 'admin'){
        Review.deleteOne({email: email}).then(()=>{
            res.json({message: 'Review deleted successfully'});
        }).catch((error) => {
            res.status(500).json({message: 'Review deletion failed'});
        });
        return;
    }
    if(req.user.role == 'customer'){
        if(req.user.email == email){
            Review.deleteOne({email: email}).then(()=>{
                res.json({message: 'Review deleted successfully'});
            }).catch((error) => {
                res.status(500).json({message: 'Review deletion failed'});
            });
        } else {
            res.status(403).json({message: 'You are not the owner of this review'});
        }
    }

    
}
export function approveReview(req, res){
    const email = req.params.email;

    if(req.user == null ){
        res.status(401).json({message: 'Please login and try again'});
        return;
    }
    if(req.user.role == 'admin'){
        Review.updateOne({
            email: email
        },
        {
            isApproved: true
        }).then(()=>{
            res.json({message: 'Review approved successfully'});
        }).catch((error) => {
            res.status(500).json({message: 'Review approval failed'});
        });
    }else{
        res.status(403).json({message: 'Only admins can approve reviews'});
    }
}

