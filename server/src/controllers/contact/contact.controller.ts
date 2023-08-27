import { Request, Response } from "express";
import { Contact } from "../../models/contact";

export async function getContacts(
  req: Request,
  res: Response
): Promise<Response> {
  const contact = new Contact({
    name: "Kristy mae",
    email: "earlhansg@gmail.com",
    telephoneNumber: 9887221,
    favoriteFlag: "PH",
  });

  await contact.save();

  return res.send("the contact");
}
