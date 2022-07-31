import express from 'express';

const router = express.Router();

/* GET Home page. */
router.get('/', (req, res, next) => {
  res.render('home');
});

export default router;