// Ref: https://www.youtube.com/watch?v=tXNrQcjMUSg
// Instructions: 
//    Update the Google sheet link in the Sheet_editURL.gs 
//    Update the Google form link in the  Form_editURL.gs
//    Select "setupFormEditResponseURLs" as Trigget on the form on editURL.gs
//    Click on Run -> Execution starts
//    Go the Google sheet, a POP-UP msg would be seen. Click ok. And Done.
// Create the Form Submit Trigger
function createFormTrigger() {
  var triggerName = '-- LINK-TO-GOOGLESHEET-SUBSHEET-WHICH-IS-LINKED-TO-GOOGLEFORM -- ';
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger(triggerName)
    .forSpreadsheet(spreadsheet)
    .onFormSubmit()
    .create();
}

function addFormResponseUrl(e) {
  // Get the Google Form linked to the response
  var responseSheet = e.range.getSheet();
  var googleFormUrl = responseSheet.getFormUrl();
  var googleForm = FormApp.openByUrl(googleFormUrl);

  // Get the form response based on the timestamp
  var timestamp = new Date(e.namedValues.Timestamp[0]);
  var formResponse = googleForm.getResponses(timestamp).pop();

  // Get the Form response URL and add it to the Google Spreadsheet
  var responseUrl = formResponse.getEditResponseUrl();
  var row = e.range.getRow();
  var responseColumn = 8; // Column where the response URL is recorded.
  responseSheet.getRange(row, responseColumn).setValue(responseUrl);
}