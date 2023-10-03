import { Router } from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";
import postsRouter from "./posts.route.js";
import swaggerRouter from "./swagger.route.cjs";

const router = Router()

router.use('/user', userRouter)
router.use("/posts", postsRouter)
router.use('/auth', authRouter)
router.use("/doc", swaggerRouter)

export default router