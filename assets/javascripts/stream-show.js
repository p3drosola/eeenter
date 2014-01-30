$(function () {

  var stream = {};

  stream.initalize = function () {
    stream.setMargins();
    $(window).on('resize', stream.setMargins);
    $(document).on('click', '.main-stream img', stream.showImage);
    $(document).on('click', '.show-image-bg', stream.hideImage);
  };


  stream.setMargins = _.debounce(function () {
    var window_height = $(window).height();
    $('.main-stream img').each(function () {
      var h = (window_height - $(this).height()) / 3;
      if (h < 20) {
        h = 20;
      }
      $(this).css({margin: h + 'px 0 ' + h + 'px 0'});
    });
  }, 500);

  stream.showImage = function () {
    var src = $(this).attr('src'),
    post = JSON.parse($(this).attr('data-post')),
    bg = $('<div>', {
      'class': 'show-image-bg',
      style: 'background-image: url(' + src + ')'
    }),
    tags = _.map(post.tags, function (tag) {return '#' + tag; }),
    info = "<div class='show-image-info'>" +
              "<div class='show-image-info--blog'><a target='_blank' href='" + post.post_url + "'>" +
                post.blog_name +
              "</a></div>" +
              "<div class='show-image-info--caption'>" + post.caption + "</div>" +
              "<div class='show-image-info--tags'>" + tags.join(', ') + "</div>" +
            "</div>";


    $('body').prepend(info).prepend(bg);

  };

  stream.hideImage = function () {
    $('.show-image-info, .show-image-bg').remove();
  };

  return stream.initalize;

}());
