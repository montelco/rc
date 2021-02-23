
let toggleFilters = function (e) {
  e.preventDefault();
  let flyout = document.getElementById('filterPane');
  flyout.classList.toggle('t-hidden');
  flyout.classList.toggle('t-scale-0');
  flyout.classList.toggle('t-opacity-0');

  let mainPane = document.getElementById('mainPane');
  mainPane.classList.toggle('t-rounded-bl-lg');
  mainPane.classList.toggle('t-rounded-br-lg');
};

// Add event listener
document.getElementById("toggleFilters").addEventListener('click', toggleFilters);

$(document).on("keypress", "#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_search_input", function (e) {
  if (e.which == 13) {
    var inputVal = $(this).val();
    // console.log("search val", inputVal);
    callSearch(inputVal);
  }
});

//Reset all filters
$(".clearAll").click(function () {
  //Reset intrest filter
  ResetFilters("filter_combobox_interest");
  interestFilter();

  //Reset division filter
  ResetFilters("filter_combobox_division");
  divisionFilter();

  //Reset Campus filter
  ResetFilters("filter_combobox_campus");
  campusFilter();

  //Reset general filter
  ResetFilters("filter_general");
  generalFilter();

  //Reset Search Filter
  seachClear();

  let flyout = document.getElementById('filterPane');
  flyout.classList.add('t-hidden');
  flyout.classList.add('t-scale-0');
  flyout.classList.add('t-opacity-0');

  let mainPane = document.getElementById('mainPane');
  mainPane.classList.add('t-rounded-bl-lg');
  mainPane.classList.add('t-rounded-br-lg');
})


//Select all Campus
$("#select_all_campus").click(function () {
  SelectAll("filter_combobox_campus");
});

//Select All Divison
$("#select_all_division").click(function () {
  SelectAll("filter_combobox_division");
});

//Select All Interests
$("#select_all_interest").click(function () {
  SelectAll("filter_combobox_interest");
});

//Function to Perform SelectAll Operation
function SelectAll(checkboxClass) {
  var allinterest = $("." + checkboxClass);
  for (i = 0; i < allinterest.length; i++) {
    //start with 1 to avoid all items
    if (!$(allinterest[i]).find("input").is(":checked")) {
      $(allinterest[i]).find("input").prop('checked', true);
      $(allinterest[i]).find('input').attr("checked", "checked");
      $(allinterest[i]).find("input").trigger("change");
    }
  }
  if (checkboxClass === "filter_combobox_campus") {
    campusFilter();
  }
  else if (checkboxClass === "filter_combobox_division") {
    divisionFilter();
  }
  else if (checkboxClass === "filter_combobox_interest") {
    interestFilter()
  }
}


function ResetFilters(checkboxClass) {
  $("." + checkboxClass).each(function () {
    console.log("Inside Reset")
    if ($(this).children().prop('checked')) {
      $(this).children().prop('checked', false);
      $(this).children().removeAttr('checked');
      $(this).children().trigger('change');
    }
  });
}

$('input[type="checkbox"]').click(function () {
  var checkboxtext = $(this).parent().text();
  var checkboxclass = $(this).parent().attr('class');

  if ($(this).prop("checked") == true) {
    //console.log("Checkbox is checked.");  
    if (checkboxtext.trim() !== "All Division" && checkboxtext.trim() !== "All Interests" && checkboxtext.trim() !== "All Campus") {
      if (checkboxclass == "filter_combobox_campus") {
        campusFilter();
      }
      else if (checkboxclass == "filter_combobox_division") {
        divisionFilter();
      }
      else if (checkboxclass == "filter_combobox_interest") {
        interestFilter();
      }
      else if (checkboxclass === "filter_general") {
        generalFilter()
      }
    }
  }
  else if ($(this).prop("checked") == false) {
    $(this).removeAttr('checked'); //remove checked attribute
    if (checkboxclass == "filter_combobox_campus") {
      campusFilter();
    }
    else if (checkboxclass == "filter_combobox_division") {
      divisionFilter();
    }
    else if (checkboxclass == "filter_combobox_interest") {
      interestFilter();
    }
    else if (checkboxclass == "filter_general") {
      generalFilter()
    }
  }
});

function callSearch(searchvalobj) {
  // console.log("search value -" + $('#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_search_input').val());
  //__doPostBack('ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnSearch', '');
  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnSearch").click();
  return false;
}

function searchClick() {
  var searchvalobj = $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_search_input").val();
  if (searchvalobj != undefined && searchvalobj != "") {
    callSearch(searchvalobj);
  }
  return false;
}

function seachClear() {
  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_search_input").val("");
  console.log("search value -" + $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_search_input").val());
  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnClear").click();
  return false;
}

function interestFilter() {
  var interestFilterval = "";
  $('.filter_combobox_interest').each(function () {
    if ($(this).children().prop("checked")) {
      interestFilterval += $(this).text() + ";";
    }
  });

  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_hdnInterestFilterval").val(interestFilterval.substr(0, interestFilterval.length - 1));
  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnInterest").click();
}

//Function to filter division records
function divisionFilter() {
  var divisionFilterval = "";
  $('.filter_combobox_division').each(function () {
    if ($(this).children().prop("checked")) {
      divisionFilterval += $(this).text() + ";";
    }
  });

  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_hdnDivisionFilterval").val(divisionFilterval.substr(0, divisionFilterval.length - 1));
  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnDivision").click();
}

//General Filter
function generalFilter() {
  $(".filter_general").each(function () {
    if ($(this).children().prop('checked')) {
      if ($(this).children().val() == "is3p1") {
        $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_hdnIs3P1Filterval").val(true);
        $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnIs3P1").click();
      }
      else {
        $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_hdnIsFAEligFilterval").val(true);
        $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnIsFAElig").click();
      }
    }
    else {
      if ($(this).children().val() == "is3p1") {
        $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_hdnIs3P1Filterval").val(false);
        $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnIs3P1").click();
      }
      else {
        $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_hdnIsFAEligFilterval").val(false);
        $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnIsFAElig").click();
      }
    }
  });

}

//Function to filter campus records
function campusFilter() {
  var campusFilterval = "";
  $('.filter_combobox_campus').each(function () {
    if ($(this).children().prop("checked")) {
      campusFilterval += $(this).text() + ";";
    }
  });

  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_hdnCampusFilterval").val(campusFilterval.substr(0, campusFilterval.length - 1));
  $("#ctl00_ctl41_g_f554f4ac_ef06_4ed4_8e1d_37244b375d3b_ctl00_btnCampus").click();
}
