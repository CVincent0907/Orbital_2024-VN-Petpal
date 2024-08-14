import axios from "axios";

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const axiosInstance = axios.create({
    baseURL: 'https://orbital-2024-vn-petpal.onrender.com',
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    withXSRFToken: true
});

axios.interceptors.request.use((config) => {
    const modifiedConfig = {
        ...config,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    };
    return modifiedConfig;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;