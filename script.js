// ==========================================
// DARK MODE
// ==========================================

const darkModeToggle =
    document.getElementById("darkModeToggle");

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

function updateThemeButton() {

    if (!darkModeToggle) return;

    const isLight =
        document.body.classList.contains("light-mode");

    darkModeToggle.textContent =
        isLight
            ? "🌙 Dark Mode"
            : "☀️ Light Mode";
}

updateThemeButton();

if (darkModeToggle) {

    darkModeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
        );

        updateThemeButton();

    });

}


// ==========================================
// TOAST
// ==========================================

const toast =
    document.getElementById("toast");

function showToast(text, type = "success") {

    if (!toast) return;

    toast.textContent = text;

    toast.style.background =
        type === "error"
            ? "#ef4444"
            : "#22c55e";

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ==========================================
// REGISTER
// ==========================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("email");

    const registerUsername =
        document.getElementById("registerUsername");

    const registerPassword =
        document.getElementById("registerPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");


    const toggleRegisterPassword =
        document.getElementById(
            "toggleRegisterPassword"
        );


    // Show password

    if (toggleRegisterPassword) {

        toggleRegisterPassword.addEventListener(
            "click",
            () => {

                if (
                    registerPassword.type ===
                    "password"
                ) {

                    registerPassword.type =
                        "text";

                    toggleRegisterPassword.textContent =
                        "Hide";

                } else {

                    registerPassword.type =
                        "password";

                    toggleRegisterPassword.textContent =
                        "Show";
                }

            }
        );

    }


    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Errors

            const nameError =
                document.getElementById(
                    "nameError"
                );

            const emailError =
                document.getElementById(
                    "emailError"
                );

            const userError =
                document.getElementById(
                    "registerUserError"
                );

            const passError =
                document.getElementById(
                    "registerPassError"
                );

            const confirmError =
                document.getElementById(
                    "confirmPassError"
                );

            const registerMessage =
                document.getElementById(
                    "registerMessage"
                );


            nameError.textContent = "";
            emailError.textContent = "";
            userError.textContent = "";
            passError.textContent = "";
            confirmError.textContent = "";
            registerMessage.textContent = "";


            let valid = true;


            // Full name

            if (fullName.value.trim().length < 3) {

                nameError.textContent =
                    "Enter your full name.";

                valid = false;
            }


            // Email

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                emailError.textContent =
                    "Enter a valid email.";

                valid = false;
            }


            // Username

            if (
                registerUsername.value
                    .trim()
                    .length < 3
            ) {

                userError.textContent =
                    "Username must be at least 3 characters.";

                valid = false;
            }


            // Password

            if (
                registerPassword.value.length < 6
            ) {

                passError.textContent =
                    "Password must be at least 6 characters.";

                valid = false;
            }


            // Confirm password

            if (
                confirmPassword.value !==
                registerPassword.value
            ) {

                confirmError.textContent =
                    "Passwords do not match.";

                valid = false;
            }


            if (!valid) {

                showToast(
                    "Please fix the errors ❌",
                    "error"
                );

                return;
            }


            // ==================================
            // SAVE ACCOUNT
            // ==================================

            const account = {

                fullName:
                    fullName.value.trim(),

                email:
                    email.value.trim(),

                username:
                    registerUsername.value.trim(),

                password:
                    registerPassword.value

            };


            localStorage.setItem(
                "account",
                JSON.stringify(account)
            );


            registerMessage.textContent =
                "Account created successfully! ✅";

            registerMessage.style.color =
                "#22c55e";


            showToast(
                "Account created successfully 🚀"
            );


            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1200);

        }
    );

}


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    const username =
        document.getElementById("username");

    const password =
        document.getElementById("password");

    const userError =
        document.getElementById("userError");

    const passError =
        document.getElementById("passError");

    const message =
        document.getElementById("message");

    const rememberMe =
        document.getElementById("rememberMe");

    const togglePassword =
        document.getElementById("togglePassword");


    // Remember username

    const rememberedUsername =
        localStorage.getItem(
            "rememberedUsername"
        );

    if (rememberedUsername) {

        username.value =
            rememberedUsername;

        rememberMe.checked =
            true;
    }


    // Show password

    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            () => {

                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";

                    togglePassword.textContent =
                        "Hide";

                } else {

                    password.type =
                        "password";

                    togglePassword.textContent =
                        "Show";
                }

            }
        );

    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            userError.textContent = "";
            passError.textContent = "";
            message.textContent = "";


            const savedAccount =
                JSON.parse(
                    localStorage.getItem(
                        "account"
                    )
                );


            if (!savedAccount) {

                showToast(
                    "Create an account first ❌",
                    "error"
                );

                return;
            }


            let valid = true;


            if (
                username.value.trim() === ""
            ) {

                userError.textContent =
                    "Enter your username.";

                valid = false;
            }


            if (
                password.value === ""
            ) {

                passError.textContent =
                    "Enter your password.";

                valid = false;
            }


            if (!valid) {

                return;
            }


            // ==================================
            // CHECK ACCOUNT
            // ==================================

            if (
                username.value.trim() !==
                    savedAccount.username ||
                password.value !==
                    savedAccount.password
            ) {

                message.textContent =
                    "Username or password is incorrect ❌";

                message.style.color =
                    "#ef4444";

                showToast(
                    "Login failed ❌",
                    "error"
                );

                return;
            }


            // Remember

            if (rememberMe.checked) {

                localStorage.setItem(
                    "rememberedUsername",
                    username.value.trim()
                );

            } else {

                localStorage.removeItem(
                    "rememberedUsername"
                );
            }


            // Login state

            localStorage.setItem(
                "loggedIn",
                "true"
            );


            localStorage.setItem(
                "username",
                savedAccount.username
            );


            message.textContent =
                "Login successful! ✅";

            message.style.color =
                "#22c55e";


            showToast(
                "Welcome back 🚀"
            );


            setTimeout(() => {


                window.location.href = "home.html";

            }, 1000);

        }
    );

}


