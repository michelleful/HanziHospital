var $ = require('jquery');

require('./styles/app.less');
var HanziHospitalApp = require('./HanziHospitalApp.js');


var $appEl = $('<div id="hanzi-hospital-app"></div>');
$appEl.appendTo(document.body);

var data = {};

var app = new HanziHospitalApp({
    el: $appEl, 
    data: data,
});
app.start();

console.log('app:', app);
