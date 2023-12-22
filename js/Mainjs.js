var addProductBtn = document.getElementById("addProduct");
var updateProductBtn = document.getElementById("updateProductBtn");
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productType = document.getElementById("productType");
var productCondition = document.getElementById("productCondition");
var tableBody = document.getElementById("tableBody");
var searchInput = document.getElementById("searchInput");
var totalPrice = document.getElementById("totalPrice");
var productRepeat = document.getElementById("productRepeat");
var updateIndex = 0;
var allProducts = [];

if (localStorage.getItem("products") != null) {
  allProducts = JSON.parse(localStorage.getItem("products"));
  displayData();
  totalPrices();
}
// Start Validition

var nameProdictRegex = /^[a-zA-Z0-9 ]{5,}$/;
var priceProdictRegex = /^\d{1,8}$/;
var typeProdictRegex = /^[a-zA-Z0-9 ]{3,}$/;
var conditionProdictRegex = /^[a-zA-Z0-9 ]{3,}$/;

productName.addEventListener("input", () => {
  nameProductRegexx();
  if (productName.value == "") {
    productName.classList.remove("is-invalid");
    productName.classList.remove("is-valid");
  }
});
productPrice.addEventListener("input", () => {
  priceProductRegexx();
  if (productPrice.value == "") {
    productPrice.classList.remove("is-invalid");
    productPrice.classList.remove("is-valid");
  }
});
productType.addEventListener("input", () => {
  typeProductRegexx();
  if (productType.value == "") {
    productType.classList.remove("is-invalid");
    productType.classList.remove("is-valid");
  }
});
productCondition.addEventListener("input", () => {
  conditionProductRegexx();
  if (productCondition.value == "") {
    productCondition.classList.remove("is-invalid");
    productCondition.classList.remove("is-valid");
  }
});

function nameProductRegexx() {
  if (nameProdictRegex.test(productName.value)) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    return true;
  } else if (nameProdictRegex.test(productName.value) == false) {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
  }
}
function priceProductRegexx() {
  if (priceProdictRegex.test(productPrice.value)) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    return true;
  } else if (priceProdictRegex.test(productPrice.value) == false) {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
  }
}
function typeProductRegexx() {
  if (typeProdictRegex.test(productType.value)) {
    productType.classList.add("is-valid");
    productType.classList.remove("is-invalid");
    return true;
  } else if (typeProdictRegex.test(productType.value) == false) {
    productType.classList.add("is-invalid");
    productType.classList.remove("is-valid");
  }
}
function conditionProductRegexx() {
  if (conditionProdictRegex.test(productCondition.value)) {
    productCondition.classList.add("is-valid");
    productCondition.classList.remove("is-invalid");
    return true;
  } else if (conditionProdictRegex.test(productCondition.value) == false) {
    productCondition.classList.add("is-invalid");
    productCondition.classList.remove("is-valid");
  }
}

// End Validition

addProductBtn.addEventListener("click", function () {
  addProduct();
});

function addProduct() {
  if (
    nameProductRegexx() == true &&
    priceProductRegexx() == true &&
    typeProductRegexx() == true &&
    conditionProductRegexx() == true
  ) {
    var product = {
      productName: productName.value,
      price: productPrice.value,
      type: productType.value,
      condition: productCondition.value,
    };
    let addCount = productRepeat.value;
    let addCountTest = 1;
    do {
      allProducts.push(product);
      addCountTest++;
    } while (addCountTest <= productRepeat.value);
    localStorage.setItem("products", JSON.stringify(allProducts));
    displayData();
    totalPrices();
    clearInputs();
    clearInputsValidition();
    addincrement();
  }
}

function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productType.value = "";
  productCondition.value = "";
  searchInput.value = "";
  productRepeat.value = "";
}
function clearInputsValidition() {
  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-invalid");
  productPrice.classList.remove("is-valid");
  productType.classList.remove("is-invalid");
  productType.classList.remove("is-valid");
  productCondition.classList.remove("is-invalid");
  productCondition.classList.remove("is-valid");
}

function displayData() {
  var productShow = "";
  for (var i = 0; i < allProducts.length; i++) {
    productShow += `  <tr>
    <td >${i + 1}</td>
    <td>${allProducts[i].productName}</td>
    <td>${allProducts[i].price} $ </td>
    <td>${allProducts[i].type}</td>
    <td>${allProducts[i].condition}</td>
    <td>
          <button onclick="updateProductFrist( ${i} )" class="btn btn-warning">update</button>
          <button onclick="deleteProduct( ${i} )" class="btn btn-danger">delete</button>
        </td>
  </tr>`;
  }
  tableBody.innerHTML = productShow;
}

function deleteProduct(deleteIndex) {
  allProducts.splice(deleteIndex, 1);
  displayData();
  totalPrices();
  adddecrement();
  localStorage.setItem("products", JSON.stringify(allProducts));
  searchInput.value = "";
}

