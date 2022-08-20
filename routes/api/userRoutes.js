const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend

} = require('../../controllers/userController.js')

router.route('/').get(getUser).post(createUser);

router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;    