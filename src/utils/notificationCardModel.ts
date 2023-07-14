/**
 * Adaptive Card data model. Properties can be referenced in an adaptive card via the `${var}`
 * Adaptive Card syntax.
 */
export interface CardData {
	// email id of the user to whom the notification will be sent
	email: string;
	// url from the work-management system to the task
	ticketUrl: string;
	// current status of the task {INProgress, DONE}
	taskStatus: string;
	// task id from the work-management system
	taskId: string;
	// due date of the task
	dueDate: string;
	// summary of the task
	summary: string;
	// if some feild is changed like due date, status, priority - this should hold the old value otherwise pass an empty string
	oldVal: string;
	// if some feild is changed like due date, status, priority - this should hold the new value otherwise pass an empty string
	newVal: string;
	// created date of the task
	dateCreated: string;
	// updated date of the task
	dateUpdated: string;
	// priority of the task
	taskPriority: string;
	// this should hold the values like comment value or attachment description pass an empty string if no content is added
	contentAdded: string;
}