const router = require('express').Router();
const controller = require('./../controller');
// const uploadImage = require('../modules/multerUploadImg');
// const articleImage = uploadImage.single('image');

router.get('/lists', controller.postList);

router.post('/', controller.uploadPost);
router.get('/users/location', controller.getUserLocation);
router.get('/:articleid', controller.getPostDetail);
router.patch('/:articleid', controller.updatePost);
router.delete('/image', controller.deletePostImg);
router.delete('/:articleid', controller.deletePost);
router.patch('/close/:articleid', controller.postStatus);
// router.get("/lists/?category&search&page", controller.postList);

module.exports = router;
