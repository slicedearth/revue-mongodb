<template>
  <footer class="primecolour position-fixed-bottom">
    <div class="">
      <a href="https://www.facebook.com">
        <i class="fa fa-facebook" aria-hidden="true"></i>
      </a>
      <a href="https://www.twitter.com">
        <i class="fa fa-twitter" aria-hidden="true"></i>
      </a>
      <a href="https://www.instagram.com">
        <i class="fa fa-instagram" aria-hidden="true"></i>
      </a>
      <a href="https://www.github.com">
        <i class="fa fa-github" aria-hidden="true"></i>
      </a>
    </div>
    &copy;&nbsp;{{ new Date().getFullYear() }}&nbsp;ReVue
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.primecolour {
  background-color: #5b8c89;
}
a i {
  color: white;
  padding: 1rem 0.25rem;
}
</style>
