import express from "express";
import { createOwner, getOwner, updateOwnerFavorites } from "../../controllers/owner/owner.controlller";

const router = express.Router();

router.post('/owner', createOwner);
router.get('/owner/:id', getOwner);
router.put('/owner/:id', updateOwnerFavorites);

export { router as ownerRouter };
