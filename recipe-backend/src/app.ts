import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { resolvers } from "./graphql/index";
import { typeDefs } from "./graphql/index";
import { getUserFromReq } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorHandler";
import aiRouter from "./routes/aiRouter";
import authRouter from "./routes/authRouter";
import categoryRouter from "./routes/categoryRouter";
import groupRouter from "./routes/groupRouter";
import postRouter from "./routes/postRoutet";
import recipeRouter from "./routes/recipesRouter";
import userRouter from "./routes/userRouter";

const environment = process.env.NODE_ENV || "development";
if (environment === "production") {
  dotenv.config({ path: ".env.production" });
} else if (environment === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config({ path: ".env" });
}

const app = express();
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/recipes", recipeRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/ai-recipes", aiRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/groups", groupRouter);
app.use("/api/posts", postRouter);

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const publicUserId = getUserFromReq(req);
        return { publicId: publicUserId || null };
      },
    })
  );

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
}

startServer();
