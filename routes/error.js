import express from "express";
const router = express.Router();

/* GET error page. */
router.get('/', (req, res, next) => {
  res.render('error');
});

export default router;