import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  const result = await PostService.createPost(req.body);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: result,
  });
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

    const result = await PostService.getAllPosts({
      page,
      limit,
      search,
      isFeatured,
      tags,
      sortBy,
      sortOrder,
    });
    res.json(result);
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
    });
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  const result = await PostService.getSinglePost(Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "Post retrieved successfully",
    data: result,
  });
};

const updatePost = async (req: Request, res: Response) => {
  const result = await PostService.updatePost(Number(req.params.id), req.body);

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: result,
  });
};

const deletePost = async (req: Request, res: Response) => {
  const result = await PostService.deletePost(Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
    data: result,
  });
};

const getBlogStats = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getBlogStats();

    res.status(200).json({
      success: true,
      message: "Blog statistics retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// const incrementViews = async (req: Request, res: Response) => {
//   const result = await PostService.incrementViews(Number(req.params.id));

//   res.status(200).json({
//     success: true,
//     message: "View increased",
//     data: result,
//   });
// };

// const toggleFeatured = async (req: Request, res: Response) => {
//   const result = await PostService.toggleFeatured(Number(req.params.id));

//   res.status(200).json({
//     success: true,
//     message: "Featured status updated",
//     data: result,
//   });
// };

export const PostController = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getBlogStats,
  //   incrementViews,
  //   toggleFeatured,
};
