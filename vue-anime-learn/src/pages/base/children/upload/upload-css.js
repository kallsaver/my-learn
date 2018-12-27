export const uploadCss = `
  .vi-upload-btn {
    float: left;
    margin: 0 10px 10px 0;
    overflow: hidden;
  }
  .vi-upload-btn .vi-upload-btn-box{
    position: relative;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
  }
  .vi-upload-btn .vi-upload-btn-box:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: #666;
    transform: translate(-50%, -50%);
  }
  .vi-upload-btn .vi-upload-btn-box:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: #666;
    transform: translate(-50%, -50%) rotate(90deg);
  }
  .vi-upload-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    font-size: 0;
    opacity: 0;
  }
  .vi-upload-file {
    float: left;
    margin: 0 10px 10px 0;
    overflow: hidden;
  }
  .vi-upload-file .vi-upload-file-box {
    position: relative;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    background-size: cover;
  }
  .vi-upload-file .vi-upload-file-box .vi-upload-file-delete {
    position: absolute;
    z-index: 2;
    top: -2px;
    right: -2px;
    color: rgba(0,0,0,0.8);
    font-size: 16px;
    background-color: #fff;
    border-radius: 50%;
  }
`
