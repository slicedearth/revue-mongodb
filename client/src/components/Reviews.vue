<template>
  <div>
    <div class="row mx-auto">
      <div class="col-md-12 mb-2 mx-auto" style="max-width:90%">
        <router-link
          v-if="$store.state.isUserLoggedIn"
          to="/reviews/create"
          class="btn btn-success mx-auto w-100 my-3"
          >Create Review</router-link
        >
      </div>
    </div>
    <div class="row mx-auto" style="max-width: 90%">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="review in reviews"
        :key="review.id"
      >
        <b-card :title="review.title" class="mb-2 mx-auto">
          <img :src="review.albumArt" alt class="img-fluid p-2" />
          <b-card-text>
            <span class="font-weight-bold">Album:</span>
            {{ review.album.title }}
          </b-card-text>
          <b-card-text>
            <span class="font-weight-bold">Artist:</span>
            {{ review.album.artist.name }}
          </b-card-text>
          <b-card-text>
            <span class="font-weight-bold">Rating</span>
            {{ review.rating }}/10
          </b-card-text>
          <router-link
            :to="'/reviews/' + review._id"
            class="btn btn-info d-block"
            >Full Review</router-link
          >
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewService from '@/services/ReviewService';
export default {
  name: 'Reviews',
  data() {
    return {
      reviews: '',
    };
  },
  async mounted() {
    this.reviews = (await ReviewService.getReviews()).data;
  },
};
</script>

<style></style>
