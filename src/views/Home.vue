<template>
  <iframe id="iframe" :src="src" height="1000" width="100%"></iframe>
</template>

<script>
import { $deviceApi } from "@/api/device.js";
import { getQueryString } from "@/util/utils.js";

export default {
  name: "home",
  data() {
    return {
      src: "",
    };
  },
  created() {
    this.getUrl();
    setInterval(() => {
      this.getUrl();
    }, 2000);
  },
  methods: {
    getUrl() {
      let id = getQueryString('id');
      $deviceApi.detail(id).then((response) => {
        this.src = response.data.url;
      });
    },
  },
};
</script>
<style>
#iframe {
  width: 100%;
  height: 100%;
  border-width: 0px;
}
</style>