const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();

const Expires = 300;
const Bucket = "carrentalappleaf3demoproject"

exports.handler = async(event) => {
    const { Key, ContentType, newFile } = JSON.parse(event.body)
    try {
        const params = {
            Key,
            Bucket,
            Expires,
            ContentType,
        };
        const url = s3.getSignedUrl('putObject', params);
        const response = await lambda.invoke({
            FunctionName: '',
            Payload: JSON.stringify({
                url,
                file: newFile
            })
        }).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ success: response.$response.data })
        }
    } catch (error) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error })
        }
    }
}