<template>
  <div class="upload-class">
    <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="true"
      :customRequest="customRequest"
      :beforeUpload="beforeUpload"
      @change="handleChange"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined></inbox-outlined>
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>

    <div>
      <div>
        <div>标题：</div><a-input v-model:value="inputvalue" placeholder="Basic usage" />
      </div>

      <div>
        <p>封面：</p>
      </div>
      <div>
        <p>分区：</p>
      </div>
      <div>
        <p>标签：</p>
        <p>
          <a-select
              v-model:value="value"
              mode="tags"
              style="width: 100%"
              placeholder="Tags Mode"
              :options="options"
              @change="dropDownBox"
          >
          </a-select>
        </p>
      </div>
    </div>
    <a-button type="primary" @click="clickIsUpload">Primary Button</a-button>

  </div>

</template>

<script>
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import SparkMD5 from 'spark-md5'
export default defineComponent({
  components: {
    InboxOutlined,
  },
  setup() {
    const inputvalue = ref('');
    const isUpload = ref(false)
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

    const dropDownBox = value => {
      console.log(`selected ${value}`);
    };
    const customRequest = async ({ file }) => {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      var name = file.name;
      let md5 =""
      await calculateMD5(file).then(ttt=>{
        md5=ttt
      })
      for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('name', name);
        formData.append('md5', md5);
        formData.append('total', totalChunks);
        formData.append('index', i+1);
        try {
          await axios.post('/water-sty/video/upload-vue', formData);
          message.success(`Chunk ${i + 1} for ${file.name} uploaded successfully.`);
        } catch (error) {
          message.error(`Chunk ${i + 1} for ${file.name} upload failed.`);
          break;
        }
      }
    };

    const handleChange = info => {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
// 上传头像前校验
    const beforeUpload=()=> {
      console.log("isUpload:::",isUpload.value)
      return isUpload.value
    };

    const clickIsUpload = ()=>{
      isUpload.value = true
    }
    /**
     * 使用 SparkMD5 库计算文件的 MD5 哈希值。
     * @param {File} file - 要计算 MD5 哈希值的文件。
     * @returns {Promise<string>} - 一个 Promise，在解析为文件的 MD5 哈希值时被解析。
     */
    const calculateMD5 = async file => {
      return new Promise(resolve => {
        // 使用 File.slice() 方法以保证在不同浏览器上的兼容性
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const chunkSize = 2097152; // 2 MB 的块
        const chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        const spark = new SparkMD5.ArrayBuffer();
        const reader = new FileReader();

        // 当每个块加载完成时的事件处理程序
        reader.onload = function (e) {
          spark.append(e.target.result); // 追加数组缓冲区
          currentChunk++;

          // 继续加载下一个块或在所有块处理完毕时解析 Promise
          if (currentChunk < chunks) {
            loadNext();
          } else {
            resolve(spark.end());
          }
        };

        // 加载下一个块的函数
        const loadNext = () => {
          const start = currentChunk * chunkSize;
          const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

          // 读取下一个块作为 ArrayBuffer
          reader.readAsArrayBuffer(blobSlice.call(file, start, end));
        };

        // 开始加载第一个块
        loadNext();
      });
    };
    return {
      handleChange,
      customRequest,
      fileList: ref([]),
      beforeUpload,
      clickIsUpload,
      dropDownBox,
      options: [...Array(25)].map((_, i) => ({
        value: (i + 10).toString(36) + (i + 1),
      })),
      value: ref([]),
      inputvalue,
    };
  },
});
</script>
<style scoped>
.upload-class{
  margin-top: 300px;
  max-width: 75%;
  margin: 0 auto;
}

</style>
