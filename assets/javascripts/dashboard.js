(function (global) {

  var eeenter = global.eeenter = {
    posts: []
  , templates: { posts: {} }
  };

  eeenter.initialize = function () {
    eeenter.fetchPosts(eeenter.handlePosts);
  };

  eeenter.fetchPosts = function (callback) {
    var url, request;
    url = '/dashboard/posts?offset=' + eeenter.posts.length + '&type=photo';
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.onload = function() {
      callback(JSON.parse(this.response));
    }
  }

  eeenter.handlePosts = function (posts) {
    eeenter.posts.concat(posts);
    var dom = _.compact(_.map(posts, function (post) {
      if (eeenter.templates.posts[post.type]) {
        return eeenter.templates.posts[post.type](post);
      } else {
        console.log('don\'t know how to format a', post.type, 'post');
        return;
      }
    }));
    eeenter.appendToPage(dom);
  };

  eeenter.templates.posts.photo= function (post) {
    var post_wrapper = document.createElement('div');
    post_wrapper.classList.add('post');
    post_wrapper.classList.add('post--photo');
    post_wrapper['data-post-id'] =  post.id;
    _.each(post.photos, function (photo) {
        var img = document.createElement('img'),
        photo_wrapper = document.createElement('div');
        photo_wrapper.classList.add("post-photo-wrapper");
        img.addEventListener('load', function () {
          _.defer(function () {
            img.classList.add('is-loaded');
          })
        });
        img.src = photo.alt_sizes[0].url;
        photo_wrapper.appendChild(img);
        post_wrapper.appendChild(photo_wrapper);
      });
    return post_wrapper;
  };

  // helpers

  eeenter.parseHTML = function(str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children;
  };

  eeenter.appendToPage = function (dom_nodes) {
    var main_stream = document.querySelector('.main-stream');
    _.each(dom_nodes, main_stream.appendChild.bind(main_stream));
  };


  document.addEventListener('DOMContentLoaded', eeenter.initialize);

}(this))

