import { v4 as uuid } from 'uuid';

import { TodosAccess } from '../dataLayer/todosAccess.mjs';
import { createLogger } from '../utils/logger.mjs';
import { AttachmentUtils } from '../fileStorage/attachmentUtils.mjs';

const logger = createLogger('Business Logic')
const todosAccess = new TodosAccess()
const attachmentUtil = new AttachmentUtils();

export async function getTodos(userId) {
    logger.info('Business Logic: getTodos')
    return todosAccess.getTodos(userId)
}

export async function createTodo(userId, item) {
    logger.info('Business Logic: createTodo')

    const todo = {
        todoId: uuid(),
        userId: userId,
        attachmentUrl: null,
        dueDate: null,
        createdAt: new Date().toISOString(),
        done: false,
        ...item
    }
    return await todosAccess.createTodo(todo)
}

export async function updateTodo(userId, todoId, data) {
    logger.info('Business Logic: updateTodo')
    return await todosAccess.updateTodo(userId, todoId, data)
}

export async function deleteTodo(userId, todoId) {
    logger.info('Business Logic: deleteTodo')
    return await todosAccess.deleteTodo(userId, todoId)
}

export async function generateUploadUrl(userId, todoId) {
    logger.info('Business Logic: generateUploadUrl')
    // Get SignedUrl from S3
    const url = await attachmentUtil.getSignedUrl(todoId)

    // Update AttachmentUrl for todo's user
    await todosAccess.updateAttachmentUrl(userId, todoId, url)
    return url
}