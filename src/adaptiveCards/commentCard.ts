export const commentCard = {
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.4",
    body: [
        {
            "type": "Container",
            "style": "emphasis",
            "items": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "Large",
                                    "weight": "Bolder",
                                    "text": "${taskId}",
                                    "wrap": true
                                }
                            ],
                            "width": "stretch"
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "Large",
                                    "weight": "Bolder",
                                    "text": "${taskStatus}",
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "Due : ${dueDate}",
                                    "wrap": true
                                }
                            ],
                            "width": "auto"
                        }
                    ]
                },
                {
                    type: 'Input.Text',
                    id: 'comment',
                    placeholder: 'enter your comment here',
                    IsMultiline: true
                }
            ]
        }
    ],
    actions: [
        {
            type: 'Action.Submit',
            title: 'Submit',
            data: {
                taskId: "${taskId}",
            }
        }
    ]
};