import { createLogger } from '../utils/logger.mjs';
import AWS from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk-core';

const logger = createLogger('fileStorage')

const s3BucketName = process.env.S3_BUCKET_NAME;
const Exp = Number(process.env.SIGNED_URL_EXPIRETIME);


export class AttachmentUtils {

    getSignedUrl(todoId) {
        logger.info('getSignedUrl')

        const xray = AWSXRay.captureAWS(AWS)
        const s3 = new xray.S3({ signatureVersion: 'v4' })

        return s3.getSignedUrl('putObject', {
            Bucket: s3BucketName,
            Key: todoId,
            Expires: Exp
        })
    }
}