const router = require('express').Router();
const controller = require('./../controller');
// const profileImageUpload = require("../modules/multerUploadPfp");

router.get('/info', controller.getUserInfo);
router.patch('/info', controller.updateInfo);
router.delete('/info', controller.deleteInfo);
router.post('/report', controller.userReport);

router.put('/profile-image', controller.updatePfp);
router.delete('/profile-image', controller.deletePfp);

module.exports = router;
