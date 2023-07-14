import {
	CloudAdapter,
	ConfigurationServiceClientCredentialFactory,
	ConfigurationBotFrameworkAuthentication,
	TurnContext,
} from "botbuilder";

import config from "./config";

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
	MicrosoftAppId: config.botId,
	MicrosoftAppPassword: config.botPassword,
	MicrosoftAppType: "MultiTenant",
});

const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
	{},
	credentialsFactory
);

const adapter = new CloudAdapter(botFrameworkAuthentication);

// Catch-all for errors.
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
	// This check writes out errors to console log .vs. app insights.
	// NOTE: In production environment, you should consider logging this to Azure
	//       application insights.
	console.error(`\n [onTurnError] unhandled error: ${error}`);

	// Send a trace activity, which will be displayed in Bot Framework Emulator
	await context.sendTraceActivity(
		"OnTurnError Trace",
		`${error}`,
		"https://www.botframework.com/schemas/error",
		"TurnError"
	);

	// Send a message to the user
	await context.sendActivity(`The bot encountered unhandled error:\n ${error.message}`);
	await context.sendActivity("To continue to run this bot, please fix the bot source code.");
};
adapter.onTurnError = onTurnErrorHandler;

export { adapter };