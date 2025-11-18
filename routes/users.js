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

    router.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            data: users
        })
    })

    router.get("/:id", (req, res) => {

        const { id } = req.params;
        const user = users.find((each) => each.id === id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })
    })

    /**
     * Route: /user
     * Method: POST
     * Description: Create / Register new user
     * Access: Public
     * Paramters: None
     */

    router.post("/", (req, res) => {

        const {id, name, email, subscriptionType, subscriptionStart, subscriptionEnd, hasIssuedBooks, pendingFine} = req.body
        if(!id || !name || !email || !subscriptionType || !subscriptionStart || !subscriptionEnd || !hasIssuedBooks || pendingFine === undefined){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = users.find((each) => each.id === id);
        if(user){
            return res.status(400).json({
                success: false,
                message: `User already exists with id ${id}`
            })
        }
        users.push({
            id,
            name,
            email,
            subscriptionType,
            subscriptionStart,
            subscriptionEnd,
            hasIssuedBooks,
            pendingFine}
        )

        res.status(201).json({
            success: true,
            data: "User created successfully "
        })
    })

    /**
     * Route: /user
     * Method: PUT
     * Description: Update the user by ID
     * Access: Public
     * Paramters: None
     */

    router.put("/:id", (req, res) => {
        const { id } = req.params;
        const {data} = req.body;
        
        const user = users.find((each) => each.id === id)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    // with spread operator
        const UpdateU = users.map((each) => {
            if(each.id === id){
                return{
                    ...each,
                    ...data
                }
            }
            return each 
        })

        res.status(200).json({
            success: true,
            data: UpdateU,
            message: "User updated successfully"
        })
    })

    /**
     * Route: /user
     * Method: DELETE
     * Description: Deleting a particular user
     * Access: Public
     * Paramters: None
     */

    router.delete("/:id", (req, res) => {
        const { id } = req.params

        const user = users.find((each) => each.id === id)
        if(!user){
            return res.status(404).json({
                success: false,
                message: `user not found with id ${id}`
            })
        }

        //if user exists, filter it out from the users array

        //const updateU = users.filter((each) => each.id !== id)

        // Second method

        const index = users.indexOf(user);
        users.splice(index, 1);

        const updateU = users;

        res.status(200).json({
            success: true,
            data: updateU,  
            message: "User deleted successfully"
        })
    })

module.exports = router;