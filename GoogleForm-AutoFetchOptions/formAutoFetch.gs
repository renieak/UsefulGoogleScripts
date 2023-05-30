// Triggers to set for Auto Fetch
// Deployment: Head | Event: Time-based                 | Function: populateQuestions
// Deployment: Head | Event: From form - On form submit | Function: populateQuestions
// Deployment: Head | Event: From form - On open        | Function: populateQuestions

function openForm(e)
{
  populateQuestions();
}

function populateQuestions() {
  var form = FormApp.getActiveForm();
  var googleSheetsQuestions = getQuestionValues();
  var itemsArray = form.getItems();
  itemsArray.forEach(function(item){
    googleSheetsQuestions[5].forEach(function(header_value, header_index) { // Here "5" is [row_number - 1] for heading
      if(header_value == item.getTitle())
      {
        var choiceArray = [];
        for(j = 6; j < googleSheetsQuestions.length; j++) // Here "6" is the [starting_row_number - 1] for the list
        {
          (googleSheetsQuestions[j][header_index] != '') ? choiceArray.push(googleSheetsQuestions[j][header_index]) : null;
        }
        item.asMultipleChoiceItem().setChoiceValues(choiceArray);
        // If using Dropdown Questions use line below instead of line above.
        //item.asListItem().setChoiceValues(choiceArray);
      }
    });     
  });
}

function getQuestionValues() {
  var ss= SpreadsheetApp.openById('EnterSheetID');
  var questionSheet = ss.getSheetByName('TodayList');
  var returnData = questionSheet.getDataRange().getValues();
  //debugger;
  return returnData;
}