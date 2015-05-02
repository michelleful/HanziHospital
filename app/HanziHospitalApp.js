var $ = require('jquery');
require('jquery-ui');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');


var HanziHospitalApp = Marionette.Application.extend({
    initialize: function() {
        console.log('initialize');
    }
});

module.exports = HanziHospitalApp;
