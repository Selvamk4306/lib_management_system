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