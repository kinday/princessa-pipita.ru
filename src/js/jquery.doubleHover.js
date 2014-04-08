var doubleHover = function(selector, hoverClass) {
  $(document).on('mouseover mouseout', selector, function(e) {
    var href = $(this).attr('href');

    if (href !== '#')
      $(selector)
        .filter('[href="' + href + '"]')
        .toggleClass(hoverClass, e.type == 'mouseover');
    });
};