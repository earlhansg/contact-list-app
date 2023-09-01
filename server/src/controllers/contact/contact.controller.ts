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


export async function updateContact(req: Request, res: Response): Promise<Response> {
  try {
    const contactId = req.params.id;
    const { ...updatedValues } = req.body;

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId },
      { $set: updatedValues },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).send("Contact not found");
    }

    return res.status(200).send(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).send('Internal Server Error');
  }
}

