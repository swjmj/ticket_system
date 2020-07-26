/*
In this file I will define my model and all the database releated operations will get done here.

To split the dependency of express the req object will not be an argument of any function





*/

const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let Schema = mongoose.Schema;
let issuesSchema = new Schema(
  {
    issue_title: { type: String, required: "Please give the ticket a title" },
    issue_text: { type: String, required: "Please give details" },
    created_by: { type: String, required: "Add who created the ticket" },
    assigned_to: { type: String, default: "" },
    status_text: { type: String, default: "" },
    open: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

// let issues = mongoose.model("Issues", issuesSchema);

module.exports = function() {
  this.saveIssue = async function(projectName, bodyObject) {
    let issues = mongoose.model(projectName + "Issues", issuesSchema);
    let newIssue = new issues(bodyObject);

    let dataSaved;
    try {
      dataSaved = await newIssue.save();
      return dataSaved;
    } catch (error) {
      console.log(error);
      dataSaved = error;
    }
    console.log("Everything looks fine");
    console.log(dataSaved);
  };

  this.getIssues = async function(projectName, query) {
    let queryResult;
    let issues = mongoose.model(projectName + "Issues", issuesSchema);
    try {
      queryResult = await issues.find(query);
      return queryResult;
    } catch (error) {
      console.log(error);
    }
  };

  this.deleteIssue = async function(projectName, id) {
    let deleteResult;
    //first validate the id, if not valid return "_id error"
    if (ObjectId.isValid(id)) {
      let issues = mongoose.model(projectName + "Issues", issuesSchema);
      try {
        deleteResult = await issues.deleteOne({ _id: id });
        //if found id in db and success
        if (deleteResult.deletedCount === 1) {
          console.log("deleted " + id);
          return "deleted " + id;
        } else if (deleteResult.deletedCount === 0) {
          console.log("could not delete " + id);
          return "could not delete " + id;
        }
      } catch (error) {
        deleteResult = error;
        console.log("error");
        return "could not delete " + id;
      }
    } else {
      console.log("id error");
      return "_id error";
    }
  };

  this.updateIssue = async function(projectName, query) {
    if (ObjectId.isValid(query._id)) {
      let issues = mongoose.model(projectName + "Issues", issuesSchema);
      let queryCopy = { ...query };

      // deleting the empty keys of query
      delete queryCopy["_id"];
      for (let key in queryCopy) {
        if (!queryCopy[key]) {
          delete queryCopy[key];
        }
      }
      if (Object.keys(queryCopy).length === 0) {
        return "no updated field send";
      }

      try {
        let resUpdate = await issues.findByIdAndUpdate(query._id, queryCopy);
        console.log("response for update", resUpdate);
        if (resUpdate) {
          return "successfully updated";
        } else {
          return "could not update " + query._id;
        }
      } catch (error) {
        console.log(error);
        return "could not update" + query._id;
      }
    } else {
      return "_id error";
    }
  };
};
