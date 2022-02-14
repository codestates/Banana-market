const router = require("express").Router();
const controller = require("./../controller");

router.get("/messages/:postid", controller.getMessage);
router.get("/", controller.getRoomList);
router.post("/join/:postid", controller.joinRoom);
router.get("/participant/:postid", controller.getParticipant);

module.exports = router;
