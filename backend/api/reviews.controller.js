import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewController {
  static async apiGetReviews(req, res, next) {
    try {
      const reviewResponse = await ReviewsDAO.apiGetReviews();
      res.json({ response: reviewResponse });
    } catch (e) {
      console.error(`Unable to find documents, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

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
    const reviewResponse = await ReviewsDAO.apiAddReview(reviewObject);
    res.json({ response: reviewResponse });
    console.log(
      "🚀 ~ file: review.controller.js ~ line 19 ~ ReviewController ~ apiPostReview ~ reviewResponse",
      reviewResponse
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
      const reviewResponse = await ReviewsDAO.apiDeleteReview(reviewObject);
      res.json({ response: reviewResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const { userId, text, reviewId } = req.body;
      const date = new Date();
      const reviewObject = { reviewId, userId, text, date };
      const reviewResponse = await ReviewsDAO.apiUpdateReview(reviewObject);
      let { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        );
      }

      res.json({ response: reviewResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
