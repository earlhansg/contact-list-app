import { Request, Response } from "express";
import { Contact } from "../../models/contact";

export async function getContacts(
  req: Request,
  res: Response
): Promise<Response> {
  const contacts = await Contact.find().lean();
  return res.json(contacts);
}


export async function createContact(req: Request, res: Response): Promise<Response> {
  console.log("enter");
  const contact = new Contact(req.body);
  await contact.save();

  return res.json({
      message: "Contact successfuly saved",
      contact
  })
};