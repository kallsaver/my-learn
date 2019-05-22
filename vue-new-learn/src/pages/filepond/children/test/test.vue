<template>
  <page :title="$route.meta.title">
    <div class="test">
      <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files here..."
        allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        server="/api"
        v-bind:files="myFiles"
        v-on:init="handleFilePondInit"/>
    </div>
  </page>
</template>

<script>
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)

export default {
  name: 'app',
  data: function() {
    return { myFiles: ['cat.jpeg'] }
  },
  methods: {
    handleFilePondInit: function() {
      console.log('FilePond has initialized')
    }
  },
  components: {
    FilePond
  }
}
</script>

<style lang="stylus" scoped>
.test
  padding-top: 50px
</style>
