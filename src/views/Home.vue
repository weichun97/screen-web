<template>
  <iframe id="iframe" :src="src" height="1000" width="100%"></iframe>
</template>

<script>
import { $deviceApi } from "@/api/device.js";

export default {
  name: "home",
  data: function () {
    return {
      src: "",
    };
  },
  created: function () {
    this.getUrl();
    setInterval(() => {
      this.getUrl();
    }, 2000);
  },
  methods: {
    getUrl: function () {
      var _this = this;
      $deviceApi.detail(1).then((response) => {
        _this.src = response.data.data.url;
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