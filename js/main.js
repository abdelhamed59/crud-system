var productName = document.getElementById(`productName`);
var productPrice = document.getElementById(`productPrice`);
var productModel = document.getElementById(`productModel`);
var productDesc = document.getElementById(`productDesc`);
var myBtn = document.getElementById(`myBtn`)
var mySpan=document.getElementById(`mySpan`)
var updateIndex;
var productList = [];
if (localStorage.getItem(`productList`) == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem(`productList`));
    displayProduct(productList);
}


function AddProduct() {
    if(vlaidateProductName()==true &&  vlaidateProductPrice()==true &&vlaidateProductModel()==true &&vlaidateProductdesc()==true){
        if (mySpan.innerHTML == `Add Product`) {
            var product = {
                name: productName.value,
                price: productPrice.value,
                model: productModel.value,
                desc: productDesc.value
            }
            productList.push(product);
            localStorage.setItem(`productList`, JSON.stringify(productList))
            displayProduct(productList);
            clearForm()

        } else if (mySpan.innerHTML == `Update data`) {
            productList[updateIndex].name = productName.value;
            productList[updateIndex].price = productPrice.value;
            productList[updateIndex].model = productModel.value;
            productList[updateIndex].desc = productDesc.value;
            mySpan.innerHTML = `Add Product`
            localStorage.setItem(`productList`, JSON.stringify(productList))
            displayProduct(productList);
            clearForm()
        }
    }
    
       
      
    
       
    
    productName.style.border = `none`
    productPrice.style.border = `none`
    productModel.style.border = `none`
    productDesc.style.border = `none`

}



function displayProduct(product) {
    var cartona = ``;
    for (var i = 0; i < product.length; i++) {
        cartona += ` <tr>
        <td>${i + 1}</td>
        <td>${product[i].newName ? product[i].newName : product[i].name}</td>
        <td>${product[i].price}</td>
        <td>${product[i].model}</td>
        <td class="td-desc">${product[i].desc}</td>
        <td><button onclick="upDtaeProduct(${i})" class="btn btn-info btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
        
    </tr>`
    };
    document.getElementById(`tBody`).innerHTML = cartona;
}

function clearForm() {
    productName.value = ``;
    productPrice.value = ``;
    productModel.value = ``;
    productDesc.value = ``;
}

function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem(`productList`, JSON.stringify(productList))

    displayProduct(productList);

}

function upDtaeProduct(index) {
    updateIndex = index;
    productName.value = productList[index].name
    productPrice.value = productList[index].price
    productModel.value = productList[index].model
    productDesc.value = productList[index].desc
    mySpan.innerHTML = "Update data"

}




function search(hh) {
    var founded = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(hh.toLowerCase()) == true) {
            productList[i].newName = productList[i].name.toLowerCase().replace(hh.toLowerCase(), `<span class="text-danger fs-6">${hh}</span>`)
            founded.push(productList[i])
        }
    }
    displayProduct(founded)
}


function vlaidateProductName() {
    var regex = /^[A-Z][a-z]{3,12}$/;
    if (regex.test(productName.value) == true) {
        productName.style.border = `5px solid green`
        document.getElementById(`wrongName`).classList.add(`d-none`)
        return true
    } else {
        productName.style.border = `3px solid red`
        document.getElementById(`wrongName`).classList.remove(`d-none`)
        return false
    }
}

function vlaidateProductPrice() {
    var regex = /^([1-9][0-9]{3,4}|100000)$/gm;
    if (regex.test(productPrice.value) == true) {
        productPrice.style.border = `5px solid green`
        document.getElementById(`wrongPrice`).classList.add(`d-none`)
        return true
    } else {
        productPrice.style.border = `3px solid red`
        document.getElementById(`wrongPrice`).classList.remove(`d-none`)
        return false
    }
}

function vlaidateProductModel() {
    var regex = /^(tv|mobile|laptop)$/gmi
    if (regex.test(productModel.value) == true) {
        productModel.style.border = `5px solid green`
        document.getElementById(`wrongmodel`).classList.add(`d-none`)
        return true
    } else {
        productModel.style.border = `3px solid red`
        document.getElementById(`wrongmodel`).classList.remove(`d-none`)
        return false
    }
}

function vlaidateProductdesc() {
    var regex = /^[a-z ]{50,300}$/gmi
    if (regex.test(productDesc.value) == true) {
        productDesc.style.border = `5px solid green`
        document.getElementById(`wrongdesc`).classList.add(`d-none`)
        return true
    } else {
        productDesc.style.border = `3px solid red`
        document.getElementById(`wrongdesc`).classList.remove(`d-none`)
        return false
    }
}


