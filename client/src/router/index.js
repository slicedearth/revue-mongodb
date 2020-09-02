import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Reviews from '@/components/Reviews';
import Review from '@/components/Review';
import EditReview from '@/components/EditReview';
import CreateReview from '@/components/CreateReview';
import NotFound from '@/components/NotFound';
import AccessDenied from '@/components/AccessDenied';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews,
    },
    {
      path: '/reviews/create',
      name: 'CreateReview',
      component: CreateReview,
    },
    {
      path: '/reviews/:reviewId',
      name: 'Review',
      component: Review,
    },
    {
      path: '/reviews/:reviewId/edit',
      name: 'EditReview',
      component: EditReview,
    },
    {
      path: '/403',
      component: AccessDenied,
    },
    {
      path: '/404',
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});
