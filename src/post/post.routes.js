import { Router } from "express";
import { check } from "express-validator";
import {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost
} from "./post.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { existsPostById } from "../helpers/db-validator.js";

const router = Router();

router.get("/", getPost);

router.get(
    "/getById/",
    [
        check("id", "ID is required").not().isEmpty(),
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPostById),
        validateFields,
    ],
    getPostById
);

router.post(
    "/createPost",
    [
        check("author", "Author is required").not().isEmpty(),
        check("title", "Tittle is required").not().isEmpty(),
        check("content", "Description is required").not().isEmpty(),
        validateFields,
    ],
    createPost
);

router.put(
    "/updatePost",
    [
        check("id", "ID is required").not().isEmpty(),
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPostById),
        validateFields,
    ],
    updatePost
);

router.delete(
    "/deletePost",
    [
        check("id", "ID is required").not().isEmpty(),
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPostById),
        validateFields,
    ],
    deletePost
);

export default router;

