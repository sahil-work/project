import { TeamsActivityHandler, TurnContext, CardFactory, TaskModuleResponse, TaskModuleRequest, TeamsInfo } from "botbuilder";
import { OAuthCard } from "../adaptiveCards/oauthCard"
import { welcomeCard } from "../adaptiveCards/welcomeCard";
import { commentCard } from "../adaptiveCards/commentCard";
import { editCard } from "../adaptiveCards/editCard";
import { updateOrCreateUserInDatabase } from "../database/updateOrCreateUserInDatabase";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { deleteUserToken } from "../database/deleteUserToken";
import { saveResponse } from "../database/saveResponse";
import { handleErrors } from "../utils/handleErrors";
import { checkUserSignIn } from "../authentication/checkUserSignIn";

export class TeamsBot extends TeamsActivityHandler {
	constructor() {
		super();
		this.onMembersAdded(handleErrors(async (context: TurnContext, next: () => any) => {
			await updateOrCreateUserInDatabase(context);
			await context.sendActivities([
				{ attachments: [CardFactory.adaptiveCard(welcomeCard)] },
				{ attachments: [CardFactory.adaptiveCard(OAuthCard)] }
			]);
			await next();
		}));

		this.onMessage(handleErrors(async (context: TurnContext, next: () => any) => {
			await updateOrCreateUserInDatabase(context);
			let text = context.activity.text;
			if (text) {
				text = text.toLowerCase().replace(/\n|\r/g, "").trim();
			}
			switch (text) {
				case "signout": {
					const user = await TeamsInfo.getMember(context, context.activity.from.id);
					await deleteUserToken(user.email);
					await context.sendActivity("You have been signed out");
					break;
				}
				case "signin": {
					await context.sendActivity({ attachments: [CardFactory.adaptiveCard(OAuthCard)] });
					break;
				}
				case "welcome": {
					await context.sendActivities([
						{ attachments: [CardFactory.adaptiveCard(welcomeCard)] },
						{ attachments: [CardFactory.adaptiveCard(OAuthCard)] }
					]);
					break;
				}
				default: {
					await context.sendActivity("I don't recognise this command");
					break;
				}
			}
			await next();
		}));
	}

	protected async handleTeamsTaskModuleFetch(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse> {
		const template = AdaptiveCards.declare(taskModuleRequest.data.data.type == "commentCard" ? commentCard : editCard).render(
			taskModuleRequest.data.data
		)
		const card = CardFactory.adaptiveCard(template);
		const response: TaskModuleResponse = {
			task: {
				type: 'continue',
				value: {
					width: 600,
					card
				}
			}
		};
		return response;
	}

	protected async handleTeamsTaskModuleSubmit(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse> {
		let message = 'request received successfully!'
		try {
			const user = await TeamsInfo.getMember(context, context.activity.from.id);
			const email = user.email;

			const isSignedIn = await checkUserSignIn(email);
			if (!isSignedIn) {
				message = 'Please sign in and try again'
				await context.sendActivity({ attachments: [CardFactory.adaptiveCard(OAuthCard)] });
			} else {
				await saveResponse(taskModuleRequest.data, email);
			}

			const taskModuleResponse: TaskModuleResponse = {
				task: {
					type: 'message',
					value:
						message
				}
			};
			return taskModuleResponse;
		} catch (error) {
			console.error('Error handling task module submit:', error);
		}
	}
}
