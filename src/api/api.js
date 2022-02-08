
    const endpoints = {
        REGISTER: '/users/register',
        LOGIN: '/users/login',
        LOGOUT: '/users/logout'
    };


      export  function host(endpoint) {
            return `http://localhost:3030${endpoint}`;
        };

     export  function getOptions(headers) {
            const token = sessionStorage.getItem('authToken');

            const options = { headers: headers || {} };

            if (token !== null) {
                Object.assign(options.headers, { 'X-Authorization': token });
            }

            return options;
        };

      export  async function request(endpoint, options) {
            let response;

     
            try {
                response = await fetch(endpoint, options);

                if (response.status == 200) {
                    return await response.json();
                } else {
                    const error = await response.json();
                    throw new Error(error.message);
                }
            } catch (err) {
                if (err instanceof SyntaxError) {
                    return response;
                } else if(err.message == 'Invalid access token') {
                    console.log('Invalid session, resetting storage');
                    sessionStorage.clear();
                    window.location.pathname = '/';
                } else {
                    throw err;
                }
            } 
       
        };

      export  async function get(endpoint) {
            return request(host(endpoint), getOptions());
        };

       export async function post(endpoint, body) {
            const options = getOptions({ 'Content-Type': 'application/json' });
            options.method = 'POST';
            options.body = JSON.stringify(body);

            return request(host(endpoint), options);
        };

       export async function put(endpoint, body) {
            const options = getOptions({ 'Content-Type': 'application/json' });
            options.method = 'PUT';
            options.body = JSON.stringify(body);

            return request(host(endpoint), options);
        };

       export async function del(endpoint) {
            const options = getOptions();
            options.method = 'DELETE';

            return request(host(endpoint), options);
        };

      export  async function register(email, password) {
            const result = await post(endpoints.REGISTER, {
                email,
                password
          
            });
            sessionStorage.setItem('email', result.email);
            sessionStorage.setItem('authToken', result['accessToken']);
            sessionStorage.setItem('userId', result._id);
          

            return result;
        };

       export async function login(email, password) {
            const result = await post(endpoints.LOGIN, {
                email,
                password
            });
            sessionStorage.setItem('email', result.email);
            sessionStorage.setItem('authToken', result['accessToken']);
            sessionStorage.setItem('userId', result._id);
           

            return result;
        };

       export async function logout() {
            const result = await get(endpoints.LOGOUT);
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userId');
            return result;
        };