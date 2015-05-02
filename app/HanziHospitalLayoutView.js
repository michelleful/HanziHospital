var _ = require('underscore');
var Marionette = require('./marionette-shim');


var HanziHospitalLayoutView = Marionette.LayoutView.extend({
    template: _.template('' +
        'hello hospital' +
        ''
    )
});

module.exports = HanziHospitalLayoutView;
