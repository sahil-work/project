import express from "express";
import { adapter } from "../internal/initialize";
import { getConversationReferenceFromEmail } from "../database/getConversationReferenceFromEmail";
import { buildNotificationCard } from "../utils/buildNotificationCard";

const router = express.Router();


/**
 * Build the notification card and send it to the user using conversationRerference
 */
router.post("/", async (req, res, next) => {
    const card = buildNotificationCard(req.body);
    const conversationReference = await getConversationReferenceFromEmail(req.body.email);
    const activity = {
        type: 'message',
        attachments: [card],
    };
    await adapter.continueConversationAsync(process.env.BOT_ID, conversationReference, async (context) => {
        await context.sendActivity(activity);
    });
    res.json({});
});

export default router;