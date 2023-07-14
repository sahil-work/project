import { getEmailToIdCollection } from "./getEmailToIdCollection";
import { getIdToConversationCollection } from "./getIdToConversationCollection";

/**
 * Retrieves the conversation reference associated with the given email.
 * @param email - The email for which to retrieve the conversation reference.
 * @returns A Promise resolving to the conversation reference object.
 */
export async function getConversationReferenceFromEmail(email : string) {
    const emailToId = getEmailToIdCollection();
    const idToConversation = getIdToConversationCollection();
    const emailIdDocument = await emailToId.findOne({ _id: email } as any);
    const idConversationReferenceDocument = await idToConversation.findOne({ _id: emailIdDocument.user_id } as any);
    return idConversationReferenceDocument.conversationReference;
} 