async function fetchComments() {
    await fetch('https://dummyjson.com/comments')
        .then(res => res.json())
        .then(data => {
            var commentsSection = document.getElementById('comments-section');
            commentsSection.innerHTML = '';

            data.comments.forEach(function(comment) {
                var commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                    <strong>${comment.user.username}</strong>
                    <p>${comment.body}</p>
                    <span class="likes">
                        <i class="fas fa-thumbs-up like-icon"></i>
                        ${comment.likes}
                    </span>
                `;
                commentsSection.appendChild(commentDiv);
            });
        })
        .catch(err => console.error('Error fetching comments:', err));
}

fetchComments();
