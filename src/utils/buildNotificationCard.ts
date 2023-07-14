import { commentButton, editButton, openticketButton } from "../adaptiveCards/buttons"
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { notificationTemplate } from "../adaptiveCards/mainCard";
import { CardFactory } from "botbuilder";
import { changeContainer, middleContainer, extraContentAddedContainer } from "../adaptiveCards/containers";
import { CardData } from "./notificationCardModel";

/**
 * Builds a notification card based on the provided data.
 * @param data - The data used to populate the notification card.
 * @returns A CardFactory object representing the adaptive card.
 */
export function buildNotificationCard(data: CardData): any {
	// Create a temporary copy of the notificationTemplate using deep cloning
	const tempCard = JSON.parse(JSON.stringify(notificationTemplate));

	// Add the necessary containers to the body of the card
	tempCard.body.push(middleContainer as any);
	tempCard.body.push(changeContainer as any);
	tempCard.body.push(extraContentAddedContainer as any);

	// Add action buttons to the card
	tempCard.actions.push(openticketButton);
	tempCard.actions.push(commentButton);
	tempCard.actions.push(editButton);

	// Render the adaptive card template using the provided data
	let template = AdaptiveCards.declare<CardData>(tempCard).render(data);

	// Return the adaptive card template wrapped in a CardFactory object
	return CardFactory.adaptiveCard(template);
}
