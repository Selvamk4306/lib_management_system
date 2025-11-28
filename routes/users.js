const express = require("express");
const users = require("../data/users.json")

const router = express.Router()
    /**
     * Route: /user
     * Method: GET
     * Description: Getall the list of users in the public
     * Access: Public
     * Paramters: None
     */

    const { UserModel, BookModel } = require("../models");
    const { getAllusers, getUserbyId, addNewUser, updateUserById, deleteUserById, getSubscriptionDetailsById} = require("../controllers/user-controller");

    router.get("/", getAllusers);  // Get all users controller method
    // router.get("/", (req, res) => {
    //     res.status(200).json({
    //         success: true,
    //         data: users
    //     })
    // })

    
    router.get("/:id", getUserbyId);  // Get user by ID controller method
    // router.get("/:id", (req, res) => {

    //     const { id } = req.params;
    //     const user = users.find((each) => each.id === id);

    //     if(!user){
    //         return res.status(404).json({
    //             success: false,
    //             message: "User not found"
    //         })
    //     }

    //     res.status(200).json({
    //         success: true,
    //         data: user
    //     })
    // })

    /**
     * Route: /user
     * Method: POST
     * Description: Create / Register new user
     * Access: Public
     * Paramters: None
     */

    router.post("/", addNewUser);  // New user controller method
    // router.post("/", (req, res) => {

    //     const {id, name, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate} = req.body
    //     if(!id || !name || !email || !issuedBook || !issuedDate || !returnDate || !subscriptionType || !subscriptionDate === undefined){
    //         return res.status(400).json({
    //             success: false,
    //             message: "All fields are required"
    //         })
    //     }
    //     const user = users.find((each) => each.id === id);
    //     if(user){
    //         return res.status(400).json({
    //             success: false,
    //             message: `User already exists with id ${id}`
    //         })
    //     }
    //     users.push({
    //         id,
    //         name,
    //         email,
    //         issuedBook,
    //         issuedDate,
    //         returnDate,
    //         subscriptionType,
    //         subscriptionDate}
    //     )

    //     res.status(201).json({
    //         success: true,
    //         data: "User created successfully "
    //     })
    // })

    /**
     * Route: /user
     * Method: PUT
     * Description: Update the user by ID
     * Access: Public
     * Paramters: None
     */

    router.put("/:id", updateUserById); // Updating user controller method
    // router.put("/:id", (req, res) => {
    //     const { id } = req.params;
    //     const {data} = req.body;
        
    //     const user = users.find((each) => each.id === id)
    //     if(!user){
    //         return res.status(404).json({
    //             success: false,
    //             message: "User not found"
    //         })
    //     }
    // // with spread operator
    //     const UpdateU = users.map((each) => {
    //         if(each.id === id){
    //             return{
    //                 ...each,
    //                 ...data
    //             }
    //         }
    //         return each 
    //     })

    //     res.status(200).json({
    //         success: true,
    //         data: UpdateU,
    //         message: "User updated successfully"
    //     })
    // })

    /**
     * Route: /user
     * Method: DELETE
     * Description: Deleting a particular user
     * Access: Public
     * Paramters: None
     */


    router.delete("/:id", deleteUserById); // Deleting user controller method
    // router.delete("/:id", (req, res) => {
    //     const { id } = req.params

    //     const user = users.find((each) => each.id === id)
    //     if(!user){
    //         return res.status(404).json({
    //             success: false,
    //             message: `user not found with id ${id}`
    //         })
    //     }

    //     //if user exists, filter it out from the users array

    //     //const updateU = users.filter((each) => each.id !== id)

    //     // Second method

    //     const index = users.indexOf(user);
    //     users.splice(index, 1);

    //     const updateU = users;

    //     res.status(200).json({
    //         success: true,
    //         data: updateU,  
    //         message: "User deleted successfully"
    //     })
    // })

    router.get('/subscription-details/:id', getSubscriptionDetailsById);

    // router.get("/subscription-type/:id", (req, res) => {
    //     const { id } = req.params;
    //     const user = users.find((each) => each.id === id);
    //     if(!user){
    //         return res.status(404).json({
    //             success: false,
    //             message: "User not found"
    //         })
    //     }
    //     const getDateinDays = (date = "") => {
    //         let date;
    //         if(data){
    //             date = new Date(data);
    //         }else{
    //             date = new Date();
    //         }
    //         let days = Math.floor(date / (1000*60*60*24));
    //         return days;
    //     }

    //     const subscriptionType = (date) => {
    //         if(user.subscriptionType === "Basic"){
    //             date = date + 90; 
    //         }else if(user.subscriptionType === "Standard"){
    //             date = date + 180;
    //         }else if(user.subscriptionType === "Premium"){
    //             date = date + 365;
    //         }
    //         return date;
    //     }
    //     let returnDate = getDateinDays(user.returnDate); 
    //     let currentDate = getDateinDays();
    //     let subscriptionDate = getDateinDays(user.subscriptionDate);
    //     let subscriptionExpiration = subscriptionType(subscriptionDate);

    //     const data = {
    //         ...user,
    //         subscriptionExpired: subscriptionExpiration < currentDate,
    //         subscriptionDaysLeft: subscriptionExpiration - currentDate,
    //         daysLeftForExpiration: returnDate - currentDate,
    //         returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
    //         fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    //     }

    //     res.status(200).json({
    //         success: true,
    //         data
    //     })
    // })
module.exports = router;