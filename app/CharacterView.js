/*
 * CharacterView.js 
 * A view for showing characters in parts that
 * can be moved around.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var ComponentView = require('./ComponentView');


var CharacterView = Marionette.LayoutView.extend({
    className: 'hh-character',
    template: _.template(''
        + '<div class="hh-component-region left-component"></div>'
        + '<div class="hh-component-region right-component"></div>'
        + ''
    ),

    regions: {
        left: '.left-component',
        right: '.right-component'
    },

    onRender: function() {
        _.each(this.model.get('components'), function(component, position) {
            var componentModel = new Backbone.Model(component);
            var componentView = new ComponentView({model: componentModel});
            this.getRegion(position).show(componentView);
            componentView.on('drop', this.onDrop, this)
        }, this);
    },

    onDrop: function(data) {
        console.log('onDrop', data);
        // @TODO: decorate data to define expected and received.
        this.trigger('drop', data);
    },
});

module.exports = CharacterView;
