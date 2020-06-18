<template>
  <div>
    <Panel title="Edit Review">
      <b-form>
        <div class="row">
          <div class="col-12 mx-auto" style="max-width:75%">
            <!-- Title -->
            <b-form-group
              id="title-group"
              label="Title"
              label-for="title"
              description="Please enter the title for your review"
            >
              <b-form-input
                id="title"
                type="text"
                required
                placeholder="Enter Title"
                v-model="$v.review.title.$model"
                :state="
                  $v.review.title.$dirty
                    ? !$v.review.title.$error
                    : null
                "
                aria-describedby="title-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="title-feedback">
                This field is required and must contain between 5 and 150
                characters.
              </b-form-invalid-feedback>
            </b-form-group>
            <!-- Author -->
            <b-form-group
              id="author-group"
              label="Author"
              label-for="author"
              description="Please enter your name/username"
            >
              <b-form-input
                id="author"
                type="text"
                required
                placeholder="Enter Name/Username"
                v-model="$v.review.author.$model"
                :state="
                  $v.review.author.$dirty
                    ? !$v.review.author.$error
                    : null
                "
                aria-describedby="author-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="author-feedback">
                This field is required and must contain between 3 and 50
                alphanumeric characters.
              </b-form-invalid-feedback>
            </b-form-group>
            <!-- Album ID -->
            <b-form-group
              id="albumId-group"
              label="Album ID"
              label-for="albumId"
              description="Please enter the Album ID"
            >
              <b-form-input
                id="albumId"
                type="text"
                required
                placeholder="Enter Album ID"
                v-model="$v.review.albumId.$model"
                :state="
                  $v.review.albumId.$dirty
                    ? !$v.review.albumId.$error
                    : null
                "
                aria-describedby="albumId-feedback"
              ></b-form-input>
              <b-form-invalid-feedback
                id="albumId-feedback"
              >This field is required and must be a valid object ID</b-form-invalid-feedback>
            </b-form-group>
            <!-- Rating -->
            <b-form-group
              id="rating-group"
              label="Rating"
              label-for="rating"
              description="Please enter your rating out of 10"
            >
              <b-form-input
                id="rating"
                type="text"
                required
                placeholder="Enter Rating"
                v-model="$v.review.rating.$model"
                :state="
                  $v.review.rating.$dirty ? !$v.review.rating.$error : null
                "
                aria-describedby="rating-feedback"
              ></b-form-input>
              <b-form-invalid-feedback
                id="rating-feedback"
              >This field is required and must contain a number between 0 and 10</b-form-invalid-feedback>
            </b-form-group>
            <!-- Review Text -->
            <b-form-group
              id="reviewText-group"
              label="Review Text"
              label-for="review-text"
              description="Please enter your review"
            >
              <b-form-textarea
                id="review-text"
                type="text"
                required
                placeholder="Enter Review"
                rows="10"
                max-rows="15"
                v-model="$v.review.reviewText.$model"
                :state="
                  $v.review.reviewText.$dirty
                    ? !$v.review.reviewText.$error
                    : null
                "
                aria-describedby="reviewText-feedback"
              ></b-form-textarea>
              <b-form-invalid-feedback
                id="reviewText-feedback"
              >This field is required and must contain between 15 and 2000 characters.</b-form-invalid-feedback>
            </b-form-group>
            <div class="col-12">
              <b-button @click="save" class="w-100">Submit</b-button>
            </div>
          </div>
        </div>
      </b-form>
    </Panel>
  </div>
</template>

<script>
import ReviewService from "@/services/ReviewService";
import Panel from "@/components/layout/Panel";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  minValue,
  maxValue
} from "vuelidate/lib/validators";
export default {
  name: "EditReview",
  components: {
    Panel
  },
  data() {
    return {
      review: {
        title: null,
        author: null,
        albumId: null,
        rating: null,
        reviewText: null
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    review: {
      title: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(255)
      },
      author: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(50)
      },
      albumId: {
        required
      },
      rating: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(10)
      },
      reviewText: {
        required,
        minLength: minLength(15),
        maxLength: maxLength(2000)
      }
    }
  },
  methods: {
    async save() {
      this.$v.review.$touch();
      if (this.$v.review.$anyError) {
        return;
      }
      try {
        console.log(this.review);
        await ReviewService.putReviewById(
          this.$store.state.route.params.reviewId,
          this.review,
          this.$store.state.token
        );
        this.$router.push({
          name: "Review",
          params: {
            reviewId: this.$store.state.route.params.reviewId
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    try {
      const reviewId = this.$store.state.route.params.reviewId;
      this.review = (await ReviewService.getReviewDataById(reviewId)).data;
      console.log(this.review.album);
      // console.log(this.review.albumId);
      // 404 Redirect
      if (this.review == "") {
        return this.$router.push("/404");
      }
      // Authentication Redirect
      if (!this.$store.state.isUserLoggedIn) {
        return this.$router.push("/403");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style>
</style>