// ==========================================
// DASHBOARD
// ==========================================

const dashboard =
    document.querySelector(".dashboard");

if (dashboard) {

    const loggedIn =
        localStorage.getItem("loggedIn");


    // Check Login

    if (loggedIn !== "true") {

        window.location.href =
            "login.html";

    } else {

        let account =
            JSON.parse(
                localStorage.getItem("account")
            );


        if (!account) {

            window.location.href =
                "login.html";

        } else {


            // ==================================
            // ELEMENTS
            // ==================================

            const dashboardName =
                document.getElementById("fullName");

            const email =
                document.getElementById("emaile");

            const usernameProfile =
                document.getElementById(
                    "usernameProfile"
                );

            const profileImage =
                document.getElementById(
                    "profileImage"
                );

            const profileUpload =
                document.getElementById(
                    "profileUpload"
                );

            const removePhotoBtn =
                document.getElementById(
                    "removePhotoBtn"
                );


            // ==================================
            // DEFAULT PROFILE IMAGE
            // ==================================

            function getDefaultImage() {

                return (
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(
                        account.fullName
                    ) +
                    "&background=3b82f6" +
                    "&color=fff" +
                    "&size=200"
                );

            }


            // ==================================
            // DISPLAY ACCOUNT
            // ==================================

            function displayAccount() {

                dashboardName.textContent =
                    "Welcome, " +
                    account.fullName +
                    " 👋";


                email.textContent =
                    "📧 " +
                    account.email;


                usernameProfile.textContent =
                    "👤 @" +
                    account.username;


                if (account.profileImage) {

                    profileImage.src =
                        account.profileImage;

                } else {

                    profileImage.src =
                        getDefaultImage();

                }

            }


            displayAccount();


            // ==================================
            // UPLOAD PROFILE IMAGE
            // ==================================

            if (profileUpload) {

                profileUpload.addEventListener(
                    "change",
                    function () {

                        const file =
                            this.files[0];


                        if (!file) return;


                        // Check image

                        if (
                            !file.type.startsWith(
                                "image/"
                            )
                        ) {

                            showToast(
                                "Please select an image ❌",
                                "error"
                            );

                            return;
                        }


                        // Limit 2MB

                        if (
                            file.size >
                            2 * 1024 * 1024
                        ) {

                            showToast(
                                "Image must be less than 2MB ❌",
                                "error"
                            );

                            return;
                        }


                        const reader =
                            new FileReader();


                        reader.onload = function () {

                            account.profileImage =
                                reader.result;


                            localStorage.setItem(
                                "account",
                                JSON.stringify(
                                    account
                                )
                            );


                            profileImage.src =
                                account.profileImage;


                            showToast(
                                "Profile photo updated! 📸"
                            );

                        };


                        reader.readAsDataURL(file);

                    }
                );

            }


            // ==================================
            // REMOVE PROFILE IMAGE
            // ==================================

            if (removePhotoBtn) {

                removePhotoBtn.addEventListener(
                    "click",
                    function () {

                        delete account.profileImage;


                        localStorage.setItem(
                            "account",
                            JSON.stringify(
                                account
                            )
                        );


                        profileImage.src =
                            getDefaultImage();


                        showToast(
                            "Profile photo removed 🗑️"
                        );

                    }
                );

            }


            // ==================================
            // EDIT ACCOUNT
            // ==================================

            const editAccountBtn =
                document.getElementById(
                    "editAccountBtn"
                );

            const editPanel =
                document.getElementById(
                    "editPanel"
                );


            const editFullName =
                document.getElementById(
                    "editFullName"
                );

            const editEmail =
                document.getElementById(
                    "editEmail"
                );

            const editUsername =
                document.getElementById(
                    "editUsername"
                );

            const editPassword =
                document.getElementById(
                    "editPassword"
                );


            // Open Edit Panel

            editAccountBtn.addEventListener(
                "click",
                function () {

                    editFullName.value =
                        account.fullName;

                    editEmail.value =
                        account.email;

                    editUsername.value =
                        account.username;

                    editPassword.value = "";


                    editPanel.classList.add(
                        "show"
                    );


                    editPanel.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );


            // ==================================
            // CANCEL EDIT
            // ==================================

            const cancelEditBtn =
                document.getElementById(
                    "cancelEditBtn"
                );


            cancelEditBtn.addEventListener(
                "click",
                function () {

                    editPanel.classList.remove(
                        "show"
                    );

                }
            );


            // ==================================
            // SAVE ACCOUNT
            // ==================================

            const saveAccountBtn =
                document.getElementById(
                    "saveAccountBtn"
                );


            saveAccountBtn.addEventListener(
                "click",
                function () {

                    const newName =
                        editFullName.value.trim();

                    const newEmail =
                        editEmail.value.trim();

                    const newUsername =
                        editUsername.value.trim();

                    const newPassword =
                        editPassword.value;


                    // Validation

                    if (newName.length < 3) {

                        showToast(
                            "Name is too short ❌",
                            "error"
                        );

                        return;
                    }


                    if (
                        !newEmail.includes("@")
                    ) {

                        showToast(
                            "Enter a valid email ❌",
                            "error"
                        );

                        return;
                    }


                    if (
                        newUsername.length < 3
                    ) {

                        showToast(
                            "Username is too short ❌",
                            "error"
                        );

                        return;
                    }


                    if (
                        newPassword !== "" &&
                        newPassword.length < 6
                    ) {

                        showToast(
                            "Password must be at least 6 characters ❌",
                            "error"
                        );

                        return;
                    }


                    // Update Account

                    account.fullName =
                        newName;

                    account.email =
                        newEmail;

                    account.username =
                        newUsername;


                    // Change password
                    // only if user entered one

                    if (
                        newPassword !== ""
                    ) {

                        account.password =
                            newPassword;

                    }


                    // Save

                    localStorage.setItem(
                        "account",
                        JSON.stringify(
                            account
                        )
                    );


                    // Update username

                    localStorage.setItem(
                        "username",
                        account.username
                    );


                    // Display changes

                    displayAccount();


                    // Close panel

                    editPanel.classList.remove(
                        "show"
                    );


                    showToast(
                        "Account updated successfully! ✅"
                    );

                }
            );

        }

    }

}
// ==========================================
// LOGOUT
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        // Remove login session
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");

        // Show message
        showToast("Logged out successfully 👋");

        // Go to login
        setTimeout(function () {

            window.location.href = "login.html";

        }, 700);

    });

}
// ==========================================
// GUEST LOGIN
// ==========================================

