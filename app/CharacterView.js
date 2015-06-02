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
    template: _.template(''
        + '<div class="hh-character-inner">'
        + '<div class="hh-meaning-pinyin-container">'
        + '<div class="hh-meaning"></div>'
        + '<div class="hh-pinyin"></div>'
        + '<div class="hh-audio"></div>'
        + '</div>'
        + '<div class="hh-components-container">'
        + '<div class="hh-component-region hh-left-component"></div>'
        + '<div class="hh-component-region hh-right-component"></div>'
        + '</div>'
        + '</div>'
        + ''
    ),

    regions: {
        left: '.hh-left-component',
        right: '.hh-right-component'
    },

    ui: {
        $meaning: '.hh-meaning',
        $pinyin: '.hh-pinyin',
        $audio: '.hh-audio'
    },

    onRender: function() {
        this.$el.addClass('hh-character');

        // Set id on el if model has id.
        if (this.model.id) {
            this.$el.attr('data-id', this.model.id);
        }

        this.ui.$meaning.html(this.model.get('meaning'));
        this.ui.$pinyin.html(this.model.get('pinyin'));

        var pinyinNum = this.model.get('pinyinNumbers');
        this.ui.$audio.html(''
            + '<i class="fa fa-play-circle"></i>'
            + '<audio>'
            + '<source src="audio/' + pinyinNum + '.ogg" type="audio/ogg">'
            + '<source src="audio/' + pinyinNum + '.mp3" type="audio/mpeg">'
            + '</audio>'
        );

        this.ui.$audio.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.ui.$audio.find('audio')[0].play();
        });

        this.ui.$pinyin.html(this.model.get('audio'));


        _.each(this.model.get('components'), function(component, position) {
            var componentModel = new Backbone.Model(component);
            var componentView = new ComponentView({
                model: componentModel,
                behavior: this.options.behavior
            });
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
