import postController from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middlewares.js";
import validId from "../middlewares/global.middlewares.js";
import { Router } from "express";

const postRouter = Router();

postRouter.get("/", postController.findAllPostsController);
postRouter.get("/top", postController.topPostController);
postRouter.get("/search", postController.searchPostController);

postRouter.use(authMiddleware);
postRouter.post("/create", postController.createPostController);

postRouter.use(validId);
postRouter.get("/byIdPost/:id", postController.findPostByIdController);
postRouter.get("/byUserId", postController.findPostsByUserIdController);
postRouter.patch("/update/:id", postController.updatePostController);
postRouter.delete("/delete/:id", postController.deletePostController);
postRouter.patch("/:id/like", postController.likePostController);
postRouter.patch("/:id/comment", postController.commentPostController);
postRouter.patch(
  "/:id/:idComment/comment",
  postController.commentDeletePostController
);

export default postRouter;