const guestBtn =
    document.getElementById("guestBtn");

if (guestBtn) {

    guestBtn.addEventListener("click", function () {

        // Mark user as guest
        localStorage.setItem(
            "guest",
            "true"
        );

        // Remove normal login
        localStorage.removeItem(
            "loggedIn"
        );

        // Go to website
        window.location.href =
            "home.html";

    });

}
// ==========================================
// WEBSITE ACCOUNT SYSTEM
// ==========================================

const accountBtn =
    document.getElementById("accountBtn");

const accountDropdown =
    document.getElementById("accountDropdown");

const navProfileImage =
    document.getElementById("navProfileImage");

const navUsername =
    document.getElementById("navUsername");

const menuProfileImage =
    document.getElementById("menuProfileImage");

const menuName =
    document.getElementById("menuName");

const menuEmail =
    document.getElementById("menuEmail");


// ------------------------------------------
// DEFAULT IMAGE
// ------------------------------------------

function defaultProfileImage(account) {

    return (
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(account.fullName) +
        "&background=3b82f6&color=fff&size=200"
    );

}


// ------------------------------------------
// LOAD ACCOUNT
// ------------------------------------------

function loadWebsiteAccount() {

    const account =
        JSON.parse(
            localStorage.getItem("account")
        );

    const loggedIn =
        localStorage.getItem("loggedIn");

    const guest =
        localStorage.getItem("guest");


    if (loggedIn === "true" && account) {

        const image =
            account.profileImage ||
            defaultProfileImage(account);


        navProfileImage.src = image;

        menuProfileImage.src = image;

        navUsername.textContent =
            account.username;

        menuName.textContent =
            account.fullName;

        menuEmail.textContent =
            account.email;

    }

    else if (guest === "true") {

        navUsername.textContent =
            "Guest";

        menuName.textContent =
            "Guest";

        menuEmail.textContent =
            "Browsing as guest";

        const guestImage =
            "https://ui-avatars.com/api/?name=Guest&background=475569&color=fff&size=200";

        navProfileImage.src =
            guestImage;

        menuProfileImage.src =
            guestImage;
    }

}


