import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();

router.post("/", PostController.createPost);

router.get("/", PostController.getAllPosts);

router.get("/:id", PostController.getSinglePost);

router.patch("/:id", PostController.updatePost);

router.delete("/:id", PostController.deletePost);

router.get("/stats", PostController.getBlogStats);

// router.patch("/:id/views", PostController.incrementViews);

// router.patch("/:id/featured", PostController.toggleFeatured);

export const PostRoutes = router;
