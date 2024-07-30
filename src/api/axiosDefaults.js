import axios from "axios";

// URL of deployed API on Heroku
axios.defaults.baseURL = "https://drl-walkthough-6ebc76335062.herokuapp.com/";
// data contains text & images (multipart)
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// prevent errors when sending cookies
axios.defaults.withCredentials = true;