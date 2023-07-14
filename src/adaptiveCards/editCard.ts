export const editCard = {
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.4",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Container",
                            "style": "emphasis",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "${taskId}",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Input.Text",
                            "placeholder": "description",
                            "isMultiline": true,
                            "id": "ticketDescription"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": "auto",
                    "items": [
                        {
                            "type": "Input.ChoiceSet",
                            "id": "ticketStatus",
                            "label": "status",
                            "value": "${taskStatus}",
                            "choices": [
                                {
                                    "title": "IN PROGRESS",
                                    "value": "IN PROGRESS"
                                },
                                {
                                    "title": "DONE",
                                    "value": "DONE"
                                }
                            ],
                            "separator": true,
                            "wrap": true
                        },
                        {
                            "type": "Input.ChoiceSet",
                            "id": "ticketPriority",
                            "label": "Priority",
                            "value": "${taskPriority}",
                            "choices": [
                                {
                                    "title": "Critical",
                                    "value": "Critical"
                                },
                                {
                                    "title": "High",
                                    "value": "High"
                                },
                                {
                                    "title": "Medium",
                                    "value": "Medium"
                                },
                                {
                                    "title": "Low",
                                    "value": "Low"
                                },
                                {
                                    "title": "Minor",
                                    "value": "Minor"
                                },
                                {
                                    "title": "Major",
                                    "value": "Major"
                                }
                            ]
                        },
                        {
                            "type": "TextBlock",
                            "text": "Created ${dateCreated}",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "text": "Updated ${dateUpdated}",
                            "wrap": true
                        }
                    ]
                }
            ]
        }
    ],
    actions: [
        {
            "type": 'Action.Submit',
            "title": "save",
            "data": {
                taskId: "${taskId}"
            }
        }
    ]
};