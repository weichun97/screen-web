<template>
  <a-table :columns="columns" :data-source="data">
    <span slot="name" slot-scope="text">{{ text }}</span>
    <span slot="action" slot-scope="text, record">
      <a target="_blank" :href="record.url">预览</a>
      <a-divider type="vertical" />
      <a>更新</a>
      <a-divider type="vertical" />
      <a>删除</a>
      <a-divider type="vertical" />
    </span>
  </a-table>
</template>

<script>
import { $deviceApi } from "@/api/device.js";

const columns = [
  {
    title: "设备名",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "url地址",
    dataIndex: "url",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "home",
  data() {
    return {
      data: [],
      columns,
    };
  },
  created() {
    this.page();
  },
  methods: {
    page() {
      var _this = this;
      $deviceApi.page(this.param).then((response) => {
        console.log(response.data);
        _this.data = response.data.data.records;
      });
    },
  },
};
</script>
