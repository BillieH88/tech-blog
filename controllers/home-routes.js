const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({})
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/signup", (req,res) => {

res.render("sign-up", { loggedIn : req.session.loggedIn});

})

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
  
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/dashboard", (req,res) => 

  Post.findAll({}).then(dbPostData => {
    const postData = dbPostData.map((post) => post.get({plain : true}));

    res.render('dashboard', {
      postData, 
      loggedIn: req.session.loggedIn
    });
  })

)

router.get("/dashboard/new", (req,res) => {
  res.render("newpost",{loggedIn: req.session.loggedIn});
})
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
