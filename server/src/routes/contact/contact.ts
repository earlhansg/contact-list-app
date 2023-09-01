import express from "express";
import { getContacts, createContact, updateContact, deleteContact } from "../../controllers/contact/contact.controller";

const router = express.Router();

// Define routes with meaningful names
router.get('/contacts', getContacts);
router.post('/contact', createContact);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);

export { router as contactRouter };
