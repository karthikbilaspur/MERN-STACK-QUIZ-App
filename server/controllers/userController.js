const express = require('express');
const router = express.Router();
const User = require('../models/User');
const limiter = require('../middleware/rateLimit');
const ipBlocker = require('../middleware/ipBlock');
const checkRoles = require('../middleware/rbac');
const checkPermission = require('../middleware/permission');
const checkPolicies = require('../middleware/abac');
const { cacheResult, cacheResponse } = require('../middleware/cache');
const generateDynamicPolicy = require('../middleware/dynamicPolicy');

// Require email to match regex pattern
const emailRegexPolicy = new Policy({
    name: 'email-regex-policy',
    rules: [
      {
        attribute: 'email',
        operator: 'regex',
        value: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      }
    ]
  });

  
// Create user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(204).send('User deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Admin-only route
router.get('/admin-dashboard', checkRoles('admin'), async (req, res) => {
    // ...
  });
  
  // Moderator-only route
  router.get('/moderator-dashboard', checkRoles('moderator'), async (req, res) => {
    // ...
  });
  
  // User-only route
  router.get('/user-dashboard', checkRoles('user'), async (req, res) => {
    // ...
  });

 // Route requiring 'view-users' permission
router.get('/users', checkPermission('view-users'), async (req, res) => {
    // ...
  });

 // Route requiring 'admin-policy'
router.get('/admin-dashboard', checkPolicy('admin-policy'), async (req, res) => {
    // ...
  });

  router.get('/protected-route', checkPolicy('email-regex-policy'), async (req, res) => {
    // ...
  });

  // Require all policies to pass (AND)
const policies = ['policy1', 'policy2'];
router.get('/protected-route', checkPolicies(policies, 'all'), async (req, res) => {
  // ...
});

// Require any policy to pass (OR)
router.get('/protected-route', checkPolicies(policies, 'any'), async (req, res) => {
  // ...
});

// Require first policy to pass (FIRST)
router.get('/protected-route', checkPolicies(policies, 'first'), async (req, res) => {
  // ...
});

router.get('/protected-resource/:resourceType', generateDynamicPolicy, async (req, res) => {
    // ...
  });

  router.get('/protected-resource/:resourceType', cacheResult(), generateDynamicPolicy, async (req, res) => {
    // ...
  });
  
  router.get('/protected-resource/:resourceType', cacheResult(), generateDynamicPolicy, async (req, res) => {
    // ...
  });
  
  router.use(limiter);
router.use(ipBlocker);

router.get('/protected-resource/:resourceType', cacheResult(), generateDynamicPolicy, async (req, res) => {
  // ...
});

  router.use(cacheResponse);
  
module.exports = router;