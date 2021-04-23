const { Order, ProductCart } = require("../models/order")


exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "No order found in DB"
            })
        }
        req.order = order
        next()
    })
}

exports.createOrder = (req, res) => {
    req.body.user = req.profile
    const order = new Order(req.body)
    order.save((err, orderRes) => {
        console.log("ERROR", err)
        // if(err) {
        //     return res.status(400).json({
        //         error: "Failed to save your order in DB"
        //     })
        // }
        res.status(200).json(orderRes)
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "No orders found in DB"
            })
        }
        res.json(order)
    })
}


exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = (req, res) => {
    Order.updateOne(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err) {
                return res.status(400).json({
                    error: "Cannot update order status"
                })
            }
            res.json(order)
        }
    )
}