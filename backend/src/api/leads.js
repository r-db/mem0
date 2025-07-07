const router = require('express').Router();

// Import our new services
const CrmService = require('../services/CrmService');
const NotificationService = require('../services/NotificationService');

// This route handles POST requests to /api/leads
router.post('/', async (req, res) => {
  try {
    const leadData = req.body;
    console.log('[API] Received new lead submission:', leadData);

    // Step 1: Use the CrmService to create the lead.
    const newLead = CrmService.createLead(leadData);

    // Step 2: Use the NotificationService to send an email.
    // We use 'await' because sending an email is an asynchronous operation.
    await NotificationService.sendNewLeadNotification(newLead);

    // Step 3: Send a success response back to the frontend.
    res.status(201).json({ 
      message: 'Lead received and processed successfully.',
      data: newLead 
    });

  } catch (error) {
    // If anything goes wrong in our services, we'll catch the error here.
    console.error('[API] Error processing lead:', error);

    // Send a generic error message back to the frontend.
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
});

module.exports = router;
