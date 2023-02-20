const express = require('express');
const Event = require('../../models/eventModel');

const router = express.Router();

router.post("/events", async (req, res) => {
    const event = new Event(
        {
            event_name: req.body.event_name,
            host: req.body.host,
            bartending_company: req.body.bartending_company,
            location: req.body.location,
            date_of_event: req.body.date_of_event,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            open_bar: req.body.open_bar,
            public_event: req.body.public_event
    }
    );
    await event.save();
    res.send(event);
});

//get all events bartender is working
//get all events admin's bartending co has
//get all events user has liked

//update event details
//check if user updating is admin


//archive event --> update archived to true

//delete event -> update deleted to true && archive to true if not already true