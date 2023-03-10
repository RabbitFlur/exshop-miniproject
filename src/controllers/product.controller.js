const db = require('../models')
const Product = db.product

exports.index = (req, res) =>{
    Product.findAll({
        where: {
            user_id: req.userId
        }
    })
    .then((result) => {
        res.status(200).json({
            data: result,
            message: "Show all product success"
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message,
        }) 
    })
}

exports.create = (req,res) =>{
    if(!req.body.title){
        res.status(400).json({
            message:'title must be required'
        })
        return
    }

    const product = {
        user_id: req.userId,
        ...req.body
    }

    Product.create(product)
    .then((result)=>{
        res.status(201).json({
            data: result,
            message: "Product created successfully"
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: err.message,
        }) 
    })
}

exports.show = (req, res) => {
    const id = req.params.id

    Product.findByPk(id)
    .then((result) => {
        if(result.user_id != req.userId){
            res.status(401).json({
                message: 'unathorized data product',
            })
            return
        }

        res.status(200).json({
            data: result,
            message: "Show product success"
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message,
        }) 
    })
}

exports.update = (req, res) => {
    const id = req.params.id

    Product.findByPk(id)
    .then((result) => {
        if(result.user_id != req.userId){
            res.status(401).json({
                message: 'unathorized data product',
            })
            return
        }
        
       Product.update(req.body, {
        where: {
            id: id
        }
       })
       .then((num) =>{
            if(num == 1){
                res.status(200).json({
                    message: 'product updated successfully',
                })
            }else{
                res.status(400).json({
                    message: `cannot update product with id ${id}`,
                })
            }
       })
       .catch((err) =>{
        res.status(500).json({
            message: err.message,
        }) 
       });
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message,
        }) 
    })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Product.findByPk(id)
    .then((result) => {
        if(result.user_id != req.userId){
            res.status(401).json({
                message: 'unathorized data product',
            })
            return
        }
        
       Product.destroy({
        where: {
            id: id
        }
       })
       .then((num) =>{
            if(num == 1){
                res.status(200).json({
                    message: 'product deleted successfully',
                })
            }else{
                res.status(400).json({
                    message: `cannot delete product with id ${id}`,
                })
            }
       })
       .catch((err) =>{
        res.status(500).json({
            message: err.message,
        }) 
       });
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message,
        }) 
    })
}