function updateProductFrist(Index) {
  productName.value = allProducts[Index].productName;
  productPrice.value = allProducts[Index].price;
  productType.value = allProducts[Index].type;
  productCondition.value = allProducts[Index].condition;
  updateIndex = Index;
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.remove("d-none");
}

updateProductBtn.addEventListener("click", function () {
  updateProductSec();
});

function updateProductSec() {
  var product = {
    productName: productName.value,
    price: productPrice.value,
    type: productType.value,
    condition: productCondition.value,
  };
  allProducts.splice(updateIndex, 1, product);
  localStorage.setItem("products", JSON.stringify(allProducts));
  displayData();
  addProductBtn.classList.remove("d-none");
  updateProductBtn.classList.add("d-none");
  productName.value = "";
  productPrice.value = "";
  productType.value = "";
  productCondition.value = "";
  searchInput.value = "";
}

searchInput.addEventListener("input", function () {
  searchRealTime();
});

function searchRealTime() {
  var productShow = "";
  for (var i = 0; i < allProducts.length; i++) {
    if (
      allProducts[i].productName
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      allProducts[i].newName = allProducts[i].productName
        .toLowerCase()
        .replace(
          searchInput.value.toLowerCase(),
          `<span class="text-danger fw-bold">${searchInput.value}</span>`
        );
      productShow += `  <tr>
    <td >${i + 1}</td>
    <td>${allProducts[i].newName}</td>
    <td>${allProducts[i].price} $ </td>
    <td>${allProducts[i].type}</td>
    <td>${allProducts[i].condition}</td>
    <td>
          <button onclick="updateProductFrist( ${i} )" class="btn btn-warning">update</button>
          <button onclick="deleteProduct( ${i} )" class="btn btn-danger">delete</button>
        </td>
  </tr>`;
    }
    tableBody.innerHTML = productShow;
  }
}

function totalPrices() {
  var amountofProducts = 0;
  for (var i = 0; i < allProducts.length; i++) {
    amountofProducts += 1;
  }
  totalPrice.innerHTML = amountofProducts;
}

var LoginBtn = document.getElementById("LoginBtn");
var toplogin = document.getElementById("toplogin");
var bottomlogin = document.getElementById("bottomlogin");
var userName = document.getElementById("userName");
var passWord = document.getElementById("passWord");
var user = [];
LoginBtn.addEventListener("click", function (e) {
  loginDisplayChecked();
});
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    loginDisplayChecked();
  }
});

function loginDisplayChecked() {
  if (userName.value == "admin" && passWord.value == "admin" ) {

    toplogin.classList.add("topLoginAnimation");
    bottomlogin.classList.add("bottomLoginAnimation");
    var userObject = {
      NameUser: userName.value,
      passWordUser: passWord.value,
    };
    user.push(userObject);
    localStorage.setItem("user", JSON.stringify(user));
    changeHTMLrule();
    clearinputs();
    addfloating();
    passWordEmpity();
    removeValidations();
  } else if  ( passWord.value == "user" && passWord.value == "user"
    ) {

    toplogin.classList.add("topLoginAnimation");
    bottomlogin.classList.add("bottomLoginAnimation");
    var userObject = {
      NameUser: userName.value,
      passWordUser: passWord.value,
    };
    user.push(userObject);
    localStorage.setItem("user", JSON.stringify(user));
    changeHTMLrule();
    clearinputs();
    addfloating();
    passWordEmpity();
    removeValidations();
  }
  
  else {
    if (validationInputs() != true) {
      userName.classList.add("is-invalid");
      if (userName.value == "") {
        validationInLoginUserName()
      }
    }
    else if (passWord.value == "") {
      passWord.classList.add("is-invalid");
      validationInLoginPassWord()
    }
    else if (checkPasswordValid() != true) {
      passWord.classList.add("is-invalid");
      validationInLoginPassWord()
    }
  }
}
function clearinputs() {
  userName.value = "";
  passWord.value = "";
}

if (localStorage.getItem("user") != null) {
  toplogin.classList.add("d-none");
  bottomlogin.classList.add("d-none");
}

var loginUserBtn = document.getElementById("loginUser");
var menuToggle = document.getElementById("menuToggle");

loginUserBtn.addEventListener("click", function (e) {
  menuToggle.classList.toggle("activeToggle");
  e.stopPropagation();
});
loginUserBtn.addEventListener("click", function () {
  menuToggle.classList.toggle("d-none");
});

document.addEventListener("click", function (e) {
  if (e.target != loginUserBtn && e.target != menuToggle) {
    if (menuToggle.classList.contains("activeToggle")) {
      menuToggle.classList.toggle("activeToggle");
    }
  }
});

