const router = require("express").Router();
const url = require("url");
const htmlEntities = require("./../tools/htmlEntities");

router.get("*", (req, res, next) => {
	req.og = {};
	req.og.site_name = "Quicker Picker Upper";
	req.og.title = "Error 404 - Page Not Found | Quicker Picker Upper";
	req.og.type = "website";
	req.og.image = url.resolve(process.env.PUBLIC_URL || "", "/logo512.png");
	req.og.description = "This page does not exist or has been moved";
	req.og.url = url.resolve(process.env.PUBLIC_URL || "", req.path);

	req.buildOG = () => {
		let og_str = "";

		for(let type in req.og)
			og_str += `<meta property="og:${type}" content="${htmlEntities(req.og[type])}"/>`;

		return og_str;
	};

	next();
});

router.get("/", (req, res, next) => {
	req.og.title = "Home | Quicker Picker Upper";
	req.og.description = "This is the home page...";
	next();
});

module.exports = router;
