import { Router } from 'express'
import { create, findAll, topPost, findById } from '../controllers/posts.controller.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js'

const router = Router()

router.post("/", authMiddleware,create)
router.get("/", findAll)
router.get("/top", topPost)
router.get("/:id", findById)

export default router