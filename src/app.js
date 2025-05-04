/************************************************************************************ WOO COMMERCE API ************************************************************************************/
/*****************************************************************************************************************************************************************************************/

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: 'https://www.3dprintlab.rs', 
  consumerKey: 'ck_b730b558537bfef917017b2f92da03832bbcd606',
  consumerSecret: 'cs_f140e42bae26e0ec4f2254aa09220f3cad6469ca',
  version: 'wc/v3'
});

const productOneName = document.getElementById("prd1Name");
const productOneSku = document.getElementById("sku1");
const productOneQty = document.getElementById("qty1");

const productTwoName = document.getElementById("prd2Name");
const productTwoSku = document.getElementById("sku2");
const productTwoQty = document.getElementById("qty2");

const productThreeName = document.getElementById("prd3Name");
const productThreeSku = document.getElementById("sku3");
const productThreeQty = document.getElementById("qty3");

function setProductOnePrams(name, sku, qty) {
    productOneName.value = name;
    productOneSku.value = sku;
    productOneQty.value = qty;
}

function setProductTwoPrams(name, sku, qty) {
    productTwoName.value = name;
    productTwoSku.value = sku;
    productTwoQty.value = qty;
}

function setProductThreePrams(name, sku, qty) {
    productThreeName.value = name;
    productThreeSku.value = sku;
    productThreeQty.value = qty;
}

function emptyProductOnePrams() {
    productOneName.value = "";
    productOneSku.value = "";
    productOneQty.value = "";
}

function emptyProductTwoPrams() {
    productTwoName.value = "";
    productTwoSku.value = "";
    productTwoQty.value = "";
}

function emptyProductThreePrams() {
    productThreeName.value = "";
    productThreeSku.value = "";
    productThreeQty.value = "";
}

function emptyAllInputs() {
    emptyProductOnePrams();
    emptyProductTwoPrams();
    emptyProductThreePrams();
}

/*
api.get("products", { sku: "0154" })
.then((res) => {
  const product = res.data;
  console.log(product);
})
.catch((err) => {
  console.error("Error:", err.response?.data || err.message);
});
*/


/*****************************************************************************************************************************************************************************************/
/************************************************************************************ WOO COMMERCE API ************************************************************************************/


const timeEl = document.getElementById("time");

const updateTime = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const time = date.toLocaleTimeString();
    const day = date.toLocaleDateString(undefined, options);

    //console.log(day);

    timeEl.innerHTML = `${day}, ${time}`;
}
updateTime();
const interval = setInterval(updateTime, 1000);

const editButtons = document.querySelectorAll("#edit");

const editField = document.getElementById("editField");
const searchBar = document.getElementById("searchBar");
const containers = document.getElementById("cntrs");

const spinner = document.getElementById("spin");

const closeBtn = document.getElementById("close");

let clicked = false;

editButtons.forEach(editBtn => {
    editBtn.addEventListener("click", async () => {
        if (!clicked) {
            clicked = true;
            searchBar.classList.replace("search-bar", "search-bar-false");
            containers.classList.replace("containers", "containers-false");
            spinner.classList.replace("spinner-false", "spinner");
            //editField.classList.replace("edit-field-false", "edit-field");
        }
        let btnId = parseInt(editBtn.className.slice(1));
        //console.log(btnId);
        let skus = [`${btnId}`.padStart(4, '0'), `${btnId+1}`.padStart(4, '0'), `${btnId+2}`.padStart(4, '0')];

        console.log(skus);

        for (let n = 0; n < skus.length; n++) {
            try {
                const res = await api.get("products", { sku: skus[n] });
                if (res.data[0] != undefined) {
                    let product = {
                        name: res.data[0].name,
                        qty: res.data[0].stock_quantity,
                    }
                    n == 0 ? setProductOnePrams(product.name, skus[n], product.qty) : n == 1 ? setProductTwoPrams(product.name, skus[n], product.qty) : setProductThreePrams(product.name, skus[n], product.qty);
                } else {
                    n == 0 ? emptyProductOnePrams() : n == 1 ? emptyProductTwoPrams() : emptyProductThreePrams();
                }
            } catch (err) {
                console.error(err);
            }
        }

        spinner.classList.replace("spinner", "spinner-false");
        editField.classList.replace("edit-field-false", "edit-field");
    });
})

closeBtn.addEventListener("click", () => {
    if (clicked) {
        clicked = false;
        editField.classList.replace("edit-field", "edit-field-false");
        searchBar.classList.replace("search-bar-false", "search-bar");
        containers.classList.replace("containers-false", "containers");
    }
})

const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", async e => {
    e.preventDefault();
    let fprdtName = productOneName.value;
    let fsku = productOneSku.value;
    let fprdtQty = productOneQty.value;
    
    let sprdtName = productTwoName.value;
    let ssku = productTwoSku.value;
    let sprdtQty = productTwoQty.value;

    let tprdtName = productThreeName.value;
    let tsku = productThreeSku.value;
    let tprdtQty = productThreeQty.value;

    let skus = [fsku, ssku, tsku];

    console.log(skus);

    let newFirstProduct = {
        name: fprdtName,
        qty: fprdtQty
    }

    let newSecondProduct = {
        name: sprdtName,
        qty: sprdtQty
    }

    let newThirdProduct = {
        name: tprdtName,
        qty: tprdtQty
    }

    console.log(`First product updated: ${newFirstProduct.name} | ${newFirstProduct.qty}`);
    console.log(`Second product updated: ${newSecondProduct.name} | ${newSecondProduct.qty}`);
    console.log(`Thrind product updated: ${newThirdProduct.name} | ${newThirdProduct.qty}`);

    spinner.classList.replace("spinner-false", "spinner");
    editField.classList.replace("edit-field", "edit-field-false");

    for (let i = 0; i < skus.length; i++) {
        try {
            let res = await api.get("products", { sku: skus[i] });

            if (res.data[0] != undefined) {
                await api.put(`products/${res.data[0].id}`, {
                    name: i == 0 ? newFirstProduct.name : i == 1 ? newSecondProduct.name : newThirdProduct.name,
                    stock_quantity: i == 0 ? newFirstProduct.qty : i == 1 ? newSecondProduct.qty : newThirdProduct.qty
                }).catch(err => {console.error(err)}); 
            } else {
                return;
            }
        } catch (err) {
            console.error(err);
        }
    }

    spinner.classList.replace("spinner", "spinner-false");

    clicked = false;
    editField.classList.replace("edit-field", "edit-field-false");
    searchBar.classList.replace("search-bar-false", "search-bar");
    containers.classList.replace("containers-false", "containers");
    emptyAllInputs();
})

const searchInput = document.getElementById("search");

document.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        if (searchInput.value != "") {
            let button = document.querySelector(`.b${searchInput.value}`);
            searchInput.value = "";
            button.style.backgroundColor = "green";
            setTimeout(() => {
                button.style.backgroundColor = "#D9D9D9";
            }, 500);
            setTimeout(() => {
                button.style.backgroundColor = "green";
            }, 1000);
            setTimeout(() => {
                button.style.backgroundColor = "#D9D9D9";
            }, 1500);
            setTimeout(() => {
                button.style.backgroundColor = "green";
            }, 2000);
            setTimeout(() => {
                button.style.backgroundColor = "#D9D9D9";
            }, 2500);
        }
        else return;
    }
})