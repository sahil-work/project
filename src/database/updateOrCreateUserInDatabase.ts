import { TurnContext, TeamsInfo } from "botbuilder";
import { getIdToConversationCollection } from './getIdToConversationCollection';
import { getEmailToIdCollection } from './getEmailToIdCollection';
import { upsertDocument } from "./upsertDocument";

/**
 * Updates or creates the user in the database(creates entry in id-email, convo-ref collections) based on the conversation reference.
 *
 * @param {TurnContext} context - The bot turn context.
 * @returns {Promise<void>} A Promise that resolves once the TeamsInfo.getMember operation is complete.
 */
export async function updateOrCreateUserInDatabase(context: TurnContext): Promise<void> {
    const emailToId = getEmailToIdCollection();
    const idToConversation = getIdToConversationCollection();

    const reference = TurnContext.getConversationReference(context.activity);
    const idConversationReferenceDocument = { _id: reference.user.id, "conversationReference": reference } as any;
    upsertDocument(idToConversation, idConversationReferenceDocument, "conversationReference");

    const member = await TeamsInfo.getMember(context, context.activity.from.id);
    const idEmailDocumet = { _id: member.email, "user_id": reference.user.id } as any;
    upsertDocument(emailToId, idEmailDocumet, "user_id");
}

