<template>
  <div class="modal grey darken-3" id="rankings-modal">
    <div class="modal-content">
      <h3 class="white-text font-light left-align">Current Ranking</h3>

      <table class="white-text">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Average Score</th>
            <th>Rank</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="team in rankings" v-bind:key="team.team_name">
            <td>{{team.team_name}}</td>
            <td>{{team.average_score}}</td>
            <td>{{team.ranking}}</td>
          </tr>
        </tbody>
      </table>

      <p
        style="margin-top: 40px"
        class="white-text left-align"
      >*Average score is the total point of the participant divided by the total number of judges.</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import server_urls from "./../server-urls.js";
export default {
  props: ["trigger"],
  data() {
    return {
      rankings: []
    };
  },
  mounted() {
    setInterval(() => {
      axios.get(server_urls.rankings).then(result => {
        this.rankings = result.data;
      });
      //request updated rankings every 5 seconds
    }, 1000);
  }
};
</script>

