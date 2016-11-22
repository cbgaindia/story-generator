"use strict";
var React      = require("react"),
    ReactShare = require("react-share");

var ShareButtons = ReactShare.ShareButtons;
var FacebookShareButton = ShareButtons.FacebookShareButton;
var TwitterShareButton = ShareButtons.TwitterShareButton;
var GooglePlusShareButton = ShareButtons.GooglePlusShareButton;

var generateShareIcon = ReactShare.generateShareIcon;
var FacebookIcon = generateShareIcon('facebook');
var TwitterIcon = generateShareIcon('twitter');
var GooglePlusIcon = generateShareIcon('google');

var url = window.location.href;
var title = "Online Budget Analysis Tool";

var tempArray = url.split("#");
var embedString = "#/embed";
var embedUrl = tempArray[0] + embedString + tempArray[1];

var Template = function(self){
  return (
    <div>
      <div className="report-footer">
        <div className="report-footer-right">
          <div className="report-footer-item">
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Share <span className="caret"></span>
              </button>
              <ul className="dropdown-menu report-footer-item-share">
                <li>
                  <TwitterShareButton
                    url={url}
                    title={title}>
                    <TwitterIcon
                      size={32}
                      round />
                  </TwitterShareButton>
                </li>
                <li>
                  <FacebookShareButton
                    url={url}
                    title={title}>
                    <FacebookIcon
                      size={32}
                      round />
                  </FacebookShareButton>
                </li>
                <li>
                  <GooglePlusShareButton
                    url={url}
                    title={title}>
                    <GooglePlusIcon
                      size={32}
                      round />
                  </GooglePlusShareButton>
                </li>
              </ul>
            </div>
          </div>
          <div className="report-footer-item" onClick={(event) => self.onDownload()}>
            <button type="button" className="btn btn-default">Download</button>;
          </div>
          <div className="report-footer-item" data-toggle="modal" data-target="#embed">
            <button type="button" className="btn btn-default">Embed</button>;
          </div>
        </div>
      </div>
      <div className="modal fade" id="embed" tabindex="-1" role="dialog" aria-labelledby="embed">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="embedLabel">Embed Url</h4>
            </div>
            <div className="modal-body">
              <textarea className="embed-url" value={embedUrl} autofocus></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = Template;