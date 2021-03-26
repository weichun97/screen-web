<template>
  <div>
    <a-row>
      <a-col :span="2">
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="showModal(null, COMMON.ADD)"
        >
          新增
        </a-button>
      </a-col>
    </a-row>

    <a-table
      :columns="columns"
      :data-source="data"
      :rowKey="(record) => record.id"
    >
      <span slot="name" slot-scope="text">{{ text }}</span>
      <span slot="action" slot-scope="record">
        <a target="_blank" @click="previewUrl(record)">预览</a>
        <a-divider type="vertical" />
        <a @click="showModal(record, COMMON.EDIT)">更新</a>
        <a-divider type="vertical" />
        <a @click="deleteById(record.id)">删除</a>
        <a-divider type="vertical" />
      </span>
    </a-table>

    <!-- 弹框 -->
    <a-modal v-model="visible" title="Title" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> 取消 </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          提交
        </a-button>
      </template>

      <a-form :form="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="设备名">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入设备名' }],
              },
            ]"
            placeholder="请输入设备名"
          />
        </a-form-item>
        <a-form-item label="url地址">
          <a-input
            v-decorator="[
              'url',
              {
                rules: [{ required: true, message: '请输入url地址' }],
              },
            ]"
            placeholder="请输入url地址"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { $deviceApi } from "@/api/device.js";
import { COMMON } from "@/const/common.js";

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
      // 常量
      COMMON: COMMON,
      // 表单
      data: [],
      columns,

      // 弹框
      form: this.$form.createForm(this),
      visible: false,
      loading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      id: 0,
      formType: COMMON.EDIT,
      formdata: {},
    };
  },

  created() {
    this.page();
  },
  methods: {
    page() {
      $deviceApi.page(this.param).then((response) => {
        this.data = response.data.records;
      });
    },

    // 预览
    previewUrl(record) {
      window.open(process.env.VUE_APP_SHOWURL + `?id=${record.id}`);
    },

    // 删除
    deleteById(id) {
      console.log(12321);
      var _this = this;
      this.$confirm({
        title: "是否确认删除?",
        content: "删除后将无法还原",
        okText: "是",
        okType: "danger",
        cancelText: "否",
        onOk() {
          $deviceApi.delete(id).then((response) => {
            console.log(12312321);
            _this.page();
          });
        },
        onCancel() {},
      });
    },

    // 弹框
    showModal(record, type) {
      this.visible = true;
      if (COMMON.EDIT == type) {
        this.id = record.id;
        this.$nextTick(() => {
          this.form.setFieldsValue({ name: record.name, url: record.url });
        });
      } else {
        this.form.resetFields();
      }
      this.formType = type;
    },
    handleOk(e) {
      this.loading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          // 编辑
          if (this.formType == COMMON.EDIT) {
            console.log(COMMON.EDIT);
            $deviceApi.edit(this.id, values).then((response) => {
              console.log(response);
              this.page();
            });
          }
          // 新增
          else if (this.formType == COMMON.ADD) {
            console.log(COMMON.ADD);
            $deviceApi.add(values).then((response) => {
              console.log(response);
              this.page();
            });
          } else {
          }
          this.visible = false;
          this.loading = false;
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
};
</script>
