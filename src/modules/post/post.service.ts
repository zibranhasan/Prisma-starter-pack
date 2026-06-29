import { prisma } from "../../app/lib/prisma";

const createPost = async (payload: any) => {
  return await prisma.post.create({
    data: payload,
  });
};

const getAllPosts = async ({
  page,
  limit,
  search,
  isFeatured,
  tags,
  sortBy,
  sortOrder,
}: {
  page: number;
  limit: number;
  search: string;
  isFeatured?: boolean;
  tags?: string[];
  sortBy: string;
  sortOrder: "asc" | "desc";
}) => {
  const where: any = {
    AND: [
      search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { title: { contains: search, mode: "insensitive" } },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags?.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };

  const skip = (page - 1) * limit;

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where: where,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.post.count({ where });

  return {
    data: result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSinglePost = async (id: number) => {
  const [_, post] = await prisma.$transaction([
    prisma.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    }),

    prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    }),
  ]);

  return post;
};

const updatePost = async (id: number, payload: any) => {
  return await prisma.post.update({
    where: { id },
    data: payload,
  });
};

const deletePost = async (id: number) => {
  return await prisma.post.delete({
    where: { id },
  });
};

const incrementViews = async (id: number) => {
  return await prisma.post.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });
};

const toggleFeatured = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  return await prisma.post.update({
    where: { id },
    data: {
      isFeatured: !post?.isFeatured,
    },
  });
};

const getBlogStats = async () => {
  const [totalUsers, totalPosts, featuredPosts, totalViews, latestPosts] =
    await Promise.all([
      prisma.user.count(),

      prisma.post.count(),

      prisma.post.count({
        where: {
          isFeatured: true,
        },
      }),

      prisma.post.aggregate({
        _sum: {
          views: true,
        },
      }),

      prisma.post.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
        },
      }),
    ]);

  return {
    totalUsers,
    totalPosts,
    featuredPosts,
    totalViews: totalViews._sum.views ?? 0,
    latestPosts,
  };
};

export const PostService = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  incrementViews,
  toggleFeatured,
  getBlogStats,
};
