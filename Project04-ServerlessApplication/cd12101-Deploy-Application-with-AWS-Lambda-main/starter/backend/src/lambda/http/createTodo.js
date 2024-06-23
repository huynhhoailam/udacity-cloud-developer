import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodo } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('Http createTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  ).handler(async (event) => {
    // TODO: Implement creating a new TODO item
    logger.info('creating a new TODO item')

    const userId = getUserId(event)
    const data = JSON.parse(event.body)

    const item = await createTodo(userId, data)

    return {
      statusCode: 200,
      body: JSON.stringify(
        { item: item }
      )
    }
  })