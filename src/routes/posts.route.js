import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { 
    create, 
    findAll, 
    topPost, 
    findById, 
    searchByTitle,
    byUser 
} from '../controllers/posts.controller.js'

const router = Router()

router.post("/", authMiddleware, create)
router.get("/", findAll)
router.get("/top", topPost)
router.get("/search", searchByTitle)
router.get("/byUser", authMiddleware, byUser)

router.get("/:id", authMiddleware, findById)

export default router