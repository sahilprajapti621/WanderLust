const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner , validateListing } = require("../middelware.js");

const listingController = require("../controller/listing.js")
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({storage});


//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));

//Create Route

router.post("/",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);


//Show Route
router.get("/:id",
    wrapAsync(listingController.showListing));

//Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

//Update Route
router.put("/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing));

module.exports = router;