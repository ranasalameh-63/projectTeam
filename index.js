// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC2zpAE0YqT_zQG1zwYjmjgBiKjDfvlA8",
  authDomain: "crafted-heart.firebaseapp.com",
  projectId: "crafted-heart",
  storageBucket: "crafted-heart.firebasestorage.app",
  messagingSenderId: "356981294414",
  appId: "1:356981294414:web:ea3a6c8e9dd59df7728a1f",
  measurementId: "G-PQ9WCXTS0L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let products = [
  { name: "Candle Set", category: "Candles Gift" },
  { name: "Decorative Vase", category: "Home Decor Gift" },
  { name: "Knitted Scarf", category: "Wool Gift" },
  { name: "Embroidery Art", category: "Embroidery Gift" },
  { name: "Woolen Jacket", category: "Wool Gift" },
  { name: "Family Threads", category: "Home Decor Gift" },
  { name: "Plant Straw", category: "Wool Gift" },
];

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const searchResultsDiv = document.getElementById("searchResults");
  const searchQuery = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
  const selectedCategory = document.getElementById("category").value;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesQuery = product.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesQuery;
  });

  if (filteredProducts.length > 0) {
    window.location.href = `product.html`;
  } else {
    alert("No products found");
  }
});

// Event listener to track the auth state (when user signs in or out)

auth.onAuthStateChanged((user) => {
  console.log("Auth state changed:", user);
  if (user) {
    console.log("User ID:", user.uid);
    fetchAndDisplayUserName(user.uid);
  } else {
    console.log("No user signed in.");
  }
});

// Function to fetch and display the user's name dynamically
async function fetchAndDisplayUserName(uid) {
  try {
    // Reference the user document in the "users" collection
    const userDocRef = doc(db, "users", uid);

    // Fetch the document data
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Retrieve and display the user's first name
      const userName = userDoc.data().firstName;
      document.getElementById("welcome-message").textContent = `Welcome ${userName}!`;
    } else {
      console.error("No user data found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
