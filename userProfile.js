 //GET HTML Elements
 const userName = document.getElementById("userName");
 const userEmail = document.getElementById("userEmail");
 const firstNameInput = document.getElementById("firstName");
 const emailInput = document.getElementById("email");
 const passwordInput = document.getElementById("password");
 const saveChangesButton = document.getElementById("saveChanges");


   // Load user profile
   auth.onAuthStateChanged((user) => {
    if (user) {
        // Display user info
        userName.textContent = user.displayName || "No Name";
        userEmail.textContent = user.email;

        
         // Fetch user data from Firestore
         db.collection("users").doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                // Fill input fields with user data from Firestore
                firstNameInput.value = doc.data().displayName || "";
                emailInput.value = doc.data().email || "";
            } else {
                console.log("No such document in Firestore!");
            }
        }).catch((error) => {
            console.error("Error fetching document from Firestore:", error);
        });
    } else {
        alert("No user is signed in.");
    }
   
});

  // Save changes
  saveChangesButton.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (user) {
        const updatedName = firstNameInput.value;
        const updatedEmail = emailInput.value;
        const updatedPassword = passwordInput.value;

        try {
            // Update Auth profile
            await user.updateProfile({
                displayName: updatedName,
            });

            // Update email
            if (updatedEmail !== user.email) {
                await user.updateEmail(updatedEmail);
            }

            // Update password
            if (updatedPassword) {
                await user.updatePassword(updatedPassword);
            }

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    } else {
        alert("No user is signed in.");
    }
});