import { Router } from "express";
import { getUser } from "@/controllers/getUser";
import { requireUserMiddlware } from "@/middlewares/require-user";

export const usersRoutes = () => {
  const userRoutes = Router();

  userRoutes.get("/me", requireUserMiddlware, getUser);

  return userRoutes;
};
