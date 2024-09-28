let usersData = [];

async function fetchUsers() {
    await fetch("https://dummyjson.com/users")
        .then(response => response.json())
        .then(data => {
            usersData = data.users;
            displayUsers();
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

function displayUsers() {
    var container = document.getElementById("user-details-container");
    container.innerHTML = '';

    usersData.forEach(function(user, index) {
        var userDiv = document.createElement("div");
        userDiv.classList.add("user");

        userDiv.innerHTML = `
            <h2 class="user-name">${user.firstName} ${user.lastName}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Date of Birth:</strong> ${user.birthDate}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        container.appendChild(userDiv);
    });

    var deleteButtons = document.getElementsByClassName('delete-btn');
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            var userIndex = this.getAttribute('data-index');
            deleteUser(userIndex);
        });
    }
}

function addUser(firstName, lastName, email, birthDate, phone) {
    var newUser = {
        id: usersData.length + 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthDate: birthDate,
        phone: phone
    };
    
    usersData.unshift(newUser);
    displayUsers();
}

function deleteUser(index) {
    usersData.splice(index, 1);
    displayUsers();
}

document.getElementById('toggle-form-btn').addEventListener('click', function() {
    var formContainer = document.getElementById('add-user-container');
    if (formContainer.style.display === "none" || formContainer.style.display === "") {
        formContainer.style.display = "block";
    } else {
        formContainer.style.display = "none";
    }
});

document.getElementById('add-user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var birthDate = document.getElementById('birthDate').value;
    var phone = document.getElementById('phone').value;

    addUser(firstName, lastName, email, birthDate, phone);

    document.getElementById('add-user-form').reset();
    document.getElementById('add-user-container').style.display = "none";
});

fetchUsers();