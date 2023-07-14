export let notificationTemplate = {
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.4",
    "msteams": { 
        "width": "full" 
    },
    "body": [
        {
            "type": "TextBlock",
            "text": "${summary}",
            "size": "Large",
            "weight": "Bolder",
            "wrap": true
        }
    ],
    "actions": [
        
    ]
}