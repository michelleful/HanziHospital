var $ = require('jquery');
var Marionette = require('./marionette-shim');

var HanziHospitalView = require('./HanziHospitalView');


var HanziHospitalApp = Marionette.Application.extend({
    initialize: function(options) {
        this.rootView = new HanziHospitalView({
            el: options.el
        });

        this.rootView.render();
    }
});

module.exports = HanziHospitalApp;
