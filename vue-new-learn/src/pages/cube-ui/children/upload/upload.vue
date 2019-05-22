<template>
  <page :title="$route.meta.title">
    <div class="upload">
      <cube-upload
        ref="upload"
        v-model="files"
        :action="action"
        @files-added="addedHandler"
        @file-error="errHandler">
      </cube-upload>
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {
      action: 'http://localhost:3000/api/base64',
      files: []
    }
  },
  methods: {
    addedHandler() {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
    },
    errHandler(file) {
      // const msg = file.response.message
      this.$createToast({
        type: 'warn',
        txt: 'Upload fail',
        time: 1000
      }).show()
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload
  padding-top: 50px
</style>
