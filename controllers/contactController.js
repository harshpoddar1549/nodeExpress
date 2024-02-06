//import expressAsyncHandler from "express-async-handler"
import asyncHandler from "express-async-handler"
import Contact from '../models/contactModel.js'

// What is express-async-handler
/* 
    It's a simple middleware for handling error in asyn routes. 
    It passes it to our error handler

    With express-async-handler

    express.get('/', asyncHandler(async (req, res, next)=>{
        const bar = await foo.findAll(); //here, in case if the error happens. It will be sent to our error handler
        res.send(bar)
    }))

    Withour express-async-handler

    express.get('/', (req, res, next) => {
        foo.findAll()
            .then(bar => res.send(bar))
            .catch(err => throw new Error(err)) //now the error is passed to our handler
    })
*/



/* 
    Whenever we create an api we put lables to the methods here.
    There labels contain infomation related to desciption of the api,
    route that will call the method and the access level for that particular controller
*/

//@desc Get all contacts
//@route GET /api/contacts
//@access pvt { for the time being }

export const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access pvt { for the time being }

export const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@desc Create new contact
//@route POST /api/contacts
//@access pvt { for the time being }

export const createContact = asyncHandler(async (req, res) => {
    console.log(req.body)
    // destructuring the req.body
    const { name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400);
        // using Error from express for error handling
        throw new Error("All fields are mandatory")
    }else{
        const contact = await Contact.create({
            name: name,
            email: email,
            phone: phone,
            user_id: req.user.id
        })
        res.status(201).json(contact)
    }
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access pvt { for the time being }

export const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedContact)
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access pvt { for the time being }

export const deleteContact = asyncHandler(async (req, res) => {
    /* const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    } */

    const deletedContact = await Contact.findByIdAndDelete(req.params.id)
    if(!deletedContact){
        res.status(404)
        throw new Error("Contact not found")
    }else{
        res.status(200).json(deletedContact)
    }
})


