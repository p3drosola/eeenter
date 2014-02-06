(function (global) {

  var eeenter, div, n;

  eeenter = global.eeenter = {
    posts: []
  , templates: { posts: {} }
  };

  eeenter.initialize = function () {
    eeenter.fetchPosts(eeenter.handlePosts);
    window.addEventListener('scroll', eeenter.detectScrollToBottom);

  };

  eeenter.fetchPosts = function (callback, offset) {
    var url, request;
    if (eeenter.fetching) return;
    eeenter.fetching = true;
    offset = (offset === undefined ? eeenter.posts.length : offset);
    url = '/dashboard/posts?offset=' + offset;
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.onload = function() {
      callback(JSON.parse(this.response));
      eeenter.fetching = false;
    }
    ga('send', 'event', 'fetchPosts', offset);
  }

  eeenter.handlePosts = function (posts) {
    eeenter.posts = eeenter.posts.concat(posts);
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

  eeenter.detectScrollToBottom = function(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      eeenter.fetchPosts(eeenter.handlePosts);
    }
  };

  eeenter.countNew = function (callback) {
    eeenter.fetchPosts(function (posts) {
      var n = _.map(posts, function (p) {return p.id; }),
      old = _.map(eeenter.posts, function (p) {return p.id; });
      callback(_.difference(n, old).length);
    }, 0);
  };

  // templates

  eeenter.templates.postWrapper = function (post, children) {
    return div({'class': 'post post--' + post.type, 'data-post-id': post.id}, children);
  };

  eeenter.templates.blogname = function (post) {
    return div({ 'class': 'blogname'}, [
      n('a', { href: post.post_url, target: '_blank'}, [post.blog_name])
    ]);
  };

  eeenter.templates.tags = function (post) {
    return div({'class':'tags'},
      _.map(post.tags, function (tag) {
        return '#' + tag + ' ';
      }));
  };

  eeenter.templates.posts.photo = function (post) {

    function images (photos) {
      var output = [];
      _.each(photos, function (photo) {
        var img = document.createElement('img');
        // add load listener before setting src
        img.addEventListener('load', function () {
          _.defer(function () {
            img.classList.add('is-loaded');
          })
        });
        img.src = photo.alt_sizes[0].url;
        output.push(img);
        output.push(n('br'));
      });
      return output;
    }

    return eeenter.templates.postWrapper(post, [
      div({'class': 'inner'}, images(post.photos)
        .concat(div({"class" : "details"}, [
          eeenter.templates.blogname(post),
          div({"class": "caption"}, eeenter.parseHTML(post.caption)),
          eeenter.templates.tags(post)
        ])))
    ]);
  };

  eeenter.templates.posts.text = function (post) {
    return eeenter.templates.postWrapper(post, [
      div({'class': 'inner'}, [
        eeenter.templates.blogname(post),
        div({}, eeenter.parseHTML(post.body)),
        eeenter.templates.tags(post)
        ])
    ]);
  };

  eeenter.templates.posts.link = function (post) {
    return eeenter.templates.postWrapper(post, [
      div({'class': 'inner'}, [
        eeenter.templates.blogname(post),
        n('p', {}, [
          n('a', {'class': 'post-link', href: post.url}, [post.title])
        ])]
        .concat(eeenter.parseHTML(post.description))
        .concat([eeenter.templates.tags(post)])
      )
    ]);
  };

  eeenter.templates.posts.quote = function (post) {
    return eeenter.templates.postWrapper(post, [
      div({'class': 'inner'}, [
        eeenter.templates.blogname(post),
        eeenter.parseHTML("<blockquote>" + post.text + "</blockquote")[0],
        n('p', {}, eeenter.parseHTML(post.source)),
        eeenter.templates.tags(post)
      ])
    ]);
  };

  eeenter.templates.posts.video = function (post) {
    return eeenter.templates.postWrapper(post, [
      div({'class': 'inner'}, [
        eeenter.templates.blogname(post),
        n('p', {}, eeenter.parseHTML(_.last(post.player).embed_code)),
        eeenter.templates.tags(post)
      ])
    ]);
  };

  // helpers

  eeenter.parseHTML = function(str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return _.toArray(tmp.body.children);
  };

  eeenter.appendToPage = function (dom_nodes) {
    var posts_wrapper = document.querySelector('.posts-wrapper');
    _.each(dom_nodes, posts_wrapper.appendChild.bind(posts_wrapper));
  };


  n = function(tagname, attributes, children) {
    tagname = tagname || 'div';
    attributes = attributes || {};
    children = children || [];
    var node = document.createElement(tagname);
    _.each(attributes, function (val, key) {
      node.setAttribute(key, val);
    });
    _.each(children, function (child) {
      if (_.isString(child)) {
        node.appendChild(document.createTextNode(child));
      } else {
        node.appendChild(child);
      }
    });
    return node;
  }

  div = _.partial(n, 'div');

  document.addEventListener('DOMContentLoaded', eeenter.initialize);

}(this))

