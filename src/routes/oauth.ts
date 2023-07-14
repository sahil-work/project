import express from "express"
const router = express.Router();
import { loginUrl } from "../authentication/loginUrl";
import { handleRedirectedCode } from "../authentication/handleRedirectedCode";

/**
 * Redirects the user to the login URL.
 */
router.get("/login", async (req, res) => {
	res.redirect(301, loginUrl);
});

/**
 * Handles the redirected authorization code and processes it.
 */
router.get("/redirect", async (req, res) => {
	const code = req.query.code;
	try {
		await handleRedirectedCode(code as string);
		res.send("Process completed, you may close this window now");
	} catch (error) {
		console.error('Error exchanging token:', JSON.stringify(error.response.data));
		res.send("some server side error occured, please try again later");
	}
});

export default router;