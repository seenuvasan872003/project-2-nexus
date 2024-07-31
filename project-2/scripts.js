document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    
    var storedUsers = JSON.parse(localStorage.getItem('signupData')) || [];
    var user = storedUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
        alert('Login successful');
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('signupContainer').style.display = 'none';
        document.getElementById('restaurantContainer').style.display = 'block';
        displayFoodDetails();
        displayFoodOffers();
        displayRatingForm();
        displayUserRatings();
    } else {
        alert('Invalid login credentials');
    }
});

document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    var name = document.getElementById('signupName').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var errorMessage = document.getElementById('errorMessage');
    
    if (!name || !email || !password) {
        errorMessage.textContent = "All fields are required.";
        errorMessage.style.display = 'block';
    } else if (!validateEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        var signupData = JSON.parse(localStorage.getItem('signupData')) || [];
        signupData.push({ name: name, email: email, password: password });
        localStorage.setItem('signupData', JSON.stringify(signupData));
        alert('Signup successful');
        document.getElementById('signupForm').reset();
    }
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function displayFoodDetails() {
    var foodDetailsData = [
        { name: 'Margherita Pizza', description: 'Classic delight with 100% real mozzarella cheese', image: 'https://www.dominos.co.in//files/items/Margherit.jpg' },
        { name: 'Farmhouse Pizza', description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom', image: 'https://www.dominos.co.in//files/items/Farmhouse.jpg' },
        { name: 'Veg Extravaganza', description: 'Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese', image: 'https://www.dominos.co.in//files/items/Veg_Extravaganz.jpg' },
        { name: 'Peppy Paneer', description: 'Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsMK1UDAZHgY81NwTRkzaHTUynDHHqvgHfDw&s' },
        { name: 'Mexican Green Wave', description: 'Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno', image: 'https://cdn.dotpe.in/longtail/store-items/7935708/lvSeZ0WC.jpeg' }
    ];

    var foodDetails = document.getElementById('foodDetails');
    foodDetails.innerHTML = '';
    foodDetailsData.forEach(function (food) {
        var foodCard = document.createElement('div');
        foodCard.className = 'restaurant-card';
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}" width="200" height="200">
            <h2>${food.name}</h2>
            <p>${food.description}</p>
        `;
        foodCard.addEventListener('click', function() {
            showFoodModal(food);
        });
        foodDetails.appendChild(foodCard);
    });
}

function displayFoodOffers() {
    var foodOffersData = [
        { name: 'Happy Hour', description: '50% off on all pizzas from 3-5 PM', image: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/5e/1c/e8/happy-hour-pizza.jpg' },
        { name: 'Burger Bonanza', description: 'Buy one get one free on all burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QnVyZ2VyJTIwQm9uYW56YXxlbnwwfHwwfHx8MA%3D%3D' },
        { name: 'Pasta Fiesta', description: 'Free drink with any pasta order', image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGFzdGElMjBGaWVzdGF8ZW58MHx8MHx8fDA%3D' }
    ];

    var foodOffers = document.getElementById('foodOffers');
    foodOffers.innerHTML = '';
    foodOffersData.forEach(function (offer) {
        var offerCard = document.createElement('div');
        offerCard.className = 'restaurant-card';
        offerCard.innerHTML = `
            <img src="${offer.image}" alt="${offer.name}" width="200" height="200">
            <h2>${offer.name}</h2>
            <p>${offer.description}</p>
        `;
        offerCard.addEventListener('click', function() {
            showFoodModal(offer);
        });
        foodOffers.appendChild(offerCard);
    });
}

function displayRatingForm() {
    var foodRating = document.getElementById('foodRating');
    foodRating.innerHTML = `
        <div class="rating-card">
            <h3>Rate your food:</h3>
            <form id="ratingForm">
                <input type="text" id="foodRatingname" placeholder="Enter the Name" required>
                <div class=""foodselect-rating>
                <select id="foodSelect">
                    <option value="">Select Food</option>
                    <option value="Margherita Pizza">Margherita Pizza</option>
                    <option value="Farmhouse Pizza">Farmhouse Pizza</option>
                    <option value="Veg Extravaganza">Veg Extravaganza</option>
                    <option value="Peppy Paneer">Peppy Paneer</option>
                    <option value="Mexican Green Wave">Mexican Green Wave</option>
                </select>
                <input type="number" min="1" max="5" id="foodRatingValue" placeholder="Rating (1-5)" required>
                </div>
                <textarea id="foodReview" placeholder="Write a review..." required></textarea>
                <button type="submit">Submit Rating</button>
            </form>
        </div>
    `;

    document.getElementById('ratingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var foodRatingname =document.getElementById('foodRatingname').value;
        var foodSelect = document.getElementById('foodSelect').value;
        var foodRatingValue = document.getElementById('foodRatingValue').value;
        var foodReview = document.getElementById('foodReview').value;

        if (foodRatingname && foodSelect && foodRatingValue && foodReview) {
            var userRatings = JSON.parse(localStorage.getItem('userRatings')) || [];
            userRatings.push({Name: foodRatingname, food: foodSelect, rating: foodRatingValue, review: foodReview });
            localStorage.setItem('userRatings', JSON.stringify(userRatings));
            displayUserRatings();
            alert('Rating submitted successfully');
        } else {
            alert('Please fill in all fields');
        }
    });
}

function displayUserRatings() {
    var userRatingsData = JSON.parse(localStorage.getItem('userRatings')) || [];
    var userRatings = document.getElementById('userRatings');
    userRatings.innerHTML = '';

    userRatingsData.forEach(function(rating) {
        var ratingCard = document.createElement('div');
        ratingCard.className = 'rating-card';
        ratingCard.innerHTML = `
            <h1>${rating.Name}</h1>
            <h4>${rating.food}</h4>
            <p>Rating: ${rating.rating}</p>
            <p>Review: ${rating.review}</p>
        `;
        userRatings.appendChild(ratingCard);
    });
}

function showFoodModal(food) {
    var modal = document.createElement('div');
    modal.className = 'food-modal';
    modal.innerHTML = `
        <div class="food-modal-content">
            <span class="food-modal-close">&times;</span>
            <div class="showFoodModal-img">
                <div>
                    <img src="${food.image}" alt="${food.name}" width="200" height="200">
                </div>
                <div>
                    <h2>${food.name}</h2>
                    <p>${food.description}</p>
                </div>
            </div>
            <input type="number" min="1" value="1">
            <button>Order</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    modal.querySelector('.food-modal-close').addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });

    modal.querySelector('button').addEventListener('click', function() {
        var quantity = modal.querySelector('input').value;
        alert(`Order placed for ${quantity} x ${food.name}`);
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
}

document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('loginContainer').classList.remove('active');
    document.getElementById('signupContainer').classList.add('active');
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('signupContainer').classList.remove('active');
    document.getElementById('loginContainer').classList.add('active');
});
