let button = function(){
  document.querySelector("#button").onclick = userData;
}

let userData = function(){
  let userObject = {
    userInput: document.querySelector("#user").value,
    passKey: document.querySelector("#pass").value
  };
  userCredential(userObject);
}

let userCredential = async function(myuserObject){
  await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: myuserObject.userInput,
      password: myuserObject.passKey
    }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.accessToken) {

      localStorage.setItem('username', myuserObject.userInput);
      localStorage.setItem('password', myuserObject.passKey);

      window.location.href = '../pages/landingPage.html';
    } else {
      document.getElementById("error-message").innerText = "Login failed. Please check your credentials.";
      Swal.fire({
        icon: "error",
        text: "Login failed. Please check your credentials!",
      });
    }
  })
  .catch(error => {
    document.getElementById("error-message").innerText = "An error occurred. Please try again.";
  });
}

button();