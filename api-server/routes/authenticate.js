"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex, jwt, app) => {

  router.get('/', function(req, res, next) {
    let token = req.headers['x-access-token'];
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        res.json({ success: true, message: 'You are good to go' })
        next();
      }
    });
  })

  router.post('/', function(req, res) {
    knex
      .select("*")
      .from("nurses")
      .where(
        knex.raw('LOWER("first_name") = ?', req.body.first_name.toLowerCase())
      )
      .andWhere(
        knex.raw('LOWER("last_name") = ?', req.body.last_name.toLowerCase())
      )
      .then((results) => {
        const passwordString = results[0].password;
        let passwordMatch = bcrypt.compareSync(req.body.password, passwordString);

        if (!results[0]) {
          console.log('No Nurse Found');
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else {
          if (!passwordMatch) {
            console.log('Nurse Found, but password does not match');
            res.json({ success: false, message: 'Authentication failed. Password does not match.' });
          }
          else {
            if (passwordMatch) {
              const token = jwt.sign(results[0], app.get('superSecret'), {
                // expiresIn: 1440 // expires in 24 hours
              });

              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              });
            }
          }
        }
      });
  });
 return router;
}
