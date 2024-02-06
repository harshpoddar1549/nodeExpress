import { Router } from "express";
import { createContact, deleteContact, getContact, getContacts, updateContact } from "../controllers/contactController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const contactRouter = Router();

contactRouter.use(validateToken)

// Get all contact
contactRouter.get('/', getContacts)

// create a new contact
contactRouter.post('/', createContact)

// update an existing contact
contactRouter.put('/:id', updateContact)

// delete a contact
contactRouter.delete('/:id', deleteContact)

// Get individual contact
contactRouter.get('/:id', getContact)

export default contactRouter