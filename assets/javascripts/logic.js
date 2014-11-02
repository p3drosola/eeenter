(function (global) {

  var e = global.e = {};

  e.config = {
    page_size: 20,
    supported_post_types: ['text', 'photo', 'quote', 'link', 'video']
  };

  e.state = {
    page: 0,
    posts: Immutable.OrderedMap(),
    fetching: false
  };

  e.supportsPost = function (post) {
    return e.config.supported_post_types.indexOf(post.type) !== -1;
  };

  e.fetch = function () {
    var url;

    if (e.state.fetching) return;
    e.state.fetching = true;

    url = '/dashboard/posts?offset=' + e.state.posts.size;

    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.onload = e.onFetch;
  };

  e.onFetch = function () {
    e.state.fetching = false;
    var json = JSON.parse(this.response);
    json = json.filter(e.supportsPost);

    e.state.posts.withMutations(function (posts) {
      json.forEach(function (post) {
        var map = Immutable.fromJS(post);
        posts.set('p' + map.get('id'), map);
      });
    });

    e.render();
  };

  e.onScroll = function (event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      e.fetch();
    }
  }

  e.render = function () {
    React.render(React.createElement(e.ui.PostList, e.state), e.body);
  }

  document.addEventListener('DOMContentLoaded', function() {
    e.body = document.getElementsByTagName('body')[0];
    e.render();
    window.addEventListener('scroll', e.onScroll);
  });

  e.fetch();

}(this))

