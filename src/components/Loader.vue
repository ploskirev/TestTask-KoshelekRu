<template>
  <div class="loader-wrap">
    <div class="loadingio-spinner-dual-ring-q267aezdjkr">
      <div class="ldio-zy8x32hes9d">
        <div></div>
        <div><div></div></div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@keyframes ldio-zy8x32hes9d {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader-wrap {
  display: flex;
  height: calc(100vh - 70px);
  justify-content: center;
  align-items: center;
}

.ldio-zy8x32hes9d div {
  box-sizing: border-box !important;
}

.ldio-zy8x32hes9d > div {
  position: absolute;
  width: 93.98px;
  height: 93.98px;
  top: 80.01px;
  left: 80.01px;
  border-radius: 50%;
  border: 12.7px solid #000;
  border-color: #2c3e50 transparent #2c3e50 transparent;
  animation: ldio-zy8x32hes9d 1.01010101010101s linear infinite;
}

.ldio-zy8x32hes9d > div:nth-child(2) {
  border-color: transparent;
}

.ldio-zy8x32hes9d > div:nth-child(2) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}

.ldio-zy8x32hes9d > div:nth-child(2) div:before,
.ldio-zy8x32hes9d > div:nth-child(2) div:after {
  content: '';
  display: block;
  position: absolute;
  width: 12.7px;
  height: 12.7px;
  top: -12.7px;
  left: 27.94px;
  background: #2c3e50;
  border-radius: 50%;
  box-shadow: 0 81.28px 0 0 #2c3e50;
}

.ldio-zy8x32hes9d > div:nth-child(2) div:after {
  left: -12.7px;
  top: 27.94px;
  box-shadow: 81.28px 0 0 0 #2c3e50;
}

.loadingio-spinner-dual-ring-q267aezdjkr {
  width: 254px;
  height: 254px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}

.ldio-zy8x32hes9d {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}

.ldio-zy8x32hes9d div {
  box-sizing: content-box;
}
</style>
