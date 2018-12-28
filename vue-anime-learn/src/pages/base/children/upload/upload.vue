<template>
  <page
    :title="$route.meta.title">
    <div class="upload">
      <cube-upload
        :max="2"
        @files-added="filesAdded"
        @file-submitted="fileSubmitted">
      </cube-upload>
      <div class="box" :style="style"></div>
      <div id="content"></div>
    </div>
  </page>
</template>

<script>
import ViUpload from './upload.js'

function createURL(file) {
  if (file && URL) {
    return URL.createObjectURL(file)
  }
  return ''
}

export default {
  data() {
    return {
      style: {}
    }
  },
  mounted() {
    let upload = new ViUpload({
      el: '#content',
      // 上传文件的个数
      max: 56,
      // 文件的最大
      maxSize: 30000,
      events: {
        // 添加图片成功后的回调
        // 这个函数不会对max, maxSize, auto处理
        // 给开发者最大程度的自定义
        addFiles(files) {
          console.log(777, files)
        },
        // 这个函数会对图片做max, maxSize处理,过滤出符合条件的图片
        // 是所有符合图片的集合
        changeFiles(files) {
          console.log('change', files)
        },
        removeFiles(removeFiles) {
          console.log('删除', removeFiles)
        }
      }
    })
  },
  methods: {
    filesAdded(files) {
      console.log('hgfh', files)
      const maxSize = 3 * 1024 * 1024 // 3M
      const max = 2
      const filesLen = files.length
      const newFiles = []
      let i = 0
      let file = files[i]
      while (newFiles.length < max && file) {
        if (!file.ignore) {
          newFiles.push(file)
        }
        file = files[++i]
      }
      console.log(newFiles)
      let url = createURL(newFiles[0])
      console.log(url)
      this.style = {
        'background-size': 'cover',
        'background-image': `url(${url})`
      }
    },
    fileSubmitted() {
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload
  padding: 20px
  .box
    width: 80px
    height: 80px
    background: gold
</style>
