/**
 * Error handling middleware that wraps an async function.
 *
 * @param {Function} handler - The async function to be wrapped.
 * @returns {Function} An async function that handles errors for the provided function.
 */
export function handleErrors(handler) {
    return async (context, next) => {
        try {
            await handler(context, next);
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
}

