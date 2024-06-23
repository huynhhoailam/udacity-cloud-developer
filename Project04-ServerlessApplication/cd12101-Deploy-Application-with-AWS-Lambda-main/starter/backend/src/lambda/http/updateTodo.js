import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { updateTodo } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('Http updateTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  ).handler(async (event) => {
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    logger.info('Update a TODO item with the provided id using values in the "updatedTodo" object')

    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const data = JSON.parse(event.body)

    await updateTodo(userId, todoId, data)

    return {
      statusCode: 200,
      body: 'Todo has been updated successfully'
    }
  })