if (
    accountBtn &&
    accountDropdown
) {

    loadWebsiteAccount();


    // Open menu

    accountBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            accountDropdown.classList.toggle(
                "show"
            );

        }
    );


    // Close menu

    document.addEventListener(
        "click",
        function () {

            accountDropdown.classList.remove(
                "show"
            );

        }
    );

}


// ==========================================
// PROFILE
// ==========================================

const profileBtn =
    document.getElementById("profileBtn");

const profileModal =
    document.getElementById("profileModal");

const closeProfile =
    document.getElementById("closeProfile");


if (profileBtn) {

    profileBtn.addEventListener(
        "click",
        function () {

            profileModal.classList.add(
                "show"
            );

            accountDropdown.classList.remove(
                "show"
            );

        }
    );

}


if (closeProfile) {

    closeProfile.addEventListener(
        "click",
        function () {

            profileModal.classList.remove(
                "show"
            );

        }
    );

}


// ==========================================
// PROFILE PHOTO
// ==========================================

const profileUpload =
    document.getElementById(
        "profileUpload"
    );

if (profileUpload) {

    profileUpload.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) return;


            if (
                !file.type.startsWith("image/")
            ) {

                alert(
                    "Please select an image."
                );

                return;

            }


            if (
                file.size > 2 * 1024 * 1024
            ) {

                alert(
                    "Image must be less than 2MB."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function () {

                const account =
                    JSON.parse(
                        localStorage.getItem(
                            "account"
                        )
                    );


                if (!account) return;


                account.profileImage =
                    reader.result;


                localStorage.setItem(
                    "account",
                    JSON.stringify(account)
                );


                loadWebsiteAccount();


                document.getElementById(
                    "profileImage"
                ).src =
                    reader.result;


                showToast(
                    "Profile photo updated! 📸"
                );

            };


            reader.readAsDataURL(file);

        }
    );

}


// ==========================================
// REMOVE PHOTO
// ==========================================

const removePhotoBtn =
    document.getElementById(
        "removePhotoBtn"
    );

if (removePhotoBtn) {

    removePhotoBtn.addEventListener(
        "click",
        function () {

            const account =
                JSON.parse(
                    localStorage.getItem(
                        "account"
                    )
                );


            if (!account) return;


            delete account.profileImage;


            localStorage.setItem(
                "account",
                JSON.stringify(account)
            );


            const image =
                defaultProfileImage(account);


            document.getElementById(
                "profileImage"
            ).src = image;


            loadWebsiteAccount();


            showToast(
                "Profile photo removed 🗑️"
            );

        }
    );

}


// ==========================================
// SWITCH ACCOUNT
// ==========================================

const switchAccountBtn =
    document.getElementById(
        "switchAccountBtn"
    );

if (switchAccountBtn) {

    switchAccountBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "loggedIn"
            );

            localStorage.removeItem(
                "guest"
            );

            localStorage.removeItem(
                "username"
            );


            window.location.href =
                "login.html";

        }
    );

}


// ==========================================
// LOGOUT
// ==========================================

const websiteLogout =
    document.getElementById(
        "logoutBtn"
    );

if (websiteLogout) {

    websiteLogout.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "loggedIn"
            );

            localStorage.removeItem(
                "guest"
            );

            localStorage.removeItem(
                "username"
            );


            showToast(
                "Logged out successfully 👋"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                700
            );

        }
    );

}