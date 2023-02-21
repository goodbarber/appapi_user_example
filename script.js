/**
 * Success callback that will be called if the `gb.user.getCurrent` call is successful
 * @param {*} userInfo Contains all the data related to the user
 */
function getCurrentUserSuccessCallback(userInfo) {
    let userName = userInfo.username;
    let pictureUrl = userInfo.picture_url;
    displayUserInfo(userName, pictureUrl);
    generateQrCode(userInfo);
}

/**
 * Error callback that will be called if the `gb.user.getCurrent` call fails
 * @param {*} error The error object that contains error information
 */
function getCurrentUserErrorCallback(error) {
    displayLoginButton();
}

/**
 * Retrieves user information
 */
function getInfoUser() {
    gb.user.getCurrent(getCurrentUserSuccessCallback, getCurrentUserErrorCallback);
}



/* RENDER FUNCTIONS (not related to the toolkit) */

function generateQrCode(userInfo) {
    if(userInfo.email) {
        new QRCode(document.getElementById("qrcode"), `mailto:${userInfo.email}`);
    }
}

function displayLoginButton(){
    hideElements();
    let loginButton = document.getElementById("login-btn");
    loginButton.style.display = "block";
}

function displayUserInfo(userName, pictureUrl) {
    hideElements();
    console.log("pictureUrl", pictureUrl);
    let userCard = document.getElementById("user-card");
    userCard.style.display = "flex";
    let nameComponent = document.getElementById("user-name");
    let pictureComponent = document.getElementById("user-picture");
    nameComponent.innerHTML = userName.toUpperCase();
    if (pictureUrl) {
        pictureComponent.src = pictureUrl;
        pictureComponent.style.display = 'block';
    }
}

function hideElements() {
    let loginContainer = document.getElementById("login-btn");
    let cardContainer = document.getElementById("user-card");
    cardContainer.style.display = "none";
    loginContainer.style.display = "none";
}

// On login callback will be call when the user logs in
gb.user.onlogin = getInfoUser;
gb.user.onlogout = getInfoUser;
gb.onload = getInfoUser;
