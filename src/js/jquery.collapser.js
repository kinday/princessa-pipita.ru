(function($) {

  $.fn.collapser = function() {

    return this.each(function() {

      var $this = $(this),
          button = $(document.createElement('button')).addClass('collapser__switch js-collapser__switch');

      $this.addClass('collapser is-collapsed').append(button).on('click.collapser', $.fn.collapser.toggle)

      });

    };

  $.fn.collapser.toggle = function(e) {

    $(this).toggleClass('is-collapsed').find('.js-collapser__switch').toggleClass('is-active');

    };

  })(jQuery);