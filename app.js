// app.js
// Constants
const TOKEN_KEY = "token";
const USER_KEY = "currentUser";
const PRODUCTS_KEY = "products";
const CART_KEY = "cart";

// DOM Elements
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const shopContainer = document.getElementById("shop-container");
const searchInput = document.getElementById("search-input");
const priceInput = document.getElementById("price-input");
const ratingInput = document.getElementById("rating-input");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartContainer = document.getElementById("cart-container");
const checkoutButton = document.getElementById("checkout-button");
const profileContainer = document.getElementById("profile-container");
const editProfileButton = document.getElementById("edit-profile-button");
const profileForm = document.getElementById("profile-form");

// User Authentication
function signupUser() {
  // Get user data from signup form
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if email is already used
  const existingUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
  const userExists = existingUsers.some((user) => user.email === email);
  if (userExists) {
    alert("Email already exists. Please use a different email.");
    return;
  }

  // Create new user object
  const newUser = {
    firstName,
    lastName,
    email,
    password,
  };

  // Save user to local storage
  existingUsers.push(newUser);
  localStorage.setItem(USER_KEY, JSON.stringify(existingUsers));

  // Redirect to login page
  window.location.href = "login.html";
}

function loginUser() {
  // Get user data from login form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if email and password match
  const existingUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
  const currentUser = existingUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (currentUser) {
    // Generate token and save it to local storage
    const token = generateToken();
    localStorage.setItem(TOKEN_KEY, token);

    // Save current user to local storage
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser));

    // Redirect to shop page
    window.location.href = "shop.html";
  } else {
    alert("Invalid email or password.");
  }
}

function logoutUser() {
  // Remove token and current user from local storage
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  // Redirect to login page
  window.location.href = "login.html";
}

function isAuthenticated() {
  // Check if token exists in local storage
  const token = localStorage.getItem(TOKEN_KEY);
  return token !== null;
}

// Fetching Products
async function fetchProducts()
