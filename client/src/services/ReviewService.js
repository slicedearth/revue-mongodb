import Api from '@/services/Api';

export default {
  getReviews() {
    return Api().get('api/reviews');
  },
  postReviews(reviews, token) {
    return Api().post('api/reviews', reviews, {
      headers: { 'x-auth-token': token },
    });
  },
  getReviewById(reviewId, token) {
    return Api().get(`api/reviews/${reviewId}`, {
      headers: { 'x-auth-token': token },
    });
  },
  getReviewDataById(reviewId, token) {
    return Api().get(`api/reviews/data/${reviewId}`, {
      headers: { 'x-auth-token': token },
    });
  },

  putReviewById(reviewId, reviews, token) {
    return Api().put(`api/reviews/${reviewId}`, reviews, {
      headers: { 'x-auth-token': token },
    });
  },
  deleteReview(reviewId, token) {
    return Api().delete(`api/reviews/${reviewId}`, {
      headers: { 'x-auth-token': token },
    });
  },
};
