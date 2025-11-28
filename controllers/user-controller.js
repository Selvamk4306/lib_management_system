const {BookModel, UserModel} = require('../models');
const IssuedBook = require("../dto/book-dto");

exports.getAllusers = async(req, res) => {
    const users = await UserModel.find();
    if(users.length ===0){
        return res.status(400).json({
            success: false,
            message: "No Users in the system"
        })
    }
    
    res.status(200).json({
        success: true,
        data: users
    })
}

exports.getUserbyId = async(req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user
    })
}

exports.addNewUser = async(req, res) => {
    const {data} = req.body;
    const newUser = await UserModel.create(data);

    res.status(201).json({
        success: true,
        message: "User added successfully",
        data: newUser
    })
}

exports.updateUserById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    const user = await UserModel.findByIdAndUpdate(id, data, {new: true});
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
}

exports.deleteUserById = async(req, res) => {
    const {id} = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
}

exports.getSubscriptionDetailsById = async(req, res) => {
    const { id } = req.params;
    const user = UserModel.find((id).lean());
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const getDateinDays = (date = "") => {
            if(data){
                date = new Date(data);
            }else{
                date = new Date();
            }
            let days = Math.floor(date / (1000*60*60*24));
            return days;
        }

        const subscriptionType = (date) => {
            if(user.subscriptionType === "Basic"){
                date = date + 90; 
            }else if(user.subscriptionType === "Standard"){
                date = date + 180;
            }else if(user.subscriptionType === "Premium"){
                date = date + 365;
            }
            return date;
        }
        let returnDate = getDateinDays(user.returnDate); 
        let currentDate = getDateinDays();
        let subscriptionDate = getDateinDays(user.subscriptionDate);
        let subscriptionExpiration = subscriptionType(subscriptionDate);

        const data = {
            ...user,
            subscriptionExpired: subscriptionExpiration < currentDate,
            subscriptionDaysLeft: subscriptionExpiration - currentDate,
            daysLeftForExpiration: returnDate - currentDate,
            returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
            fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
        }

        res.status(200).json({
            success: true,
            data
        })
    }   