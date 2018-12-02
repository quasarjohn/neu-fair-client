<template>
  <div>
    <div class="row" style="padding-top:20px;">
      <div class="col l2 s4">
        <img src="./../assets/neu_logo.png" width="100" height="100">
      </div>

      <div class="col l8 s8" style="text-align:left">
        <h3 class="font-light white-text">NEU Float Parade</h3>
      </div>

      <div class="col l2 s12" style="margin-top:20px">
        <div>
          <a href="#" class="btn">Submit</a>
        </div>
      </div>
    </div>

    <div class="container row team-placeholder">
      <div class="col s12 l4" v-for="score in scores_list">
        <div style="height: 80px;" class="card grey darken-3 waves-block waves-effect">
          <a href="#">
            <div class="col l2 s2">
              <img src="./../assets/neu_logo.png" width="50" height="50" style="margin-top: 14px">
            </div>
            <div class="col l8 s8">
              <div class="outer">
                <div class="middle">
                  <div class="inner">
                    <div style="line-height:17px; margin-left:10px">
                      <p class="title white-text upper" style="line-height:5px;">{{score.team_name}}</p>
                      <p class="white-text">College of {{score.college}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s1 l1 white-text" style="margin-top:14px;">
              <h5>{{score.score}}</h5>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import server_urls from "./../server-urls.js";
export default {
  data() {
    return {
      scores_list: []
    };
  },
  mounted() {
    //get session data
    axios.get(server_urls.root, { withCredentials: true }).then(result => {
      //just a validation, if session expired, return to auth
      let { judge_num } = result.data;
      if (isNaN(judge_num)) {
        this.$router.go("/auth");
      } else {
        //good to go
        this.getTeamsList();
      }
    });
  },
  methods: {
    //gets list of teams with their total score
    getTeamsList(judge_num) {
      axios.get(server_urls.judge_score + `/${judge_num}`).then(result => {
        this.scores_list = result.data;
      });
    },
  }
};
</script>
<style>
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
</style>


