/*
 * ComponentView.js 
 * A view for showing an indiviaul component,
 * with various behaviors.
 */

var $ = require('jquery');
require('./jquery-ui-shim');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var ComponentView = Marionette.ItemView.extend({
    className: 'hh-component',

    template: _.template('<div class="container"></div>'),

    ui: {
        container: '.container'
    },

    onRender: function() {

        var behavior = this.model.get('behavior');

        // Set svg.
        this.$svg = $(this.model.get('svg'));
        this.$svg.attr('data-component', this.model.get('component'));
        if (behavior == 'sink') {
            this.$svg.css('opacity', 0);
        }
        this.ui.container.append(this.$svg);

        // Setup drag-and-drop behavior.
        if (behavior == 'source') {
            var $residue = this.$svg.clone();
            $residue.css({
                'opacity': .5,
                'position': 'absolute',
            });
            this.ui.container.append($residue);
            this.$svg.css('z-index', 10);
            this.$svg.draggable({
                revert: true,
            });
        } else if(behavior == 'sink') {
            var _this = this;

            this.ui.container.droppable({
                hoverClass: 'drop-hover',
                drop: function(event, ui){
                    var $draggable = ui.draggable;

                    var isCorrect = (
                        _this.model.get('component') == $draggable.data('component'));

                    if (isCorrect) {
                        $draggable.fadeOut().promise().then(() => {
                            _this.ui.container.addClass('correct');
                            _this.$svg.fadeTo('slow', 1).promise().then(function() {
                                setTimeout(function() {
                                    _this.trigger('drop', {isCorrect: isCorrect});
                                }, 500);
                            });
                        });
                    } else {
                        $draggable.parent().addClass('incorrect');
                        setTimeout(function() {
                            _this.trigger('drop', {isCorrect: isCorrect});
                        }, 1000);
                    }
                },
            });
            this.$el.addClass('sink');
        }
    },

});

module.exports = ComponentView;
