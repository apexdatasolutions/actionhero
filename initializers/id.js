var cluster = require('cluster');
var path = require('path');
var argv = require('optimist').argv;

module.exports = {
  loadPriority:  100,
  startPriority: 2,
  initialize: function(api, next){
    if(argv.title){
      api.id = argv.title;
    } else if(process.env.ACTIONHERO_TITLE){
      api.id = process.env.ACTIONHERO_TITLE;
    } else if(!api.config.general.id){
      var externalIP = api.utils.getExternalIPAddress();
      if(externalIP === false){
        var id_base = api.utils.t("ID Base");
        var message = api.utils.t("Setting ID Base to {{id_base}}", {id_base: id_base});
        try {
          api.log(message, 'crit');
        } catch(e){
          console.log(message);
        }
        externalIP = id_base;
      }

      api.id = externalIP;
      if(cluster.isWorker){ api.id += ':' + process.pid }
    } else {
      api.id = api.config.general.id;
    }

    api.actionheroVersion = require('..' + path.sep + 'package.json').version;
    
    next();
  },

  start: function(api, next){
    api.log(api.utils.t('Server ID: ') + api.id, 'notice');
    next();
  }
};