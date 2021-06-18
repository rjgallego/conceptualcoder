export function checkLogin(setState){
    fetch('/users/checkLogin', {
        method: 'get',
        credentials: "include",
        headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
        }
     })
     .then(response => response.json())
     .then(jsonResponse => setState(jsonResponse.loggedIn));
 }