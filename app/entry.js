var $ = require('jquery');

require('./styles/app.less');
var HanziHospitalApp = require('./HanziHospitalApp.js');


var $appEl = $('<div id="hanzi-hospital-app"></div>');
$appEl.appendTo(document.body);

// Read data from json file.
var promise = $.ajax({
    dataType: 'json',
    url: './operations.json'
})

promise.then(function(data) {
    var app = new HanziHospitalApp({
        el: $appEl, 
        operations: data,
    });
    app.start();

    console.log('app:', app);
});
