<template>
  <div :class="$style['avatar']">
    <input class="avatar-input"
      type="file"
      multiple="multiple"
      accept="image/*"
      @change.stop="add($event)" />
    <img :src="thumbnailList[0].thumbnail">
  </div>
</template>

<script>

// 添加
const EVENT_ADD = 'add'
// 数量变化
const EVENT_CHANGE = 'change'

export default {
  data() {
    return {
      thumbnailList: [],
      submitList: []
    }
  },
  mounted() {

  },
  methods: {
    createCanvas() {
      this.canvas = document.createElement('canvas')
      this.content = this.canvas.getContext('2d')
    },
    getImage() {
      let image = new Image()
      image.src = '../images/flag-bg.jpeg'
      image.onload = () => {
      }
    },
    add(event) {
      let persistedCurrentTarget = event.currentTarget
      let files = persistedCurrentTarget.files
      if (files.length === 0) {
        return
      }
      let i = 0
      let fileArray = []
      while (files[i]) {
        fileArray.push(files[i])
        i++
      }
      this.createThumbnail(fileArray)
    },
    // 缩略图
    createThumbnail(files) {
      (async () => {
        for (let i = 0; i < files.length; i++) {
          let file = files[i]
          await (() => {
            return new Promise((resolve) => {
              this.reader.readAsDataURL(file)
              this.reader.onload = () => {
                let base64Url = this.reader.result
                let base64Code = base64Url.replace(/^data:.*?\/.*?base64,/, '')
                let name = file.name
                let ext
                if (name) {
                  ext = name.replace(/.*\.(.*)$/, '$1')
                } else {
                  ext = base64Url.replace(/^data:.*?\/(.*?);base64,.*/, '$1')
                }

                let type = base64Url.replace(/^data:(.*?)\/.*/, '$1')
                let size = file.size
                this.setThumbnailSrc(base64Url, type).then((data) => {
                  let thumbnail = data

                  let item = {
                    // 缩略图
                    thumbnail: thumbnail,
                    // base64的完整编码
                    base64Url: base64Url,
                    // base64的数据
                    base64Code: base64Code,
                    // 文件后缀名
                    ext: ext,
                    // 文件类型 ['audio', 'video', 'image', 'application']
                    type: type,
                    // 大小
                    size: size,
                    // 能否加入缩略图
                    pass: true
                  }

                  // 外部可以在这个回调里处理图片,压缩,限制大小,限制格式等
                  this.$emit(EVENT_ADD, item)

                  if (item.pass) {
                    this.thumbnailList.push(item)
                    this.$emit(EVENT_CHANGE, this.thumbnailList)
                  }
                  resolve()
                })
              }
            })
          })()
        }
        await (() => {
          if (this.isAutoSubmit) {
            this.submit()
          }
        })()
      })()
    },
  }
}
</script>

<style lang="less" module>
.avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 10px 10px 0;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;;
    height: 2px;
    background-color: #666;
    transform: translate(-50%, -50%);
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: #666;
    transform: translate(-50%, -50%) rotate(90deg);
  }
  :global {
    .avatar-input {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      font-size: 0;
      opacity: 0;
    }
  }
}
</style>
