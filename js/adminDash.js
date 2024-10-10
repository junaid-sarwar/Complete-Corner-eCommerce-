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
    const container = document.getElementById("user-details-container");
    container.innerHTML = '';

    usersData.forEach((user, index) => {
        const userCard = document.createElement("div");
        userCard.classList.add("col-md-4");

        userCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
                    <div class="user-details">
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>DOB:</strong> ${user.birthDate}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                    </div>
                </div>
            </div>
        `;

        userCard.addEventListener('mouseover', function() {
            const details = userCard.querySelector('.user-details');
            details.style.display = 'block';
        });

        userCard.addEventListener('mouseout', function() {
            const details = userCard.querySelector('.user-details');
            details.style.display = 'none';
        });

        container.appendChild(userCard);
    });

    const deleteButtons = document.getElementsByClassName('delete-btn');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            const userIndex = this.getAttribute('data-index');
            deleteUser(userIndex);
        });
    }
}

function addUser(firstName, lastName, email, birthDate, phone) {
    const newUser = {
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
    const formContainer = document.getElementById('add-user-container');
    formContainer.style.display = formContainer.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('add-user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const birthDate = document.getElementById('birthDate').value;
    const phone = document.getElementById('phone').value;

    addUser(firstName, lastName, email, birthDate, phone);

    document.getElementById('add-user-form').reset();
    document.getElementById('add-user-container').style.display = 'none';
});

fetchUsers();
