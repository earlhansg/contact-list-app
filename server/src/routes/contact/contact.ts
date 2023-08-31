import express from "express";
import { getContacts, createContact } from "../../controllers/contact/contact.controller";

const router = express.Router();

router.route("/contact")
.get(getContacts)
.post(createContact)

export { router as contactRouter };
