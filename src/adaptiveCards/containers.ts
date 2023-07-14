export const middleContainer = {
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
        }
    ],
    "bleed": true
};

export const changeContainer = {
    "type": "ColumnSet",
    "columns": [
        {
            "type": "Column",
            "width" : "auto",
            "items": [
                {
                    "type": "TextBlock",
                    "text": "${oldVal}",
                    "wrap": true
                }
            ]
        },
        {
            "type": "Column",
            "width": "auto",
            "items": [
                {
                    "type": "TextBlock",
                    "text": "${if(oldVal == '', '', '→')}",
                    "wrap": true
                }
            ]
        },
        {
            "type": "Column",
            "width": "auto",
            "items": [
                {
                    "type": "TextBlock",
                    "text": "${newVal}",
                    "wrap": true
                }
            ]
        }
    ]
};

export const extraContentAddedContainer = {
    "type": "TextBlock",
    "text": "${contentAdded}",
    "wrap": true,
    "size": "large"
}