const express = require("express");
const router = express.Router();
const path = require("path");

const handleDefaultNavigation = (req, res) => {
	// Cache requests for 5 days
	// cache_age represents the number of seconds to cache the page
	let cache_age = 60 * 60 * 24 * 5;
	res.set('Cache-Control', `public, max-age=${cache_age}`); // 5 days

	res.render("index.html", req.og);
};

// Catch the index page before it is handled statically
// Otherwise server side rendering doesn't happen
router.get("/", handleDefaultNavigation);

router.use(express.static(path.resolve(__dirname, './../client/build')));

router.get("*", handleDefaultNavigation);

module.exports = router;
