'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Get all requests
  router.get('/', (req, res) => {
    knex
      .select('requests.id as request_id',
       'requests.bed_id',
       'patients.id as patient_id',
       'requests.nurse_id AS nurse_id',
       'status_id', 'request_type_id',
       'patients.first_name',
       'patients.last_name',
       'nurses.image',
       'nurses.first_name AS nurse_first_name',
       'nurses.last_name AS nurse_last_name',
       'requests.created_at',
       'requests.updated_at')
      .orderBy('requests.created_at')
      .from('requests')
      .join('patients', function(){
        this.on('patients.id', '=', 'requests.patient_id')
      })
      .leftJoin('nurses', 'requests.nurse_id', 'nurses.id')
      .then((results) => {
        res.json(results);
    });
  });

  //Create a new request
  router.post('/', (req, res) => {
    knex('requests').insert({
      bed_id: req.body.bed_id,
      patient_id: req.body.patient_id,
      status_id: 1,
      nurse_id: req.body.nurse_id,
      request_type_id: req.body.request_type_id,
      description: req.body.description,
      created_at: 'now',
      updated_at: 'now'
    }).returning('id')
      .then((results) => {
        res.status(200).send(results);
    }).catch(function(err) {
        console.error(err);
    });
  });

  //Get a specific request by id
  router.get('/:id', (req, res) => {
    knex
       .select(
       'requests.id AS request_id',
       'requests.bed_id',
       'status_id',
       'request_type_id',
       'nurses.image',
       'nurses.first_name',
       'nurses.last_name',
       'requests.created_at',
       'requests.updated_at')
      .from('requests')
      .where('requests.id', req.params.id)
      .join('nurses', 'requests.nurse_id', 'nurses.id')
      .then((results) => {
        res.json(results);
      });
  });

  //Update a request status ie. pending -> complete
  router.put('/:id', (req, res) => {
    console.log(req.body);
    knex('requests')
      .where('id', req.params.id)
      .update({
        'nurse_id': req.body.nurse_id,
        'status_id': req.body.status_id,
        'updated_at': 'now'
      })
      .then((results) => {
        res.json(results);
      }).catch(function(err) {
          console.error(err);
      });
  });
  return router;
}
