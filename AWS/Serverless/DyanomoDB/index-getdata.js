const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB({
  region: "us-east-2",
  apiVersion: "2012-08-10",
});

exports.handler = async (event) => {
  const type = event.type;
  if (type == "all") {
    const params = {
      TableName: "compare-yourself",
    };

    try {
      const data = await dynamodb.scan(params).promise();
      console.log(data);
      const items = data.Items.map((dataField) => {
        return {
          age: +dataField.Age.N,
          height: +dataField.Height.N,
          income: +dataField.Income.N,
        };
      });
      console.log(items);
    } catch (err) {
      return { statusCode: 500, body: err };
    }
  } else if (type == "single") {
    const params = {
      Key: {
        "UserId": {
          S: "user_0.5813644137697216",
        },
      },
      TableName: "compare-yourself",
    };
    try {
      const data = await dynamodb.getItem(params).promise();
      console.log(data);
      const items = data.Items.map((dataField) => {
        return {
          age: +dataField.Age.N,
          height: +dataField.Height.N,
          income: +dataField.Income.N,
        };
      });
      console.log(items);
    } catch (err) {
      return { statusCode: 500, body: err };
    }
  } else {
    console.log("Hello from Lambda & something went wrong");
  }
};
