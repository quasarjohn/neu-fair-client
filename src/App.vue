<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style>
body {
  background-color: #212121;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.font-light {
  font-weight: 200;
}

.font-med {
  font-weight: 300;
}

.flexbox {
  display: flex;
  flew-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.outer {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.middle {
  display: table-cell;
  vertical-align: middle;
}

.inner {
  margin-left: auto;
  margin-right: auto;
  /*whatever width you want*/
}

.title {
  font-size: 15px;
}
.upper {
  text-transform: uppercase;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.pointer {
  cursor: pointer;
}

</style>
