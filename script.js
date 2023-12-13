var qrcode;


/**
 * Success callback that will be called if the `gb.user.getCurrent` call is successful
 * @param {*} userInfo Contains all the data related to the user
 */
function getCurrentUserSuccessCallback(userInfo) {
    let userName = "";
    if(userInfo.username) {
        userName = userInfo.username;
    } else {
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
function getCurrentUserErrorCallback() {
	let userInfo = {"username":"John Doe","email":"john@doe.com","picture_url":""};
	let userName = userInfo.username;
	let pictureUrl = userInfo.picture_url;
    displayUserInfo(userName, pictureUrl);
    generateQrCode(userInfo);
}

/**
 * Retrieves user information
 */
function getInfoUser() {
    gb.user.getCurrent(getCurrentUserSuccessCallback, getCurrentUserErrorCallback);
}



/* RENDER FUNCTIONS (not related to the toolkit) */

function generateQrCode(userInfo) {
    if(userInfo.email && (typeof qrcode == "undefined")) {
        qrcode = new QRCode(document.getElementById("qrcode"), `mailto:${userInfo.email}`);
    } else {
        qrcode && qrcode.clear();
    }
}

function displayUserInfo(userName, pictureUrl) {
	if(document.querySelector(".login-btn")){
		let loginButton = document.getElementById("login-btn");
		loginButton.style.display = "none";
	}
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
	let cardContainer = document.getElementById("user-card");
    cardContainer.style.display = "none";
    qrcode && qrcode.clear();
}


// On update callback will be call if the user has been updated.
gb.user.onupdate = getInfoUser;
// On appear callback will be call when the web view finish to load.
gb.onappear = getInfoUser;
