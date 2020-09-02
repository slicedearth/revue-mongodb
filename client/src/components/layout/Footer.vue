<template>
  <footer class="primecolour footer position-fixed-bottom text-white">
    <a class="text-reset" href="https://www.facebook.com">
      <i class="fa fa-facebook" aria-hidden="true"></i>
    </a>
    <a class="text-reset" href="https://www.twitter.com">
      <i class="fa fa-twitter" aria-hidden="true"></i>
    </a>
    <a class="text-reset" href="https://www.instagram.com">
      <i class="fa fa-instagram" aria-hidden="true"></i>
    </a>
    <a class="text-reset" href="https://www.github.com">
      <i class="fa fa-github" aria-hidden="true"></i>
    </a>
    &copy;&nbsp;{{ new Date().getFullYear() }}&nbsp;ReVue
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.primecolour {
  background-color: #536dfe;
}
a i {
  padding: 1rem 0.25rem;
}
a:hover {
  color: whitesmoke !important;
}
</style>
