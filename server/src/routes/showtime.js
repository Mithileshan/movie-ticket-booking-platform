const express = require('express');
const auth = require('../middlewares/auth');
const Showtime = require('../models/showtime');

const router = new express.Router();

/**
 * @swagger
 * /api/showtimes:
 *   post:
 *     summary: Create a new showtime (Admin only)
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Showtime'
 *     responses:
 *       201:
 *         description: Showtime created successfully
 * 
 *   get:
 *     summary: Get all showtimes with filters
 *     tags: [Showtimes]
 *     parameters:
 *       - in: query
 *         name: movieId
 *         schema:
 *           type: string
 *         description: Filter by movie ID
 *       - in: query
 *         name: cinemaId
 *         schema:
 *           type: string
 *         description: Filter by cinema ID
 *     responses:
 *       200:
 *         description: List of showtimes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Showtime'
 * 
 * /api/showtimes/{id}:
 *   get:
 *     summary: Get showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Showtime details
 */

// Create a showtime
router.post('/showtimes', auth.enhance, async (req, res) => {
  const showtime = new Showtime(req.body);
  try {
    await showtime.save();
    res.status(201).send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all showtimes
router.get('/showtimes', async (req, res) => {
  try {
    const showtimes = await Showtime.find({});
    res.send(showtimes);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get showtime by id
router.get('/showtimes/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findById(_id);
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update showtime by id
router.patch('/showtimes/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['startAt', 'startDate', 'endDate', 'movieId', 'cinemaId'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const showtime = await Showtime.findById(_id);
    updates.forEach((update) => (showtime[update] = req.body[update]));
    await showtime.save();
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete showtime by id
router.delete('/showtimes/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findByIdAndDelete(_id);
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;
