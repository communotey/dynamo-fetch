const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB({
    region: process.env.REGION || 'us-east-1'
})

exports.handler = async (event) => {
    // TODO: get input values for fetcher
    const inputId = event.inputId || event.queryStringParameters && event.queryStringParameters.inputId;
    const itemKeyName = process.env.ITEM_KEY_NAME || 'ID';
    const keyObj = {}
    keyObj[itemKeyName] = {
        S: inputId
    }
    var params = {
        Key: keyObj,
        TableName: process.env.TABLE_NAME || "Default"
    };
    try {
        const data = await DynamoDB.getItem(params).promise();
        const loc = data.Item[process.env.ITEM_VALUE_NAME || 'link'].S
        const response = {
            statusCode: 301,
            headers: {
                Location: loc
            }
        }
        return response;
    } catch (err) {
        console.log(err, err.stack); // an error occurred
        throw err;
    }
}

