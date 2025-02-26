/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define(["N/ui/dialog"], (dialog) => {
  let finalResult = false;
  let finalResultSet = false;

  const success = (result) => {
    try {
      finalResult = result;
      finalResultSet = true;

      if (finalResult) {
        console.log("Confirmation accepted, saving record.");
        const submitBtn = document.querySelector("#submitter");
        submitBtn?.click();
      } else {
        console.log("Confirmation canceled.");
      }

      finalResultSet = false;
    } catch (e) {
      console.log(`${e.message}` || "Unexpected error");
    }
  };

  const fail = (reason) => {
    try {
      console.log("Failure: " + reason);
      return false;
    } catch (e) {
      console.log(`${e.message}` || "Unexpected error");
    }
  };

  const saveRecord = (context) => {
    const FN = "saveRecord";
    try {
      if (!finalResultSet) {
        dialog
          .confirm({
            title: "Confirmation",
            message: "Are you sure you want to save this record?",
          })
          .then(success)
          .catch(fail);
      } else {
        finalResultSet = false;
        return finalResult;
      }
    } catch (e) {
      console.log(`${e.message}` || "Unexpected error");
    }
  };

  return {
    saveRecord,
  };
});
