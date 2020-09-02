<template>
  <Panel title="Welcome To ReVue!">
    <img class="homeIMG" :src="require('@/assets/undraw_happy_music_g6wc.svg')" alt />
    <p
      class="homeText text-wrap"
    >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et fuga labore veritatis repellat nobis sit harum aperiam, illum tempore officiis, illo, velit accusantium expedita sapiente nihil libero temporibus neque ab animi provident in inventore molestiae consectetur? Vel ullam, labore alias enim blanditiis qui adipisci voluptatem repudiandae, nesciunt sit aspernatur ratione voluptates accusantium earum, impedit quia officia necessitatibus doloribus tempora? Ullam facere explicabo libero ad? Distinctio, ex? Error reprehenderit provident vero ducimus corporis fuga non, maxime molestias soluta nemo corrupti odit repellendus, nisi, deleniti aperiam. Ipsa neque enim maxime, odio doloremque voluptates nulla at repellat. Excepturi velit assumenda ipsam accusantium eius. Doloribus repudiandae magni adipisci consectetur sint at assumenda nulla velit totam pariatur molestias, distinctio magnam non maiores officia doloremque vel beatae blanditiis sapiente natus dolorum laudantium id perspiciatis? Iure quam neque voluptate fugit eveniet accusantium totam reprehenderit tenetur. Modi magni placeat magnam, possimus dolores in neque eaque sunt fugiat eum? Earum, dolore consectetur sapiente officia inventore laboriosam architecto ab vel aut voluptates, aperiam aliquam fuga qui? Eos repellat suscipit nostrum eius modi, a sit reiciendis ad mollitia dolore possimus exercitationem labore dolor voluptates, accusantium placeat blanditiis quo sunt maiores, aut iusto. Commodi neque ab rerum, voluptates, quidem, laudantium soluta harum earum tempora consequatur accusantium! Aut excepturi aliquid eveniet asperiores perspiciatis praesentium et corporis eaque, quae nobis, porro recusandae dolor deleniti dolorem odit laborum quibusdam reiciendis ipsum, vel obcaecati! Id hic quis animi consectetur illo placeat eius consequatur sit facilis ad illum accusantium est dolorem vel, ratione ex dolores repellat quas eos commodi minus, voluptatem officia cumque. Consectetur nulla dicta sed ipsam, earum dolor dolore totam officia reprehenderit voluptate officiis commodi eveniet ea, quis repellat amet distinctio similique enim! Dolores dicta aspernatur cum aliquam accusantium itaque error! Cupiditate odit rerum error aspernatur nobis beatae iure voluptate voluptatem debitis magnam ex magni, sed odio facere soluta veritatis dolorum, quasi modi saepe necessitatibus labore, sunt nesciunt laudantium distinctio! Sunt, optio, corrupti deserunt magnam totam nihil reprehenderit id assumenda, veritatis ipsam ipsum eos dignissimos sapiente quo! Quis fugit repellat, asperiores, modi vel minus, quisquam perferendis rerum soluta accusamus sapiente tempore laboriosam adipisci dolores magnam!</p>
  </Panel>
</template>

<script>
import Panel from "@/components/layout/Panel";
export default {
  name: "Home",
  components: {
    Panel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homeHead {
  padding: 1rem;
  margin: 0px;
}
.homeText {
  padding: 2rem;
}
.homeIMG {
  max-width: 50vw;
}
</style>
