import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs';
import { generateUploadUrl } from '../../businessLogic/todos.mjs'

const logger = createLogger('Http generateUploadUrl')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  ).handler(async (event) => {
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    logger.info('generate upload url')

    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)

    const response = await generateUploadUrl(userId, todoId)

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadUrl: response })
    }
  })
