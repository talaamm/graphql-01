document.getElementById("submit").addEventListener("click", () => {
    const username = document.getElementById("user").value
    const password = document.getElementById("pass").value
    const credentials = btoa(`${username}:${password}`); // base 64 encoded string
    // console.log(username)
    // console.log(password)
    fetch('https://adam-jerusalem.nd.edu/api/auth/signin', { 
            method: 'POST',
            headers: { 
                'Authorization': `Basic ${credentials}`
            }
        })
        .then(response => { 
            if (!response.ok) {
                document.getElementById('errorm').style.display = "block"
                throw new Error('Invalid username or password'); 
                // throws err in console & stops further execution
            }
            return response.json();
        })
        .then(data => { // deal with the json we got from prev .then 
            localStorage.setItem('jwtToken', data);
            window.location.href = "profile.html";
            console.log('Login successful:', data); // Server sends back JWT(adam info) token
        })
        .catch(error => {
            console.error(error.message); // Show error message
        });
})
