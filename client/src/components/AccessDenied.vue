<template>
  <Panel title="Access Denied">
    <img class="accessDeniedIMG" :src="require('@/assets/undraw_cancel_u1it.svg')" alt />
  </Panel>
</template>

<script>
import Panel from "@/components/layout/Panel";
export default {
  name: "AccessDenied",
  components: {
    Panel
  }
};
</script>

<style scoped>
.accessDeniedIMG {
  max-width: 50vw;
}
</style>
