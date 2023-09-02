import { Request, Response } from "express";
import { Contact } from "../../models/contact";

export async function getContacts(
  req: Request,
  res: Response
): Promise<Response> {
  const contacts = await Contact.find().lean();
  return res.json(contacts);
}

export async function createContact(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(200).send(contact);
  } catch (error) {
    console.error("Error adding contact:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function updateContact(
  req: Request,
  res: Response
): Promise<Response> {
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
    console.error("Error updating contact:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function deleteContact(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).send("Contact not found");
    }

    return res
      .status(202)
      .json({ message: "Contact deleted successfully", statusCode: 202 }); // Include a response body with a message
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).send("Internal Server Error");
  }
}
