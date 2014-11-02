(function (global) {

  var e = global.e = {};

  e.config = {
    page_size: 20,
    supported_post_types: ['text', 'photo', 'quote', 'link']
  };

  e.state = {
    page: 0,
    posts: [],
    fetching: false
  };

  e.supportsPost = function (post) {
    return e.config.supported_post_types.indexOf(post.type) !== -1;
  };

  e.fetch = function () {
    var url;

    if (e.state.fetching) return;
    e.state.fetching = true;

    url = '/dashboard/posts?offset=' + e.state.posts.length;

    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.onload = e.onFetch;
    // ga('send', 'event', 'fetchPosts', e.state.posts.length);
  };

  e.onFetch = function () {
    e.state.fetching = false;
    var data = JSON.parse(this.response);
    // immutable data structures go here, avoid duplicate posts, etc
    data = data.filter(e.supportsPost);
    e.state.posts = e.state.posts.concat(data);
    e.render();
  };

  e.render = function () {
    React.render(React.createElement(e.ui.PostList, e.state), e.body);
  }

  document.addEventListener('DOMContentLoaded', function() {
    e.body = document.getElementsByTagName('body')[0];
    e.render();
  });

  e.fetch();

}(this))

