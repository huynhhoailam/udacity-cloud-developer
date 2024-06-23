import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getTodos } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('Http getTodos')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  ).handler(async (event) => {
    // TODO: Get all TODO items for a current user
    logger.info('Get all TODO items for a current user')

    const userId = getUserId(event)
    const items = await getTodos(userId)

    return {
      statusCode: 200,
      body: JSON.stringify(
        { items: items }
      )
    }
  })