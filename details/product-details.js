import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  doc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAC2zpAE0YqT_zQG1zwYjmjgBiKjDfvlA8",
  authDomain: "crafted-heart.firebaseapp.com",
  projectId: "crafted-heart",
  storageBucket: "crafted-heart.firebasestorage.app",
  messagingSenderId: "356981294414",
  appId: "1:356981294414:web:ea3a6c8e9dd59df7728a1f",
  measurementId: "G-PQ9WCXTS0L",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productDetailsContainer = document.getElementById(
  "product-details-container"
);

async function getProductById(productId) {
  try {
    const collections = [
      "Candles and soap",
      "Embroidery",
      "Home Decor",
      "Wool products",
    ];
    let productData = null;

    for (const collectionName of collections) {
      const productDocRef = doc(db, collectionName, productId);
      const productDocSnap = await getDoc(productDocRef);

      if (productDocSnap.exists()) {
        productData = { ...productDocSnap.data() };
        break;
      }
    }

    return productData;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

function renderProductDetails(product) {
  productDetailsContainer.innerHTML = `
    <div class="product-details-card">
      <div class="product-details-image">
        <img src="${product.imageURL}" alt="${product.name}">
      </div>
      <div class="product-details-content">
        <h2>${product.name}</h2>
        <h5>Description:</h5>
        <p>${product.description}</p>
        <span class="product-details-price">Price: $${product.price}.00</span>
          <button class="checkout-button">Check Out</button>
    </div>
  `;
}

async function fetchProductDetails() {
  const product = await getProductById(productId);

  console.log(product);

  if (product) {
    renderProductDetails(product);
  } else {
    productDetailsContainer.innerHTML = "<p>Product not found.</p>";
  }
}

fetchProductDetails();
