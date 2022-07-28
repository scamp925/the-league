import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL TEAMS
const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE TEAM
const createTeam = (newTeamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, newTeamObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, body)
        .then(() => {
          getTeams(newTeamObj.uid).then(resolve);
        });
    })
    .catch(reject);
});

export {
  getTeams,
  createTeam,
};
