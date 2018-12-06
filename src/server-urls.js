const root = 'http://192.168.43.232:8888';

export default {
  root: root,
  login: `${root}/login`,
  logout: `${root}/logout`,
  //param: judge_num
  judge_score: `${root}/api/judges/scores`,
  //params: team_name/judge_num
  team_score_per_criteria: `${root}/api/scores`,
  scores: `${root}/api/scores`,
  rankings: `${root}/api/rankings`,
  total_votes: `${root}/api/judges/votes`,
  tie_count: `${root}/api/tiebreaker/count`,

}
