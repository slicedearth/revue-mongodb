<template>
  <b-card class="text-center shadow-lg bg-light border-0 rounded-0">
    <h1 class="text-prime m-o border-0 rounded-0">{{title}}</h1>
    <slot></slot>
  </b-card>
</template>

<script>
export default {
  name: "Panel",
  props: ["title"]
};
</script>

<style>
.text-prime {
  color: #5b8c89;
}
</style>