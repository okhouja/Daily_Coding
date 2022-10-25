exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;
  console.log("event.methodArn " + event.methodArn);

  // Use token
  if (token === "allow") {
    const policy = genPolicy("allow", event.methodArn);
    const principalId = "aflaf78fd7afalnv";
    const context = {
      simpleAuth: true,
    };
    const response = {
      principalId: principalId,
      policyDocument: policy,
      context: context,
    };
    callback(null, response);
  } else if (token == "deny") {
    const policy = genPolicy("deny", event.methodArn);
    const principalId = "aflaf78fd7afalnv";
    const context = {
      simpleAuth: true,
    };
    const response = {
      principalId: principalId,
      policyDocument: policy,
      context: context,
    };
    callback(null, response);
  } else {
    callback(null,"Unauthorized");
  }
};

function genPolicy(effect, resource) {
  const policy = {};
  policy.Version = "2020-12-08";
  policy.Statement = [];
  const stmt = {};
  stmt.Action = "execute-api:Invoke";
  stmt.Effect = effect;
  stmt.Resource = resource;
  policy.Statement.push(stmt);
  return policy;
}

// "userId": "$context.authorizer.principalId"