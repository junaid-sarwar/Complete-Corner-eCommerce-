let username = localStorage.getItem('username');
if (username) {
    document.getElementById('username').textContent = username;
} else {
    window.location.href = '../index.html';
}

fetch('https://dummyjson.com/users')
    .then(response => response.json())
    .then(data => {
        const users = data.users;

        const loggedInUser = users.find(user => user.username === username);

        if (loggedInUser) {
            const userInfoDiv = document.getElementById('user-info');

            const userAvatar = document.createElement('img');
            userAvatar.src = loggedInUser.image;
            userAvatar.alt = 'User Avatar';
            userAvatar.classList.add('rounded-circle');
            userAvatar.width = 50;
            userAvatar.height = 50;

            const userName = document.createElement('p');
            userName.classList.add('mb-0', 'ms-2','fw-bold','fst-italic');
            userName.textContent = `Logged in as: ${loggedInUser.firstName} ${loggedInUser.lastName}`;

            userInfoDiv.appendChild(userAvatar);
            userInfoDiv.appendChild(userName);
        } else {
            console.error('User not found!');
        }
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
