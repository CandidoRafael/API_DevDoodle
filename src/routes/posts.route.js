import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { 
    create, 
    findAll, 
    topPost, 
    findById, 
    searchByTitle,
    byUser,
    update,
    deletePost,
    likePosts,
    addComment,
    deleteComment
} from '../controllers/posts.controller.js'

const router = Router()

router.post("/", authMiddleware, create)
router.get("/", findAll)
router.get("/top", topPost)
router.get("/search", searchByTitle)
router.get("/byUser", authMiddleware, byUser)
router.get("/:id", authMiddleware, findById)
router.patch("/:id", authMiddleware, update)
router.delete("/:id", authMiddleware, deletePost)
router.patch("/like/:id", authMiddleware, likePosts)
router.patch("/comment/:id", authMiddleware, addComment)
router.patch("/comment/:idPost/:idComment", authMiddleware, deleteComment)

export default router