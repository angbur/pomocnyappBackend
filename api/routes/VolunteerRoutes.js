const express = require('express');
const router = express.Router();
const VolunteerController= require('../controllers/VolunteerController')


//getting one
router.get('/:id', VolunteerController.getOneVolunteer);

// getting all
router.get('/',VolunteerController.allVolunteers);

//updating one 
router.patch('/:id', VolunteerController.updateVolunteer);

//creating 
router.post ('/', VolunteerController.createVolunteer);

// sort by category
router.get ('/category/:categoryId',VolunteerController.filterByCategory)
//getting comments to particular one
router.get ('/:id/comments',VolunteerController.getVolunteerComments);

//getting events 
router.get ('/:id/events',VolunteerController.getVolunteerEvents);


module.exports=router
