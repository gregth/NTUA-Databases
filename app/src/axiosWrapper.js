import axios from 'axios';

export default {
    post: (url, params) => {
        return axios.post(url, params).catch(err => {
            if (err.response && err.response.data) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err.response.data);
                }
            } else {
                alert(err);
            }

            throw err;
        });
    },

    put: (url, params) => {
        return axios.put(url, params).catch(err => {
            if (err.response && err.response.data) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err.response.data);
                }
            } else {
                alert(err);
            }

            throw err;
        });
    },

    delete: url => {
        return axios.delete(url).catch(err => {
            if (err.response && err.response.data) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err.response.data);
                }
            } else {
                alert(err);
            }

            throw err;
        });
    },

    get: (url, params) => {
        return axios.get(url, params).catch(err => {
            if (err.response && err.response.data) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err.response.data);
                }
            } else {
                alert(err);
            }

            throw err;
        });
    },
};
