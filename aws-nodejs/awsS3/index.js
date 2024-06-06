const {S3Client, GetObjectCommand,PutObjectCommand} = require ("@aws-sdk/client-s3")
const { getSignedUrl } = require ("@aws-sdk/s3-request-presigner");

const s3Client=new S3Client({
    region:'ap-south-1',
    credentials:{
        accessKeyId:'AKIA3W66FKKVQ5K2OUWG',
        secretAccessKey:"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"
    }
});

async function getObjectURL(key){
    const command=new GetObjectCommand({
        Bucket:'sejal-private-yt',
        Key:key,
    });
    const url = await getSignedUrl(s3Client,command);
    return url;
}

async function putObjectURL(key,contentType){  //key and content type user will give
    const command=new PutObjectCommand({
        Bucket:"sejal-private-yt",
        Key:`/uploads/user`,
        ContentType:contentType,
    })
    const url=await getSignedUrl(s3Client,command);
    return url;
}

async function init(){
    console.log('url',await getObjectURL("filter.png"));
    console.log('uploaded file',await putObjectURL(`image-${Date.now()}.jpeg`,"image/jpeg"));
}
init();