import { createLogger } from '../utils/logger.mjs';
import AWSXRay from 'aws-xray-sdk-core';
import AWS from 'aws-sdk';

const logger = createLogger('Data Layer')

const awsService = new AWSXRay.captureAWS(AWS);
const documentClient = new awsService.DynamoDB.DocumentClient();
const tableName = process.env.TODOS_TABLE;
const indexName = process.env.TODOS_CREATED_AT_INDEX;

export class TodosAccess {

    // Get Todos
    async getTodos(userId) {
        logger.info('Data Layer: getTodos')

        const params = {
            TableName: tableName,
            IndexName: indexName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }

        const response = await documentClient.query(params).promise()

        return response.Items;
    }

    // Create Todo
    async createTodo(item) {
        logger.info('Data Layer: createTodo')

        const params = {
            TableName: tableName,
            Item: item
        }

        const response = await documentClient.put(params).promise()
        logger.info(`Data Layer: Todo has been created successfully: ${response}`)
        return item;
    }


    // Update Todo
    async updateTodo(item) {
        logger.info('Data Layer: createTodo')

        const params = {
            TableName: tableName,
            Key: {
                todoId,
                userId
            },
            UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
            ExpressionAttributeValues: {
                ':name': item.name,
                ':dueDate': item.dueDate,
                ':done': item.done
            },
            ExpressionAttributeNames: {
                '#name': 'name'
            },
            ReturnValues: 'UPDATED_NEW'
        }

        await documentClient.update(params).promise()
        return item;
    }

    // Delete Todo
    async deleteTodo(userId, todoId) {
        logger.info('Data Layer: deleteTodo')

        const params = {
            TableName: tableName,
            Key: {
                todoId,
                userId
            }
        }

        const response = await documentClient.delete(params).promise()
        logger.info(`Data Layer: Todo has been successfully deleted: ${response}`)
        return response
    }

    // Update AttachmentUrl of todo
    async updateAttachmentUrl(userId, todoId, url) {
        logger.info('Data Layer: updateAttachmentUrl')

        const params = {
            TableName: tableName,
            Key: {
                todoId,
                userId
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': url.split("?")[0]
            }
        }

        await documentClient.update(params).promise()
    }
}