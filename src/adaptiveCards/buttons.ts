export const commentButton = {
    type: 'Action.Submit',
    title: "comment",
    data: { 
        msteams: { 
            type: 'task/fetch' 
        }, 
        data : {
            type: 'commentCard' ,
            taskStatus: "${taskStatus}",
            taskId: "${taskId}",
            dueDate: "${dueDate}",
        }
    }
}

export const editButton = {
    type: 'Action.Submit',
    title: "edit",
    data: { 
        msteams: { 
            type: 'task/fetch' 
        }, 
        data : {
            type: 'editCard',
            dateCreated : "${dateCreated}",
            dateUpdated : "${dateUpdated}",
            taskId : "${taskId}",
            taskStatus : "${taskStatus}",
            taskPriority : "${taskPriority}",
        }
    }
}

export const openticketButton = {
    'type': 'Action.OpenUrl',
    'title':'open ticket',
    'url': '${ticketUrl}'
}