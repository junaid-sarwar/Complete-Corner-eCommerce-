function fetchBadReviews() {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(productsData => {
            console.log('Products Data:', productsData);

            const badReviewsContainer = document.getElementById('bad-reviews-container');
            badReviewsContainer.innerHTML = '';

            productsData.products.forEach(product => {
                if (product.reviews && product.reviews.length > 0) {
                    product.reviews.forEach(review => {
                        if (review.rating <= 2) {
                            const reviewCard = document.createElement('div');
                            reviewCard.classList.add('col-md-4', 'review-card', 'bad');

                            reviewCard.innerHTML = `
                                <h5>Product: ${product.title}</h5>
                                <p><strong>Review:</strong> ${review.comment}</p>
                                <p><strong>Rating:</strong> ${review.rating}/5</p>
                                <div class="reply-form">
                                    <textarea rows="3" placeholder="Admin reply"></textarea>
                                    <button onclick="submitReply(this)">Reply</button>
                                </div>
                                <p class="reply-msg text-success"></p>
                            `;

                            badReviewsContainer.appendChild(reviewCard);
                        }
                    });
                }
            });

            if (badReviewsContainer.children.length === 0) {
                badReviewsContainer.innerHTML = '<p>No bad reviews found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching bad reviews:', error);
            const badReviewsContainer = document.getElementById('bad-reviews-container');
            badReviewsContainer.innerHTML = '<p>Error fetching reviews. Please try again later.</p>';
        });
}

function fetchGoodReviews() {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(productsData => {
            console.log('Products Data:', productsData);

            const goodReviewsContainer = document.getElementById('good-reviews-container');
            goodReviewsContainer.innerHTML = '';

            productsData.products.forEach(product => {
                if (product.reviews && product.reviews.length > 0) {
                    product.reviews.forEach(review => {
                        if (review.rating > 2) {
                            const reviewCard = document.createElement('div');
                            reviewCard.classList.add('col-md-4', 'review-card', 'good');

                            reviewCard.innerHTML = `
                                <h5>Product: ${product.title}</h5>
                                <p><strong>Review:</strong> ${review.comment}</p>
                                <p><strong>Rating:</strong> ${review.rating}/5</p>
                                <div class="reply-form">
                                    <textarea rows="3" placeholder="Admin reply"></textarea>
                                    <button onclick="submitReply(this)">Reply</button>
                                </div>
                                <p class="reply-msg text-success"></p>
                            `;

                            goodReviewsContainer.appendChild(reviewCard);
                        }
                    });
                }
            });

            if (goodReviewsContainer.children.length === 0) {
                goodReviewsContainer.innerHTML = '<p>No good reviews found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching good reviews:', error);
            const goodReviewsContainer = document.getElementById('good-reviews-container');
            goodReviewsContainer.innerHTML = '<p>Error fetching reviews. Please try again later.</p>';
        });
}

function submitReply(button) {
    const replyForm = button.parentElement;
    const textarea = replyForm.querySelector('textarea');
    const replyMsg = textarea.value.trim();
    
    if (replyMsg !== '') {
        const replyContainer = replyForm.nextElementSibling;
        replyContainer.textContent = `Admin replied: ${replyMsg}`;
        textarea.value = '';
    } else {
        alert('Reply cannot be empty!');
    }
}

fetchBadReviews();
fetchGoodReviews();
