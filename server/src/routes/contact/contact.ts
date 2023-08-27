import express from "express";
import { getContacts } from "../../controllers/contact/contact.controller";

const router = express.Router();

router.route("/contact").get(getContacts);

export { router as contactRouter };
