import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTodo } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('Http deleteTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  ).handler(async (event) => {
    // TODO: Remove a TODO item by id
    logger.info('Remove a TODO item by id')

    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)


    await deleteTodo(userId, todoId)

    return {
      statusCode: 200,
      body: 'Todo has been successfully deleted'
    }
  })
