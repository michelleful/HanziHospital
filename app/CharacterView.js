/*
 * CharacterView.js 
 * A view for showing characters in parts that
 * can be moved around.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var RadicalView = require('./RadicalView');


var CharacterView = Marionette.LayoutView.extend({
    className: 'hh-character',
    template: _.template(''
        + '<div class="hh-radical-region left-radical"></div>'
        + '<div class="hh-radical-region right-radical"></div>'
        + ''
    ),

    regions: {
        left: '.left-radical',
        right: '.right-radical'
    },

    onRender: function() {
        _.each(this.model.get('radicals'), function(radical, position) {
            var radicalModel = new Backbone.Model(radical);
            var radicalView = new RadicalView({model: radicalModel});
            this.getRegion(position).show(radicalView);
            radicalView.on('drop', this.onDrop, this)
        }, this);
    },

    onDrop: function(data) {
        console.log('onDrop', data);
        // @TODO: decorate data to define expected and received.
        this.trigger('drop', data);
    },
});

module.exports = CharacterView;
