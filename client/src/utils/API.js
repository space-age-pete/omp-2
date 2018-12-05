import axios from "axios";

export default {
  // Gets all books
  getMics: function() {
    return axios.get("/api/mics");
  }
  //   // Gets the book with the given id
  //   getMic: function(id) {
  //     return axios.get("/api/mics/" + id);
  //   },
  //   // Deletes the book with the given id
  //   deleteMic: function(id) {
  //     return axios.delete("/api/mics/" + id);
  //   },
  //   // Saves a book to the database
  //   saveMic: function(bookData) {
  //     return axios.post("/api/mics", bookData);
  //   }
};
