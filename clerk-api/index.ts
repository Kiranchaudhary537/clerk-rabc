import dotenv from "dotenv";
import express, { Request, Response } from "express";
import {
  clerkMiddleware,
  getAuth,
  clerkClient,
  requireAuth,
} from "@clerk/express";
import cors from "cors";

const app = express();
const PORT = 3000;
dotenv.config();
app.use(cors());
app.use(clerkMiddleware());

const hasPermission = (req: Request, res: Response, next: any) => {
  const auth = getAuth(req);

  console.dir(auth, { depth: null });

  // Handle if the user is not authorized
  if (!auth.has({ permission: "org:admin:example" })) {
    return res.status(403).send("Forbidden");
  }

  return next();
};

app.get("/path", requireAuth(), hasPermission, (req: any, res: any) =>
  res.json(req.auth)
);

app.get("/protected", requireAuth(), async (req: any, res: any) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req);

  if (!userId) return null;
  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId);

  return res.json({ user });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
