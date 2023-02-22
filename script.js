var qrcode;


/**
 * Success callback that will be called if the `gb.user.getCurrent` call is successful
 * @param {*} userInfo Contains all the data related to the user
 */
function getCurrentUserSuccessCallback(userInfo) {
    let userName = "";
    if(userInfo.username) {
        // UserInfo properties on classic
        userName = userInfo.username;
    } else {
        // UserInfo properties on commerce and IAP
        let firstName = userInfo.first_name;
        let lastName = userInfo.last_name;
        if(lastName && firstName) userName = `${firstName} ${lastName}`;
    }
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
        qrcode = new QRCode(document.getElementById("qrcode"), `mailto:${userInfo.email}`);
    } else {
        qrcode && qrcode.clear();
    }
}

function displayLoginButton(){
    hideElements();
    let loginButton = document.getElementById("login-btn");
    loginButton.style.display = "block";
}

function displayUserInfo(userName, pictureUrl) {
    hideElements();
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
    qrcode && qrcode.clear();
}

// On login callback will be call when the user logs in.
gb.user.onlogin = getInfoUser;
// On logout callback will be call when the user logs out.
gb.user.onlogout = hideElements;
// On update callback will be call if the user has been updated.
gb.user.onupdate = getInfoUser;
// On load callback will be call when the page finish to load.
gb.onload = getInfoUser;
