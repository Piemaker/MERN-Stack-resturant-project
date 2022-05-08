import mongodb from "mongodb";

// for turning strings into mongo ids

const ObjectId = mongodb.ObjectId;
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    //* the reference can either be initialized at the time of calling, or not
    if (reviews) {
      // already initialized skip connection
      console.log("reviewsDAO, connection already established");
      return;
    }
    try {
      // connect and get restaurants collection specifically (neighborhood exists too)
      // if a collection doesn't exist. it will automatically be created
      reviews = await conn
        .db(process.env.RESTAURANT_SAMPLE)
        .collection("reviews");
    } catch (e) {
      console.error(`Unable to connect to collection in reviewsDAO ${e}`);
    }
  }
  // QUERIES

  static async apiGetReviews() {
    let reviewCursor;
    try {
      reviewCursor = await reviews.find();
    } catch (e) {
      console.error(`Error in getting reviews ${e}`);
      return { error: e };
    }

    try {
      const reviewResponse = await reviewCursor.toArray();
      const totalNumReviews = await reviews.countDocuments();
      return { reviewResponse, totalNumReviews };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
    }
  }

  static async apiAddReview({ restaurantId, user, text, date } = {}) {
    console.log("🚀 ~ file: reviewsDAO.js ~ line 49 ~ ReviewsDAO ~ apiAddReview ~ restaurantId, user, text, date", restaurantId, user, text, date)
    try {
      const reviewDoc = {
        ...user,
        date,
        text,
        restaurant_id: ObjectId(restaurantId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Error in adding review: ${e}`);
      return { error: e };
    }
  }

  static async apiUpdateReview({ reviewId, userId, text, date } = {}) {
    try {
      return await reviews.updateOne(
        { userId: userId, _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } }
      );
    } catch (e) {
      console.error(`Error in updating review: ${e}`);
      return { error: e };
    }
  }

  static async apiDeleteReview({ reviewId, userId } = {}) {
    try {
      return await reviews.deleteOne({
        userId: userId,
        _id: ObjectId(reviewId),
      });
    } catch (e) {
      console.error(`Error in deleting review: ${e}`);
      return { error: e };
    }
  }
}
