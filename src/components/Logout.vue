<template></template>
<script>
import axios from "axios";
import server_urls from "./../server-urls.js";
export default {
  mounted() {
    //deletes any existing session if there are any
    axios.get(server_urls.logout, { withCredentials: true }).then(result => {
        this.$router.push('/auth')
    });
  }
};
</script>
