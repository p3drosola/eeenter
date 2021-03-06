(function (e) {
  e.ui = {};

  e.ui.PostList = React.createClass({
    displayName: 'PostList',
    render: function () {
      return React.DOM.div({
        className: 'main-stream'
      }, null, this.props.posts.map(function (post) {
        return React.createElement(e.ui.PostWrapper, {key: 'p' + post.id, data: post})
      }));
    }
  });

  e.ui.PostWrapper = React.createClass({
    displayName: 'PostWrapper',
    render: function () {
      console.log('render', this.props.data.id);
      var postComponent = ({
        text:  e.ui.TextPost,
        photo: e.ui.PhotoPost,
        quote: e.ui.QuotePost,
        link:  e.ui.LinkPost,
        video: e.ui.VideoPost
      })[this.props.data.type];

      return React.DOM.div({
        className: 'post post--' + this.props.data.type
      }, React.createElement(postComponent, this.props.data));
    }
  });

  e.ui.TextPost = React.createClass({
    displayName: 'TextPost',
    render: function () {

      var header = React.DOM.div({className: 'blogname'},
        React.DOM.a({href: this.props.post_url, target: '_blank'}, this.props.blog_name),
        React.DOM.span({className: 'title'}, this.props.title)
      );

      return React.DOM.div({className: 'inner'}, [
        header,
        React.DOM.div({dangerouslySetInnerHTML: {__html: this.props.body}}),
        e.ui.postTags(this.props.tags)
      ]);
    }
  });

  e.ui.PhotoPost = React.createClass({
    displayName: 'PhotoPost',
    render: function () {
      var photo_factory = React.createFactory(e.ui.Photo);
      var photos = this.props.photos.map(photo_factory); // TODO: <br>

      var details = React.DOM.div({className: 'details'}, [
        e.ui.blogName(this.props.blog_name, this.props.post_url),
        React.DOM.div({className: 'caption', dangerouslySetInnerHTML: {__html: this.props.caption}}),
        e.ui.postTags(this.props.tags)
      ])

      return React.DOM.div({className: 'inner'}, photos.concat(details));
    }
  });

  e.ui.Photo = React.createClass({
    displayName: 'Photo',
    getInitialState: function () {
      return {loaded: false};
    },
    onLoad: function () {
      this.setState({loaded: true});
    },
    render: function () {
      var loaded_class = this.state.loaded ? 'is-loaded' : '';
      return React.DOM.img({
        src: this.props.alt_sizes[0].url,
        className: loaded_class,
        onLoad: this.onLoad
      });
    }
  });

  e.ui.QuotePost = React.createClass({
    displayName: 'QuotePost',
    render: function () {
      return React.DOM.div({className: 'inner'}, [
        e.ui.blogName(this.props.blog_name, this.props.post_url),
        React.DOM.blockquote({dangerouslySetInnerHTML: {__html: this.props.text}}),
        React.DOM.p({dangerouslySetInnerHTML: {__html: this.props.source}}),
        e.ui.postTags(this.props.tags)
      ])
    }
  });

  e.ui.LinkPost = React.createClass({
    displayName: 'LinkPost',
    render: function () {
      return React.DOM.div({className: 'inner'}, [
        e.ui.blogName(this.props.blog_name, this.props.post_url),
        React.DOM.p({},
          React.DOM.a({className: 'post-link', href: this.props.url}, this.props.title)
        ),
        React.DOM.p({dangerouslySetInnerHTML: {__html: this.props.description}}),
        e.ui.postTags(this.props.tags)
      ])
    }
  });

  e.ui.VideoPost = React.createClass({
    displayName: 'VideoPost',
    render: function () {
      var player = this.props.player[this.props.player.length - 1]

      return React.DOM.div({className: 'inner'}, [
        e.ui.blogName(this.props.blog_name, this.props.post_url),
        React.DOM.p({dangerouslySetInnerHTML: {__html: player.embed_code}}),
        e.ui.postTags(this.props.tags)
      ])
    }
  });

  // dom snippets

  e.ui.blogName = function (name, url) {
    return React.DOM.div({className: 'blogname'},
      React.DOM.a({href: url, target: '_blank'}, name)
    );
  };

  e.ui.postTags = function (tags) {
    return React.DOM.div({className: 'tags'}, tags.map(function (tag) {
      return '#' + tag
    }).join(' '))
  }

})(e);
