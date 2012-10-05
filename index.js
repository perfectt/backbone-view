
/**
 * Dependencies
 */

var Backbone = require('backbone')
  , _ = require('lodash');

/**
 * Export extended view
 */

module.exports = Backbone.View.extend({

  /**
   * Setup, called on initialize
   */

  setup: function() {
    this.views = {};
    this.rendered = false;
    this.on('renderedStateChange', function(rendered) {
      this.rendered = rendered;
      this.onRenderedStateChange(rendered);
      
      _.each(this.views, function(view, key) {
        view.trigger('renderedStateChange', rendered);
      });

      if (rendered) {
        this.delegateEvents();
      } else {
        this.remove();
      }
    }, this);
  }

  /**
   * Empty rendered state change function
   */

, onRenderedStateChange: function(rendered) {
    return this;
  }

  /**
   * Destroy a view
   */

, destroy: function() {
    this.trigger('renderedStateChange', false);

    if (this.collection) this.collection.off(null, null, this);
    if (this.model) this.model.off(null, null, this);

    _.each(this.views, function(view) {
      view.destroy();
    });
  }

});
