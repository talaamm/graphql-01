let sumb = document.getElementById("submit")
let jwtToken;

sumb.addEventListener("click", () => {
    const username = document.getElementById("user").value
    const password = document.getElementById("pass").value
    const credentials = btoa(`${username}:${password}`); // Encode username and password in base 64
    console.log(username)
    console.log(password)
    fetch('https://adam-jerusalem.nd.edu/api/auth/signin', { // sent request to get information
            method: 'POST', // bc we are sending info 
            headers: { // for additionl info
                'Authorization': `Basic ${credentials}`
            }
        })
        .then(response => { // confirms the request is success
            if (!response.ok) {
                document.getElementById('errorm').style.display = "block"
                throw new Error('Invalid username or password'); // Invalid credentials
            }
            return response.json(); // Converts the info we got into a JSON object for further use.
        })
        .then(data => { // deal with the jason we got from .then respone
            jwtToken = data;
            localStorage.setItem('jwtToken', jwtToken); // saves
            window.location.href = "profile.html";
            console.log('Login successful:', data); // Server sends back JWT(adam info) token
        })
        .catch(error => {
            console.error(error.message); // Show error message
        });
})