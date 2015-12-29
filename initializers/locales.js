/***************************************************************************************
 {APEX LEGAL HEADER}
 ---------------------
 Filename: locales.js
 Purpose:
 Authors: Bob Calco <bob.calco@apexdatasolutions.net>
 Created by bobcalco on 12/25/15
 **************************************************************************************/
var i18n = require('i18n');
var path = require('path');
var fs = require('fs');

module.exports = {
  loadPriority: 0,
  initialize : function(api, next) {
    api.locales = {};

    // Kind of a stupid assumption on i18n's part, but this will allow us to set
    // (and configure) our default strings.
    api.locales.headers = {};
    api.locales.headers["accept-language"] = 'en';

    var preferredDir = path.resolve(process.cwd() + "/locales");
    if (!fs.existsSync(preferredDir)){
      preferredDir = path.resolve(__dirname + './../locales');
    }

    i18n.configure({
      directory: preferredDir,
      defaultLocale: 'en',
      // setting of log level DEBUG - default to require('debug')('i18n:debug')
      logDebugFn: function (msg) {
        console.log('debug', msg);
      },

      // setting of log level WARN - default to require('debug')('i18n:warn')
      logWarnFn: function (msg) {
        console.log('warn', msg);
      },

      // setting of log level ERROR - default to require('debug')('i18n:error')
      logErrorFn: function (msg) {
        console.log('error', msg);
      }
    });
    i18n.init(api.locales);
    process.nextTick(next);
  }
};