const models = require("../controllers/models.js");
let modelsMongo = new models();

module.exports = function() {
  this.saving = async function(req, res, next) {
    try {
      req.database = await modelsMongo.saveIssue(
        req.params.projectName,
        req.body
      );
      next();
    } catch (error) {
      console.log("error");
      next(error);
    }
  };
  this.find = async function(req, res, next) {
    try {
      req.database = await modelsMongo.getIssues(
        req.params.projectName,
        req.query
      );
      next();
    } catch (error) {
      console.log("error");
      next(error);
    }
  };

  this.delete = async function(req, res, next) {
    try {
      req.database = await modelsMongo.deleteIssue(
        req.params.projectName,
        req.body._id
      );
      next();
    } catch (error) {
      next(error);
    }
  };

  this.update = async function(req, res, next) {
    try {
      req.database = await modelsMongo.updateIssue(
        req.params.projectName,
        req.body
      );
      next();
    } catch (error) {
      next(error);
    }
  };
};
