$(document).ready(function() {
  // The "data" object will be passed to all event handlers and contains objects and methods initialized at document ready time
  var data = {
    //Defaults
    defaultHeightWarning: $("#height-warning").html(),
    defaultWeightWarning: $("#weight-warning").html(),
    defaultIBW: $("#ibw").html(),
    defaultABW: $("#abw").html(),
    // Error messages
    under60Error: "This calculator's formulae work only for heights greater than 60 inches (" + String(60 * 2.54) + " cm).",
    NegativeWeightError: "Please enter a weight greater than zero.",
    heightNaN: "Height must be a number!",
    weightNaN: "Weight must be a number!",
    // GenerateError function generates error messages in different places and sets their text to a different color
    generateError: function(location, errorString, defaultString) {
      location.html("<span class=\"error\">" + errorString + "</span><br />" + defaultString);
    },
    // The calculate function first checks for error messages; if there are no errors, the messages would have been cleared before the function is called
    calculate: function() {
      if ($("#height-warning").html() === "" && $("#weight-warning").html() === "") {
        // It has been assured that at least one gender will always be selected by having a default; therefore reference to only one is needed
        var ibw = 2.3 * (Number($("#inches").val()) - 60) + ($("#female").is(":checked") ? 45.5 : 50);
        var abw = (Number($("#kg").val()) - ibw) * 0.4 + ibw;
        var bmi = Number($("#kg").val()) / ((Number($("#cm").val()) / 100)^2);
        $("#ibw").html("IBW: " + ibw.toFixed(2) + " kg (" + (2.20462 * ibw).toFixed(2) + "lbs)");
        $("#abw").html("ABW" + (abw < ibw ? " is less than IBW." : ": " + abw.toFixed(2) + " kg (" + (2.20462 * abw).toFixed(2) + " lbs)"));
        $("#bmi").html("BMI: " + bmi.toFixed(2) + " kg/m<sup>2</sup>");
        $("#results").addClass("calculated");
      }
    },
    // Calculate button has no action, but it will cause any text areas to lose focus and thus a change event to possibly fire.
    // Function triggered by the reset button
    reset: function() {
      $("#male").prop("checked",true);
      $("#height-warning").html(this.defaultHeightWarning);
      $("#weight-warning").html(this.defaultWeightWarning);
      $("#cm,#inches,#kg,#lbs").val("");
      $("#abw").html(this.defaultABW);
      $("#ibw").html(this.defaultIBW);
      $("#results").removeClass("calculated");
    },
    setError: function() {
    	    $("#ibw").html("IBW will appear here once all errors are cleared.");
    	    $("#abw").html("ABW will appear here once all errors are cleared.");
    	    $("#bmi").html("BMI will appear here once all errors are cleared.");
    	    $("#results").removeClass("calculated");
    }
  };
  // Height change triggers
  $("#cm").change(data, function() {
    var trimmedValue = $("#cm").val().trim();
    $("#cm").val(trimmedValue);
    if (trimmedValue === "" || isNaN(trimmedValue)) {
      $("#inches").val("");
      data.generateError($("#height-warning"), data.heightNaN, data.defaultHeightWarning);
      data.setError();
    } else {
      var inches = Number(trimmedValue) / 2.54;
      $("#inches").val(String(inches));
      if (inches < 60) {
        data.generateError($("#height-warning"), data.under60Error, data.defaultHeightWarning);
        data.setError();
      } else {
        $("#height-warning").empty();
        data.calculate();
      }
    }
  });
  $("#inches").change(data,function() {
    var trimmedValue = $("#inches").val().trim();
    $("#inches").val(trimmedValue);
    if (trimmedValue === "" || isNaN(trimmedValue)) {
      $("#cm").html("");
      data.generateError($("#height-warning"),data.heightNaN,data.defaultHeightWarning);
      data.setError();
    } else {
      var inches = Number(trimmedValue);
      $("#cm").val(String(inches * 2.54));
      if (inches < 60) {
        data.generateError($("#height-warning"),data.under60Error, data.defaultHeightWarning);
    	data.setError();
      } else {
        $("#height-warning").empty();
         data.calculate();
      }
       
      
    }
    
  });
// Weight change triggers
  $("#kg").change(data,function() {
    var trimmedValue = $("#kg").val().trim();
    $("#kg").val(trimmedValue);
    if (trimmedValue === "" || isNaN(trimmedValue)) {
      $("#lbs").val("");
      data.generateError($("#weight-warning"),data.weightNaN,data.defaultWeightWarning);
      data.setError();
    } else {
      var kg = Number(trimmedValue);
      $("#lbs").val(String(2.20462 * kg));
      if (kg < 0) {
        data.generateError($("#weight-warning"), data.negativeWeightError, data.defaultWeightWarning);
        data.setError();
        
      } else {
        $("#weight-warning").html("");
        data.calculate();
      }
    }
  });
  $("#lbs").change(data,function() {
    var trimmedValue = $("#lbs").val().trim();
    $("#lbs").val(trimmedValue);
    if (trimmedValue === "" || isNaN(trimmedValue)) {
      $("#kg").val("");
      data.generateError($("#weight-warning"),data.weightNaN,data.defaultWeightWarning);
      data.setError();
      
    } else {
      var lbs = Number(trimmedValue);
      $("#kg").val(String(lbs / 2.20462));
      if (lbs < 0) {
        data.generateError($("#weight-warning"),data.negativeWeightError,data.defaultWeightWarning);
        data.setError();
      } else {
        $("#weight-warning").empty();
        data.calculate();
      }
    }
  });
  // Gender change triggers; no errors generated here
  $("#male,#female").change(data, function() {
    data.calculate();
  });
  // Reset button trigger
  $("#reset").click(data,function() {
    data.reset();
  });
  
  

});