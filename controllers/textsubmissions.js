const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const methodOverride = require('method-override');


router.get('/',(req, res)=>{
    res.render('auth/translate')
})

// POST /articles - create a new post
router.post('auth/translate', (req,res)=>{
    const request = require('request');
    db.textSubmission.findOrCreate({
                where:{title:req.body.title},
                defaults: {
                    content:req.body.translate,
                    userId: req.body.user,
                    createdAt: new Date(),
                    updatedAt: new Date()
                    // translation: JSON.parse(req.body)
            }
        })
.then(([createdTextSubmission, wasCreated])=>{
  if (wasCreated) {
    res.redirect('auth/translate')
  }else {
    res.status(response.statusCode).end();
    console.log('error = ' + response.statusCode);
    }
})
.catch((error)=>{
    res.status(400).render('main/404')
})
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
    db.author.findAll()
    .then((authors) => {
      res.render('articles/new', { authors: authors })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })
// router.post('/translate', (req, res)=>{
//     const client_id = 'ouzOZBrOLS4ZiPoYx90i';
//     const client_secret = 'FOdpVkSxFj';
//     const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
//     const request = require('request');
//     const preLanguage = req.body.preLanguage
//     const postLanguage = req.body.postLanguage
//     const translate = req.body.translate
//     const options = {
//         url: api_url,
//         form: {'source': JSON.parse(prelanguage), 'target': JSON.parse(postLangauge), 'text':JSON.parse(translate),
//         headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//          }
//      }
//     db.textSubmission.findOrCreate({
//         where:{title:req.body.title},
//         defaults: {
//             content:req.body.translate,
//             // translation: JSON.parse(req.body)
//         }
//     })
//     .then(([createdTextSubmission, wasCreated])=>{
//         if (wasCreated) {
//             // router.post(options, function (error, response, body) {
//             //          if (!error && response.statusCode == 200) {
//             //             res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//             //            res.end(body);
//             //          } else {
//             //            res.status(response.statusCode).end();
//             //            console.log('error = ' + response.statusCode);
//             //          }
//             //        });
//             res.redirect('auth/translate')
//         }
// })

// })

// router.get('/translate', function (req, res) {
//    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
//    const request = require('request');
//    const options = {
//        url: api_url,
//        form: {'source':'en', 'target':'ko', 'text':query},
//        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//     };
//    router.post(options, function (error, response, body) {
//      if (!error && response.statusCode == 200) {
//        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//        res.end(body);
//      } else {
//        res.status(response.statusCode).end();
//        console.log('error = ' + response.statusCode);
//      }
//    });
//  }); 
module.exports = router