var _ = require('underscore'),
_s = require('underscore.string');

module.exports = function (server) {
  var controller = {};


  controller.home = ['session', function (req, res) {

    var bgs = [
    {
      credit: 'wedieforbeauty'
    , img: 'http://media.virbcdn.com/cdn_images/resize_1600x1600/4b/2cf564870729150b-HelixFloorPink-LR.jpg'
    , post: 'http://www.wedieforbeauty.com/post/73601222970/helix-bec-brittain'
    },
    {
      credit: 'somewhere-in-wonderland'
    , img: 'http://distilleryimage7.ak.instagram.com/e8eb4cde5aed11e3a43912f82ce19100_7.jpg'
    , post: 'http://somewhere-in-wonderland.tumblr.com/post/68739807130/10'
    },
    {
      credit: 'sangredeltoro'
    , img: 'http://31.media.tumblr.com/1a56d1214d16e2b662f3ddb648437cb4/tumblr_mwr16sIrCh1qaoqu9o1_1280.jpg'
    , post: 'http://sangredeltoro.tumblr.com/post/67916998839'
    },
    {
      credit: 'sangredeltoro',
      img: 'http://25.media.tumblr.com/dd8d3d3a6799e5751172ec4538c861e6/tumblr_mwr18jLrd21qaoqu9o1_1280.jpg',
      post: 'http://sangredeltoro.tumblr.com/post/67917091071'
    },
    {
      credit: 'somewhere-in-wonderland',
      img: 'http://25.media.tumblr.com/d5038c4b061d27aa84907b7d56108395/tumblr_mkpal8Oh1Y1qkpfmoo1_1280.jpg',
      post: 'http://somewhere-in-wonderland.tumblr.com/post/66345642015/txgr-drawin'
    }
    ];

    res.render('pages/home', {
      bg: bgs[Math.floor(Math.random()*bgs.length)]
    });
  }];

  return controller;
};
