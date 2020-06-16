<template>
  <div v-if="review">
    <div class="row">
      <div class="col-md-12 text-center">
        <router-link
          v-if="$store.state.isUserLoggedIn"
          :to="'/reviews/' + review._id + '/edit'"
          class="w-50 btn btn-success mx-auto my-3"
        >
          <i class="fa fa-pencil" aria-hidden="true"></i>Edit
        </router-link>
      </div>
      <div class="col-md-12 text-center">
        <b-button
          v-if="$store.state.isUserLoggedIn"
          @click="delRev"
          class="btn btn-secondary w-50 mx-auto p-3"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete
        </b-button>
      </div>
    </div>
    <!-- Review -->
    <div class="row p-5">
      <div class="col-md-12">
        <!-- <img
          :src="review.albumArt"
          :alt="review.reviewTitle"
          class="img-fluid rounded shadow"
          style="max-width:80%"
        /> -->
      </div>
      <!-- <div class="col-md-12 mt-3">
        <b>By:</b>
        {{ review.reviewAuthor }}
      </div> -->
      <div class="col-md-12 mt-3">
        <b>Album:</b>
        {{ review.album.title }}
        <b>Artist:</b>
        {{ review.album.artist.name }}
      </div>
      <div class="col-md-12 my-3">
        <p class="mt-2">{{ review.reviewText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewService from '@/services/ReviewService';
export default {
  name: 'Review',
  data() {
    return {
      review: null,
    };
  },
  methods: {
    async delRev() {
      try {
        // eslint-disable-next-line
        console.log('delete');
        this.review = await ReviewService.deleteReview(
          this.review._id,
          this.$store.state.token
        );
        this.review = null;
        // eslint-disable-next-line
        console.log('remove');
        this.$router.push({
          name: 'Reviews',
        });
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    },
  },

  async mounted() {
    try {
      const reviewId = this.$store.state.route.params.reviewId;
      this.review = (await ReviewService.getReviewById(reviewId)).data;
      // 404 Redirect
      if (this.review == '') {
        return this.$router.push('/404');
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  },
};
</script>

<style></style>
