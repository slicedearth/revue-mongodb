<template>
  <div v-if="review">
    <div class="row">
      <div class="col-md-12 text-center">
        <router-link
          v-if="$store.state.isUserLoggedIn"
          :to="'/reviews/' + review._id + '/edit'"
          class="w-50 btn btn-success mx-auto my-2"
        >
          <i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
        </router-link>
      </div>
      <div class="col-md-12 text-center">
        <b-button
          v-if="$store.state.isUserLoggedIn"
          @click="delRev"
          class="w-50 btn btn-secondary mx-auto my-2"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete
        </b-button>
      </div>
    </div>
    <Panel :title="review.title">
      <!-- Review -->
      <div class="row p-5">
        <div class="col-md-12">
          <div class="col-md-12 mt-3">
            <p class="text-center">
              <b>By:</b>
              {{review.author}}
            </p>
            <ul class="list-inline">
              <li class="list-inline-item">
                <b>Album:</b>
                {{ review.album.title }}
              </li>
              <li class="list-inline-item">
                <b>Artist:</b>
                {{ review.album.artist.name }}
              </li>
              <li class="list-inline-item">
                <b>Genre:</b>
                {{ review.album.genre.name}}
              </li>
              <li class="list-inline-item">
                <b>Release Date:</b>
                {{ review.album.year}}
              </li>
              <li class="list-inline-item">
                <b>Rating:</b>
                {{ review.rating }}/10
              </li>
            </ul>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div class="col-md-12 my-3">
            <p class="mt-2">{{ review.reviewText }}</p>
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import ReviewService from "@/services/ReviewService";
import Panel from "@/components/layout/Panel";
export default {
  name: "Review",
  components: {
    Panel
  },
  data() {
    return {
      review: null
    };
  },
  methods: {
    async delRev() {
      try {
        // eslint-disable-next-line
        console.log("delete");
        this.review = await ReviewService.deleteReview(
          this.review._id,
          this.$store.state.token
        );
        this.review = null;
        // eslint-disable-next-line
        console.log("remove");
        this.$router.push({
          name: "Reviews"
        });
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  },

  async mounted() {
    try {
      const reviewId = this.$store.state.route.params.reviewId;
      this.review = (await ReviewService.getReviewById(reviewId)).data;
      // 404 Redirect
      if (this.review == "") {
        return this.$router.push("/404");
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  }
};
</script>

<style></style>
