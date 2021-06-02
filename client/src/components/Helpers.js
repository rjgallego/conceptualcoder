export function checkLogin(setState){
    const destUrl = process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:4001';
    const srcUrl = process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:3000'
    fetch(`${destUrl}/users/checkLogin`, {
        method: 'get',
           credentials: "include",
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
               'Access-Control-Allow-Origin': srcUrl
           }
     })
     .then(response => response.json())
     .then(jsonResponse => setState(jsonResponse.loggedIn));
 }