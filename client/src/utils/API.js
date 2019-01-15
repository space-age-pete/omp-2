import axios from "axios";

export default {
  // Gets all mics
  getMics: function(query) {
    console.log("the API query: ", query);
    return axios.get("/api/mics", query);
  },
  // Gets the mic with the given id
  getMic: function(id) {
    return axios.get("/api/mics/" + id);
  },
  // Deletes the mic with the given id
  deleteMic: function(id) {
    return axios.delete("/api/mics/" + id);
  },
  // Saves a mic to the database
  saveMic: function(micData) {
    return axios.post("/api/mics", micData);
  }
};
