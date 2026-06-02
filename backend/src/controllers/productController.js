import Product from '../modules/products.js';

export function addProduct(req, res) {

    if(req.user == null){
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    if(req.user.role != 'admin'){
        res.status(403).json({message: 'Forbidden'});
        return;
    }
    const data = req.body;

    const newProduct = new Product(data);
    newProduct.save()
    .then(()=>{
         res.status(201).json({message: 'Product added successfully'});
    })
    .catch((error)=>{
        res.status(500).json({message: 'Error adding product'});
    })
}