/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

const middleware = require("../middleware/middleware.js");

const middlewareFunction = new middleware();

module.exports = function(app) {
  app.get("/:projectName", (req, res) => {
    console.log(process.cwd());
    res.sendFile(process.cwd() + "/public/issue.html");
  });

  app
    .route("/api/issues/:projectName")
    .get(middlewareFunction.find, (req, res) => {
      if (req.database.length) {
        res.json(req.database);
      } else {
        res.send("Not found in DB");
      }
    })
    .post(middlewareFunction.saving, (req, res) => {
      console.log("Response for database");
      console.log(req.database);
      res.send(req.database);
    })
    .put(middlewareFunction.update, (req, res) => {
      // console.log("in api " + req.database);
      res.send(req.database);
    })
    .delete(middlewareFunction.delete, (req, res) => {
      res.send(req.database);
    });
};
