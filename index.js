const express = require("express");
    const users= require("./data/users.json")

    const app = express();
    const port = 3000

    app.use(express.json())

    app.get("/", (req, res) => {
        res.status(200).json({
            message: "Home Page"
        })
    })

    /**
     * Route: /user
     * Method: GET
     * Description: Getall the list of users in the public
     * Access: Public
     * Paramters: None
     */

    app.get("/users", (req, res) => {
        res.status(200).json({
            success: true,
            data: users
        })
    })

    app.get("/users/:id", (req, res) => {

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

    app.post("/users", (req, res) => {

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
        users.push(
            id,
            name,
            email,
            subscriptionType,
            subscriptionStart,
            subscriptionEnd,
            hasIssuedBooks,
            pendingFine
        )
        res.status(201).json({
            success: true,
            data: "User created successfully "
        })
    })
    // app.all("*", (req, res) => {
    //     res.status(500).json({
    //         message: "Not build yet"
    //     })
    // })

    app.listen(port, () => 
        console.log(`Server is listeneing on port http://localhost:${port}`)
    )