menuToggle.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Change Rule Sites Buttons
var SwitchBtn = document.getElementById("SwitchBtn");
var logoutBtn = document.getElementById("logoutBtn");
SwitchBtn.addEventListener("click", function () {
  localStorage.removeItem("user");
  toplogin.classList.remove("topLoginAnimation");
  bottomlogin.classList.remove("bottomLoginAnimation");
  toplogin.classList.remove("d-none");
  bottomlogin.classList.remove("d-none");
  user = [];
  bookMark.classList.add('d-none');
  adminPage.classList.add('d-none');
  menuToggle.classList.add("d-none");
});
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("user");
  toplogin.classList.remove("topLoginAnimation");
  bottomlogin.classList.remove("bottomLoginAnimation");
  toplogin.classList.remove("d-none");
  bottomlogin.classList.remove("d-none");
  user = [];
  bookMark.classList.add('d-none');
  adminPage.classList.add('d-none');
  menuToggle.classList.add("d-none");
});
// Change Rule Sites Buttons


// Start Validation LogIn
var regexUseName = /^(admin|user)$/;
var regexPassword = /^(admin|user)$/;

// Real Time Validation >>>>
function passWordEmpity() {
  if (regexPassword.test(passWord.value) == false) {
    passWord.classList.add("is-invalid");
  }
}



function checkPasswordValid() {
  if (regexPassword.test(passWord.value) == false) {
    return false ;
  } else {
    return true ;
  }
}


userName.addEventListener("input", function () {
  validationInputs();
  validationInTypeRemove();
  if (userName.value == "") {
    userName.classList.remove("is-invalid");
    userName.classList.remove("is-valid");
  }
});

function validationInputs() {
  if (regexUseName.test(userName.value)) {
    userName.classList.add("is-valid");
    userName.classList.remove("is-invalid");
    return true;
  } else if (regexUseName.test(userName.value) == false) {
    userName.classList.add("is-invalid");
    userName.classList.remove("is-valid");
    return false;
  }
}
passWord.addEventListener("input", function () {
  validationInTypeRemove();
  passWord.classList.remove("is-invalid");
});


// Clear After Check Every Thing Is Oky >>>>>

function removeValidations() {
  passWord.classList.remove("is-invalid");
  passWord.classList.remove("is-valid");
  userName.classList.remove("is-invalid");
  userName.classList.remove("is-valid");
}
// End Validation LogIn

var validationSpan1 = document.querySelector(".validationSpan1"); // icon for user name
var validationSpan2 = document.querySelector(".validationSpan2"); // icon for password

function validationInLoginUserName() {
  validationSpan1.classList.remove("d-none");
}
function validationInLoginPassWord() {
  validationSpan2.classList.remove("d-none");
}
function validationInTypeRemove() {
  validationSpan1.classList.add("d-none");
  validationSpan2.classList.add("d-none");
}


// End Change User rule In HTML
if (localStorage.getItem('user') != null ) {
  var localRule =  JSON.parse(localStorage.getItem('user'))[0].NameUser;
}
var adminText = document.querySelector('.adminText');
var userText = document.querySelector('.userText');
var adminPage = document.getElementById('admin');
var bookMark = document.getElementById('bookMark');

  function changeHTMLrule() {
    if (userName.value == 'admin') {
      adminText.classList.remove('d-none');
      userText.classList.add('d-none');
      localStorage.setItem("user", JSON.stringify(user));
      adminPage.classList.remove('d-none');
      bookMark.classList.add('d-none');
    }
    
    else  if (userName.value == 'user') {
      userText.classList.remove('d-none');
      adminText.classList.add('d-none');
      localStorage.setItem("user", JSON.stringify(user));
      adminPage.classList.add('d-none');
      bookMark.classList.remove('d-none');
    }
  }
  // local


if (localStorage.getItem('user') != null) {
  if (localRule == 'admin') {
    adminText.classList.remove('d-none');
    adminPage.classList.remove('d-none');
    bookMark.classList.add('d-none');
    
  }
  
  else  if (localRule == 'user') {
    userText.classList.remove('d-none');
    adminPage.classList.add('d-none');
    bookMark.classList.remove('d-none');
  }
}



// End Change User rule In HTML

// Start Walk LAyer
var floatingLogin = document.getElementById("floatingLogin");
function addfloating() {
  floatingLogin.classList.remove("d-none");
  setTimeout(function () {
    floatingLogin.classList.add("d-none");
  }, 4000);
}
// End Walk LAyer

// Start  Clear Crud From Items
var storeClear = document.getElementById("storeClear");
storeClear.addEventListener("click", () => {
  clearCrudFromItems();
  adddecrement();
});
function clearCrudFromItems() {
  allProducts = [];
  localStorage.removeItem("products");
  displayData();
  totalPrices();
}
// End  Clear Crud From Items

// Start Add Icons For Total Items
var increment = document.getElementById("increment");
var decrement = document.getElementById("decrement");

function addincrement() {
  increment.classList.remove("d-none");
  increment.classList.add("increment");
  setTimeout(function () {
    increment.classList.add("d-none");
    increment.classList.remove("increment");
  }, 500);
}

function adddecrement() {
  decrement.classList.remove("d-none");
  decrement.classList.add("decrement");
  setTimeout(function () {
    decrement.classList.add("d-none");
    decrement.classList.remove("decrement");
  }, 500);
}
// Etart Add Icons For Total Items


