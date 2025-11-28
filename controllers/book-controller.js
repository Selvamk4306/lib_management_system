const {BookModel, UserModel} = require("../models")
const IssuedBook = require("../dto/book-dto");


// const getAllBooks = () => {

// }


// const getSingleBookById = () => {

// }

// module.exports = {
//     getAllBooks,   getSingleBookById
// }

// to get all books
exports.getAllBooks = async(req, res) => {
    const books = await BookModel.find()

    if(books.length ===0){
        return res.status(400).json({
            success: false,
            message: "No Books in the system"
        })
    }

    res.status(200).json({
        success: true,
        data: books
    })
}

// to get single book by id
exports.getSingleBookById = async(req, res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id)  

    if(!book){
      return  res.status(404).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })
}

// to get all issued books 
exports.getAllIssuedBooks = async(req, res) => {
    const users = await UserModel.find({
        issuedBook: {$exists: true},
    }).populate("issuedBook")

    const issuedBooks = users.map((each) => {
        return new IssuedBook(each);
    });

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Books issued yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
};

// to add a new book
exports.addNewBook = async(req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new book"
        })
    }

    await BookModel.create(data);
    // res.status(201).json({
    //     success: true,
    //     message: "Book added successfully",
    //     data: data
    // })

    const allBooks = await BookModel.find();
    res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: allBooks
    }); 
}

// to update a book by id
exports.updateBookById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update"
        })
    }

const updatedBook = await BookModel.findOneAndUpdate(
        {_id: id},
       data,
       {new: true}
    );

    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        message: "Book Updated Successfully",
        data: updatedBook
    })
}

// to delete a book by id
exports.deleteBookById = async(req, res) => {
    const {id} = req.params;

    // Check if the book exists
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        })
    }

    await BookModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Book Deleted Successfully"
    })
}