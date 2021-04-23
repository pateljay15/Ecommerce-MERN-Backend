const express = require('express')
const router = express()


const { getUserById, getUser, userUpdate, userPurchaseList } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")


router.param("userId", getUserById)


router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

router.put("/user/:userId", isSignedIn, isAuthenticated, userUpdate)

router.put("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)
// router.get("/users",  getUsers)
module.exports = router