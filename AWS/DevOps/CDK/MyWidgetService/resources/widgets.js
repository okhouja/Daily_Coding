// const AWS = require('aws-sdk');
// const S3 = new AWS.S3();

// const bucketName = process.env.BUCKET;

// exports.main = async function(event, context) {
//   try {
//     var method = event.httpMethod;

//     if (method === "GET") {
//       if (event.path === "/") {
//         const data = await S3.listObjectsV2({ Bucket: bucketName }).promise();
//         var body = {
//           widgets: data.Contents.map(function(e) { return e.Key })
//         };
//         return {
//           statusCode: 200,
//           headers: {},
//           body: JSON.stringify(body)
//         };
//       }
//     }

//     // We only accept GET for now
//     return {
//       statusCode: 400,
//       headers: {},
//       body: "We only accept GET /"
//     };
//   } catch(error) {
//     var body = error.stack || JSON.stringify(error, null, 2);
//     return {
//       statusCode: 400,
//         headers: {},
//         body: JSON.stringify(body)
//     }
//   }
// }

// import AWS from 'aws-sdk'
// const S3 = new AWS.S3();
// const S3 = require('@aws-sdk/client-s3');

const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});
const S3 = new AWS.S3({apiVersion: '2006-03-01'});


const bucketName = process.env.BUCKET;

/* 
This code uses callbacks to handle asynchronous function responses.
It currently demonstrates using an async-await pattern. 
AWS supports both the async-await and promises patterns.
For more information, see the following: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/calling-services-asynchronously.html
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html 
*/
exports.main = async function (event, context) {
    try {
        var method = event.httpMethod;
        // Get name, if present
        var widgetName = event.path.startsWith('/') ? event.path.substring(1) : event.path;

        if (method === "GET") {
            // GET / to get the names of all widgets
            if (event.path === "/") {
                const data = await S3.listObjectsV2({ Bucket: bucketName }).promise();
                var body = {
                    widgets: data.Contents.map(function (e) { return e.Key })
                };
                return {
                    statusCode: 200,
                    headers: {},
                    body: JSON.stringify(body)
                };
            }

            if (widgetName) {
                // GET /name to get info on widget name
                const data = await S3.getObject({ Bucket: bucketName, Key: widgetName }).promise();
                var body = data.Body.toString('utf-8');

                return {
                    statusCode: 200,
                    headers: {},
                    body: JSON.stringify(body)
                };
            }
        }

        if (method === "POST") {
            // POST /name
            // Return error if we do not have a name
            if (!widgetName) {
                return {
                    statusCode: 400,
                    headers: {},
                    body: "Widget name missing"
                };
            }

            // Create some dummy data to populate object
            const now = new Date();
            var data = widgetName + " created: " + now;

            var base64data = new Buffer(data, 'binary');

            await S3.putObject({
                Bucket: bucketName,
                Key: widgetName,
                Body: base64data,
                ContentType: 'application/json'
            }).promise();

            return {
                statusCode: 200,
                headers: {},
                body: JSON.stringify(event.widgets)
            };
        }

        if (method === "DELETE") {
            // DELETE /name
            // Return an error if we do not have a name
            if (!widgetName) {
                return {
                    statusCode: 400,
                    headers: {},
                    body: "Widget name missing"
                };
            }

            await S3.deleteObject({
                Bucket: bucketName, Key: widgetName
            }).promise();

            return {
                statusCode: 200,
                headers: {},
                body: "Successfully deleted widget " + widgetName
            };
        }

        // We got something besides a GET, POST, or DELETE
        return {
            statusCode: 400,
            headers: {},
            body: "We only accept GET, POST, and DELETE, not " + method
        };
    } catch (error) {
        var body = error.stack || JSON.stringify(error, null, 2);
        return {
            statusCode: 400,
            headers: {},
            body: body
        }
    }
}
