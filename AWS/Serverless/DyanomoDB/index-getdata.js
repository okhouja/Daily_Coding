const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: "us-east-2",
  apiVersion: "2012-08-10",
});

const cisp = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

exports.handler = (event, context, callback) => {
  const accessToken = event.accessToken;

  const type = event.type;
  if (type == "all") {
    const params = {
      TableName: "compare-yourself",
    };
    dynamodb.scan(params, function (err, data) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(data);
        const items = data.Items.map((dataField) => {
          return {
            age: +dataField.Age.N,
            height: +dataField.Height.N,
            income: +dataField.Income.N,
          };
        });
        callback(null, items);
      }
    });
  } else if (type == "single") {
    const cisParams = {
      AccessToken: accessToken,
    };
    cisp.getUser(cisParams, (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(result);
        const userId = result.UserAttributes[0].Value;
        const params = {
          Key: {
            UserId: {
              S: userId,
            },
          },
          TableName: "compare-yourself",
        };
        dynamodb.getItem(params, function (err, data) {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            console.log(data);
            callback(null, [
              {
                age: +data.Item.Age.N,
                height: +data.Item.Height.N,
                income: +data.Item.Income.N,
              },
            ]);
          }
        });
      }
    });
  } else {
    callback("Something went wrong!");
  }
};
