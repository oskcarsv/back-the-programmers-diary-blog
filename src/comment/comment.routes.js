import { Router } from "express";
import { check } from "express-validator";
import { 
    getComment, 
    createPost, 
    updateComment, 
    deleteComment, 
    getCommentById 
} from './comment.controller.js';
import { validateFields } from "../middlewares/validate-fields.js";
import { existsCommentById } from "../helpers/db-validator.js";

const router = Router();

router.get("/", getComment);

router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ],
    getCommentById
);

router.post(
    "/createComment",
    [
        check("postId", "this comment is required").not().isEmpty(),
        check("comment", "this id is required").not().isEmpty(),
        check("author", "this id is required").not().isEmpty(),
        validateFields,
    ],
    createPost
);

router.put(
    "/updateComment",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ], updateComment
);

router.delete(
    "/deleteComment",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ], deleteComment
);

export default router;
