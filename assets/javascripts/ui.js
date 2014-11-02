(function (e) {
  e.ui = {};

  e.ui.PostList = React.createClass({
    render: function () {
      return React.DOM.div({
        className: 'main-stream'
      }, null, this.props.posts.map(e.ui.PostWrapper));
    }
  });

  e.ui.PostWrapper = React.createClass({
    render: function () {

      var postComponent = ({
        text:  e.ui.TextPost,
        photo: e.ui.PhotoPost,
        quote: e.ui.QuotePost,
        link:  e.ui.LinkPost
      })[this.props.type];

      return React.DOM.div({
        className: 'post post--' + this.props.type
      }, React.createElement(postComponent, this.props));
    }
  });

  e.ui.TextPost = React.createClass({
    render: function () {
      return React.DOM.div({}, this.props.blog_name);
    }
  });

  e.ui.PhotoPost = React.createClass({
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
    render: function () {
      return React.DOM.div({}, this.props.blog_name);
    }
  });

  e.ui.LinkPost = React.createClass({
    render: function () {
      return React.DOM.div({}, this.props.blog_name);
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
