import ReviewsDAO from "./dao/reviewsDAO.js";

export default class ReviewController {
  static async apiPostReview(req, res, next) {
    const { text, restaurantId } = req.body;
    const user = {
      name: req.body.name,
      userId: req.body.userId,
    };
    const date = new Date();
    const reviewObject = {
      restaurantId,
      text,
      user,
      date,
    };
    const ReviewResponse = await ReviewsDAO.apiAddReview(reviewObject);
    res.json({ response: ReviewResponse });
    console.log(
      "🚀 ~ file: review.controller.js ~ line 19 ~ ReviewController ~ apiPostReview ~ ReviewResponse",
      ReviewResponse
    );
  }
  catch(e) {
    res.status(500).json({ error: e.message });
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const { reviewId } = req.query;
      //! not something done in real application because of authentication
      const { userId } = req.body;
      const reviewObject = { reviewId, userId };
      const ReviewResponse = await ReviewsDAO.apiDeleteReview(reviewObject);
      res.json({ response: ReviewResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const { userId, text, reviewId } = req.body;
      const date = new Date();
      const reviewObject = { reviewId, userId, text, date };
      const ReviewResponse = await ReviewsDAO.apiUpdateReview(reviewObject);
      let { error } = ReviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (ReviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        );
      }

      res.json({ response: ReviewResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
