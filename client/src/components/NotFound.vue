<template>
  <Panel title="Page Not Found">
    <img class="notFoundIMG" :src="require('@/assets/undraw_page_not_found_su7k.svg')" alt />
  </Panel>
</template>

<script>
import Panel from "@/components/layout/Panel";
export default {
  name: "NotFound",
  components: {
    Panel
  }
};
</script>

<style scoped>
.notFoundIMG {
  max-width: 50vw;
}
</style>