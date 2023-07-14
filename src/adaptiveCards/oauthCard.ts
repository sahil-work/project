export const OAuthCard = {
	"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
	"type": "AdaptiveCard",
	"version": "1.4",
	"body": [
		{
			"type": "Container",
			"items": [
				{
					"type": "Image",
					"url": "https://upload.wikimedia.org/wikipedia/commons/7/79/Sprinklr_Logo.png",
					"size": "large",
					"altText": "Sprinklr Logo"
				}
			],
			"spacing": "none",
			"width": "auto",
			"horizontalAlignment": "Left"
		}
	],
	"actions": [
		{
			"type": "Action.OpenUrl",
			"title": "Sign in",
			"url": "http://localhost:3978/api/oauth/login"
		}
	]
}

