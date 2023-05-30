// Ref: https://www.youtube.com/watch?v=tXNrQcjMUSg
// Instructions: 
//    Update the Google sheet link in the Sheet_editURL.gs 
//    Update the Google form link in the  Form_editURL.gs
//    Select "setupFormEditResponseURLs" as Trigget on the form on editURL.gs
//    Click on Run -> Execution starts
//    Go the Google sheet, a POP-UP msg would be seen. Click ok. And Done.


// Form URL
var formURL = '-- INSERT-GOOGLEFORM-LINK --';
// Sheet name used as destination of the form responses
var sheetName = 'Form Responses 1';
/*
 * Name of the column to be used to hold the response edit URLs 
 * It should match exactly the header of the related column, 
 * otherwise it will do nothing.
 */
var columnName = 'Edit Url' ;
// Responses starting row
var startRow = 2;

function getEditResponseUrls(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues(); 
  var columnIndex = headers[0].indexOf(columnName);
  var data = sheet.getDataRange().getValues();
  var form = FormApp.openByUrl(formURL);
  for(var i = startRow-1; i < data.length; i++) {
    if(data[i][0] != '' && data[i][columnIndex] == '') {
      var timestamp = data[i][0];
      var formSubmitted = form.getResponses(timestamp);
      if(formSubmitted.length < 1) continue;
      var editResponseUrl = formSubmitted[0].getEditResponseUrl();
      sheet.getRange(i+1, columnIndex+1).setValue(editResponseUrl);
    }
  }
}