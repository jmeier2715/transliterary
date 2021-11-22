const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const methodOverride = require('method-override');


router.get('/',(req, res)=>{
    res.render('textsubmissions/translate')
})

// POST /articles - create a new post
router.post('/translate', (req,res)=>{
    const request = require('request');
    db.textSubmission.findOrCreate({
                where:{title:req.body.title},
                defaults: {
                    content:req.body.translate,
                    userId: res.locals.currentUser.id,
                    languageId: req.body.preLanguage
            }
        })
.then(([createdTextSubmission, wasCreated])=>{
  if (wasCreated) {
      console.log('testing if this is showing')
    res.redirect('textsubmissions/translate')

  }else {
    res.status(response.statusCode).end();
    console.log('error = ' + response.statusCode);
    }
})
.catch((error)=>{
    res.status(400).render('main/404')
})
})

// GET /textsubmissions/new - display form for creating new textSubmissions
router.get('/new', (req, res) => {
    db.textSubmission.findAll()
    .then((textSubmissions) => {
      res.render('textsubmissions/new', { textsubmissions: textsubmissions })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })
// router.post('/translate', (req, res)=>{

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