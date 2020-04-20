<template>
  <page
    :title="$route.meta.title">
    <div class="hahow">
      <label class="content">
        <div class="remind">Click To Switch Day/Night</div>
        <input class="switch" type="checkbox"/>
        <div class="scene">
          <div class="sun"></div>
          <div class="moon"></div>
          <div class="all-stars">
            <div class="star1"></div>
            <div class="star2"></div>
            <div class="star3"></div>
            <div class="star4"></div>
            <div class="star5"></div>
            <div class="star6"></div>
            <div class="star7"></div>
            <div class="star8"></div>
            <div class="star9"></div>
            <div class="star10"></div>
            <div class="star11"></div>
            <div class="star12"></div>
            <div class="star13"></div>
            <div class="star14"></div>
            <div class="star15"></div>
            <div class="star16"></div>
            <div class="star17"></div>
            <div class="star18"></div>
            <div class="star19"></div>
            <div class="star20"></div>
            <div class="star21"></div>
            <div class="star22"></div>
            <div class="star23"></div>
            <div class="star24"></div>
            <div class="star25"></div>
            <div class="star26"></div>
            <div class="star27"></div>
            <div class="star28"></div>
            <div class="star29"></div>
            <div class="star30"></div>
          </div>
          <div class="building">
            <div class="house1">
              <div class="window">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  </page>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.hahow {
  width: 100%;
  min-height: 100%;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2C2F36;
  color: #fff;
  font-family: "Playfair Display", "微软正黑体";
  .content {
    display: block;
    .remind {
      opacity: 0.2;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    .switch {
      display: none;
    }
    .switch:checked + .scene {
      // background-position的百分比定位
      // rate = x / (contentWidth - wrapperWidth)
      background-position: 0 100%;
    }
    .switch:checked + .scene .moon {
      top: -100px;
      opacity: 0;
    }
    .switch:checked + .scene .all-stars {
      opacity: 0;
    }
    .scene {
      width: 700px;
      height: 500px;
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      background: linear-gradient(#1D2B49, #1A45A0, #91cdff, #fff);
      background-size: 100% 300%;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: all 2s;
      // height: 500px * 3;
      // background-size: 100% 100%;
      .sun, .moon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        left: 150px;
        top: 80px;
        // 内阴影,始终是向内缩,
        // 如果是正数,说明是左/上,因为阴影的坐标值是增加的
        // 如果是复数,说明是右/下,因为阴影的坐标值是减少的
        box-shadow: inset 10px -10px rgba(255, 255, 255, 0.9);
        transition: all 2s;
      }
      .all-stars {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        & [class^='star'] {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: #fff;
          animation: falling 2s infinite;
        }
        .star1 {
          left: 60%;
          top: -29%;
          animation-delay: -0.1s;
        }
        .star2 {
          left: 32%;
          top: 49%;
          animation-delay: -0.2s;
        }
        .star3 {
          left: 76%;
          top: 0%;
          animation-delay: -0.3s;
        }
        .star4 {
          left: 10%;
          top: -7%;
          animation-delay: -0.4s;
        }
        .star5 {
          position: absolute;
          left: 65%;
          top: 24%;
          animation-delay: -0.5s;
        }
        .star6 {
          left: 99%;
          top: -11%;
          animation-delay: -0.6s;
        }
        .star7 {
          left: 37%;
          top: -30%;
          animation-delay: -0.7s;
        }
        .star8 {
          left: 48%;
          top: 1%;
          animation-delay: -0.8s;
        }
        .star9 {
          left: 56%;
          top: -15%;
          animation-delay: -0.9s;
        }
        .star10 {
          left: 57%;
          top: -22%;
          animation-delay: -1s;
        }
        .star11 {
          left: 27%;
          top: 0%;
          animation-delay: -1.1s;
        }
        .star12 {
          left: 28%;
          top: -23%;
          animation-delay: -1.2s;
        }
        .star13 {
          left: 75%;
          top: 14%;
          animation-delay: -1.3s;
        }
        .star14 {
          left: 13%;
          top: 41%;
          animation-delay: -1.4s;
        }
        .star15 {
          left: 50%;
          top: -5%;
          animation-delay: -1.5s;
        }
        .star16 {
          left: 26%;
          top: -15%;
          animation-delay: -1.6s;
        }
        .star17 {
          left: 32%;
          top: 45%;
          animation-delay: -1.7s;
        }
        .star18 {
          left: 52%;
          top: -17%;
          animation-delay: -1.8s;
        }
        .star19 {
          left: 3%;
          top: -16%;
          animation-delay: -1.9s;
        }
        .star20 {
          left: 11%;
          top: 44%;
          animation-delay: -2s;
        }
        .star21 {
          left: 18%;
          top: -17%;
          animation-delay: -2.1s;
        }
        .star22 {
          left: 53%;
          top: -28%;
          animation-delay: -2.2s;
        }
        .star23 {
          left: 60%;
          top: -26%;
          animation-delay: -2.3s;
        }
        .star24 {
          left: 26%;
          top: -22%;
          animation-delay: -2.4s;
        }
        .star25 {
          left: 19%;
          top: 7%;
          animation-delay: -2.5s;
        }
        .star26 {
          left: 74%;
          top: 30%;
          animation-delay: -2.6s;
        }
        .star27 {
          left: 14%;
          top: -6%;
          animation-delay: -2.7s;
        }
        .star28 {
          left: 45%;
          top: 37%;
          animation-delay: -2.8s;
        }
        .star29 {
          left: 29%;
          top: 11%;
          animation-delay: -2.9s;
        }
        .star30 {
          position: absolute;
          left: 16%;
          top: 41%;
          animation-delay: -3s;
        }
      }
    }
    .building {
      position: absolute;
      right: 0;
      bottom: 0;
      & [class^="house"] {
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .house1 {
        width: 180px;
        height: 200px;
        border-radius: 0;
        z-index: 1;
        background-color: #fafaf5;
        box-shadow: inset -50px 0px #e3e2cf;
        .window {
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          width: 40px;
          height: 100px;
          border-radius: 20px;
          background-color: #e3e2cf;
          box-shadow: inset 8px 5px #bebdaf;
          // 父元素如果是脱离文档流的,margin-top是安全的
          margin-top: 40px;
          margin-left: 70px;
          padding: 8px 0;
          .circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #534d4d;
            margin-left: 6px;
          }
        }
      }
    }
  }
}

@keyframes falling {
  0% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  0% {
    transform: translate(100px, 0px);
  }
  100% {
    opacity: 0;
    transform: translate(0px, 200px);
  }
}
</style>
