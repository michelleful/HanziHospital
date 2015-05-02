var $ = require('jquery');
var Marionette = require('./marionette-shim');

var HanziHospitalLayoutView = require('./HanziHospitalLayoutView');


var HanziHospitalApp = Marionette.Application.extend({
    initialize: function(options) {
        this.rootView = new HanziHospitalLayoutView({
            el: options.el
        });

        this.rootView.render();
    }
});

module.exports = HanziHospitalApp;
