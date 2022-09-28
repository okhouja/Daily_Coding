import { Request } from "express";

import { expect } from "chai";
const authMiddleware = require("../middleware/is-auth");
// import authMiddleware from "../middleware/is-auth";

it("should throw an error if no authorization header is present", () => {

  const req = {
    get: function (headerName: any) {
      return null;
    },
  };
  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
    "Not authenticated."
  );
});
// const req = {
//     get: (headerName) => {
//         return null
//     }
// }
// authMiddleware( req, {}, () => { })
// expect(req).to.have.property('userId')
// })