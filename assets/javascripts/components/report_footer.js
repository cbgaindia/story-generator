"use strict";

var React      = require("react"),
    DOMToImage = require("dom-to-image");

var ReportFooterTemplate = require("../templates/components/report_footer.jsx");

var ReportFooter = React.createClass({

  onDownload: function () {
    var report = document.querySelector("#main-container > div > div.content > div.content-body");
    var saveReport = function(blob,name){
      var url = URL.createObjectURL(blob);

      // Test for download link support
      if( "download" in document.createElement("a") ){

        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", name);

        // Create Click event
        var clickEvent = document.createEvent ("MouseEvent");
        clickEvent.initMouseEvent ("click", true, true, window, 0, 
          clickEvent.screenX, clickEvent.screenY, clickEvent.clientX, clickEvent.clientY, 
          clickEvent.ctrlKey, clickEvent.altKey, clickEvent.shiftKey, clickEvent.metaKey, 
          0, null);

        // dispatch click event to simulate download
        a.dispatchEvent (clickEvent);

      }
      else{
        // fallover, open resource in new tab.
        window.open(url, "_blank", "");
      }
    };
    DOMToImage.toBlob(report)
    .then(function (blob) {
        saveReport(blob, "report.png");
    });
  },

  render: function () {
    return ReportFooterTemplate(this);
  }
})

module.exports = ReportFooter; 