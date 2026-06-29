import express from "express";

import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/", UserController.createUser);

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getSingleUser);

router.patch("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

// router.patch("/:id/status", UserController.updateStatus);

// router.patch("/:id/verify", UserController.verifyUser);

// router.patch("/:id/role", UserController.changeRole);

// router.get("/profile/:id", UserController.getUserProfile);

// router.get("/search", UserController.searchUsers);

// router.get("/me/profile", UserController.myProfile);

// router.patch("/me/profile", UserController.updateMyProfile);

export const UserRoutes = router;
