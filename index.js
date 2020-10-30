import {DynamoDB} from 'aws-sdk';

exports.handler = function(event, context, callback) {
    // TODO: get input values for fetcher
    const inputId = '';
    var params = {
        Key: {
            "ID": {
                S: inputId
            }
        },
        TableName: serialize(process.env.TableName || "Default")
    };
    try {
        const data = DynamoDB.getItem(params).promise();
        callback(null, data);
    } catch (err) {
        console.log(err, err.stack); // an error occurred
    }
    /*
    data = {
    Item: {
    "AlbumTitle": {
        S: "Songs About Life"
    }, 
    "Artist": {
        S: "Acme Band"
    }, 
    "SongTitle": {
        S: "Happy Day"
    }
    }
    }
    */
    //
}


var serialize = function(object) {
    return JSON.stringify(object, null, 2)
}
