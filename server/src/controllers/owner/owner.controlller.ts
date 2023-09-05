import { Request, Response } from "express";
import { Owner } from "../../models/owner";

export async function createOwner(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const owner = new Owner(req.body);
    await owner.save();
    return res.status(200).send(owner);
  } catch (error) {
    console.error("Error adding owner:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export const getOwner = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const ownerId = req.params.id;

    const owner = await Owner.findOne({ _id: ownerId }, { favorites: 1 });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    return res.json(owner);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export async function updateOwnerFavorites(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const ownerId = req.params.id;

    // Find the owner and get the old favorites
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).send("Owner not found");
    }

    const oldFavorites = owner.favorites;

    // Update the owner's favorites with the new values
    const { favorites } = req.body;
    console.log("updatedValues", favorites);
    owner.favorites = oldFavorites?.concat(favorites);

    // Save the updated owner
    const updatedOwner = await owner.save();

    return res.status(200).send(updatedOwner);
  } catch (error) {
    console.error("Error updating owner:", error);
    return res.status(500).send("Internal Server Error");
  }
}
