
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var onBody = require('on-body');

/**
 * Expose `GetSatisfaction` integration.
 */

var GetSatisfaction = module.exports = integration('Get Satisfaction')
  .assumesPageview()
  .global('GSFN')
  .option('widgetId', '')
  .tag('<script src="https://loader.engage.gsfn.us/loader.js">');

/**
 * Initialize.
 *
 * https://console.getsatisfaction.com/start/101022?signup=true#engage
 *
 * @param {Object} page
 */

GetSatisfaction.prototype.initialize = function(page){
  var self = this;
  var widget = this.options.widgetId;
  var div = document.createElement('div');
  var id = div.id = 'getsat-widget-' + widget;
  onBody(function(body){ body.appendChild(div); });

  // usually the snippet is sync, so wait for it before initializing the tab
  this.load(function(){
    window.GSFN.loadWidget(widget, { containerId: id });
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

GetSatisfaction.prototype.loaded = function(){
  return !! window.GSFN;
};
