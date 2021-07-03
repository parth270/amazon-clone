import axios from "axios";

const instance=axios.create({
    baseURL:'http://localhost:5001/clone-8e97f/us-central1/api'
});

export default instance;
