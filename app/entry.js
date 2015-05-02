var $ = require('jquery');

var HanziHospitalApp = require('./HanziHospitalApp.js');


var $appEl = $('<div id="hanzi-hospital-app"></div>');
$appEl.appendTo(document.body);

var app = new HanziHospitalApp({
    el: $appEl
});
app.start();

console.log('app:', app);
