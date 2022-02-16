const router = require("express").Router();
const controller = require("./../controller");

router.post("/", controller.uploadPost);
router.get("/users/location", controller.getUserLocation);
router.get("/:postid", controller.getPostDetail);
router.patch("/:postid", controller.updatePost);
router.delete("/:postid", controller.deletePost);

router.patch("/close/:postid", controller.postStatus);
router.get("/lists/?category&search&page", controller.postList);

module.exports = router;
