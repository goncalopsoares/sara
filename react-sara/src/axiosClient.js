import axios from "axios"

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

/** axiosClient.interceptors.request.use((config) => {
    const cookies = document.cookie;
    if (cookies) {
        const xsrfTokenCookie = cookies.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
        if (xsrfTokenCookie) {
            const token = xsrfTokenCookie.split('=')[1];
            config.headers['X-XSRF-TOKEN'] = token;
            return config;
        } else {
            console.log('CSRF token not found in cookies');
        }
    } else {
        console.log('No cookies found');
    }
    });

axiosClient.interceptors.response.use((response) => {
    return response;
},
    (error) => {
        try {
            if (error.response) {
                const { response } = error;
                if (response.status === 401) {
                    // handle the error
                } else {
                    // Log the status code and message for other server errors
                    console.log(`Server responded with status code ${response.status}: ${response.statusText}`);
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.log('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        } catch (error) {
            console.log(error)
        }
        throw error;
    }
);
**/ 
export default axiosClient;