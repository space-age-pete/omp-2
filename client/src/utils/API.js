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
  },
  // Updates a mic to the database
  updateMic: function(id, micData) {
    return axios.put("/api/mics/" + id, micData);
  },
  // Updates the favorites array (can't currently undo)
  addToFavorites: function(id, micData) {
    return axios.put("/api/users/" + id, micData);
  },

  //AUTH paths
  //Saves a user
  saveUser: function(userData) {
    return axios.post("/auth", userData);
  },
  //Saves a user
  LoginUser: function(userData) {
    return axios.post("/auth/login", userData);
  },

  getUser: function(userData) {
    return axios.get("/auth");
  },

  logOutUser: function(userData) {
    return axios.post("/auth/logout", userData);
  },

  //USER paths
  updateUser: function(userData) {
    return axios.post("/api/users", userData);
  }
};
