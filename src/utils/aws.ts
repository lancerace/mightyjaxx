import * as AWS from 'aws-sdk';

const getAWSConfig = () => {
    return {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
}


const getS3Client = () => {
    AWS.config.update(getAWSConfig());
    let s3Client = new AWS.S3({ useAccelerateEndpoint: true });
    return s3Client;
}

async function generateS3ObjectPresignedURL(key: string, expiredIn?: number): Promise<string> {
    var params = { Bucket: process.env.S3_BUCKET, Key: key, Expires: expiredIn || 86400 }
    return getS3Client().getSignedUrl('getObject', params);
}

async function uploadImage(file: any, uploadURL: string, fileName: string) {
    try {
        //const { createReadStream } = await file;
        //const fileStream = createReadStream();
        const params = {
            Bucket: `${process.env.S3_BUCKET}/${uploadURL}`,
            Key: fileName,
            Body: file
        }
        const s3 = getS3Client();
        const result = await s3.upload(params).promise();
        const s3ImageUrl = result?.Key;
        return s3ImageUrl;
    } catch (err) {
        throw new Error(err.message);
    }

}


export default { generateS3ObjectPresignedURL, uploadImage };

