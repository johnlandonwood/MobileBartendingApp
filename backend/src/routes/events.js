import express from "express";

import Event from '../models/eventModel.js';

import { query, body, validationResult } from "express-validator";

const router = express.Router();


const eventCreateRules = [
    body('name').trim().escape().notEmpty().withMessage('Event name is required'),
    body('host').trim().escape().notEmpty().withMessage('Host is required'),
    body('start_time').trim().notEmpty().withMessage('Start time is required').isISO8601().toDate(),
    body('end_time').trim().notEmpty().withMessage('End time is required').isISO8601().toDate(),
    body('open_bar').optional().toBoolean(),
    body('public_event').optional().toBoolean(),
    body('location.*').trim().isFloat().withMessage('Location coordinates must be valid numbers'),
    body('location')
      .custom((value) => Array.isArray(value) && value.length === 2)
      .withMessage('Location must be an array of two elements: [longitude, latitude]'),
];


router.post('/events', eventCreateRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {
      name,
      host,
      date_of_event,
      start_time,
      end_time,
      open_bar,
      public_event,
      location
    } = req.body;
  
    const newEvent = new Event({
      name,
      host,
      date_of_event,
      start_time,
      end_time,
      open_bar,
      public_event,
      location
    });
  
    try {
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(500).json({ message: 'Error creating event', error: error });
    }
  });
  


const eventFilterRules = [
    query('name').optional().trim().escape(),
    query('host').optional().trim().escape(),
    query('start_time').optional().trim().isISO8601().toDate(),
    query('end_time').optional().trim().isISO8601().toDate(),
    query('open_bar').optional().toBoolean(),
    query('public_event').optional().toBoolean(),
    query('longitude').optional().isFloat().toFloat(),
    query('latitude').optional().isFloat().toFloat(),
    query('maxDistance').optional().isFloat({ min: 0 }).toFloat()
  ];


router.get("/events", eventFilterRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
        name,
        host,
        date_of_event,
        start_time,
        end_time,
        open_bar,
        public_event,
        page = 1,
        limit = 10,
        latitude,
        longitude,
        maxDistance
    } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    
    const filter = {};

    if (name) filter.name = name;
    if (host) filter.host = host;
    if (date_of_event) filter.date_of_event = date_of_event;
    if (start_time) filter.start_time = { $gte: start_time };
    if (end_time) filter.end_time = { $lte: end_time };
    if (typeof open_bar !== 'undefined') filter.open_bar = open_bar;
    if (typeof public_event !== 'undefined') filter.public_event = public_event;

    if (latitude && longitude) {
        filter.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            ...(maxDistance && { $maxDistance: maxDistance })
          }
        };
      }

    try {
        const events = await Event.find(filter)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error });
    }
});


export { router as eventRoutes };


//get all events bartender is working
//get all events admin's bartending co has
//get all events user has liked

//update event details
//check if user updating is admin


//archive event --> update archived to true

//delete event -> update deleted to true && archive to true if not already true
