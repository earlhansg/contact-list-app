import express, {Request, Response} from 'express'

const router = express.Router()

router.get('/api/contact', [], (req: Request, res: Response) => {
    return res.send('the contact');
})

export { router as contactRouter }