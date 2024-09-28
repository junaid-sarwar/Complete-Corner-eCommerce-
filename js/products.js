let renderData = document.getElementById("renderData");
let cartCounts = document.getElementById("cart-counts");
let totalPrice = document.getElementById("total-price");
let renderCartData = document.getElementById("renderCartData");
let cartIcon = document.querySelector(".cart-icon");
let closeCartBtn = document.getElementById("close-cart-btn");
let mycartData = [];
let totalAmount = 0;

async function getData() {
  await fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      const productsArray = data.products;

      productsArray.forEach((ele) => {
        let colDiv = document.createElement("div");
        colDiv.classList.add("col-md-3");

        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        let imgElement = document.createElement("img");
        imgElement.classList.add("myImages", "card-img-top");
        imgElement.setAttribute("src", ele.images[0]);

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let titleElement = document.createElement("p");
        titleElement.classList.add("product-title", "card-title");
        titleElement.textContent = ele.title.slice(0, 35);

        let priceElement = document.createElement("p");
        priceElement.classList.add("price-element", "text-muted");
        priceElement.textContent = `Price: ${ele.price} PKR`;

        let buttonElement = document.createElement("button");
        buttonElement.classList.add("btn-element", "btn", "btn-dark", "w-100");
        buttonElement.textContent = "Add to Cart";

        buttonElement.addEventListener("click", () =>
          addToCart(ele.images[0], ele.price, ele.title.slice(0, 35))
        );

        cardBody.appendChild(titleElement);
        cardBody.appendChild(priceElement);
        cardBody.appendChild(buttonElement);

        cardDiv.appendChild(imgElement);
        cardDiv.appendChild(cardBody);

        colDiv.appendChild(cardDiv);

        renderData.appendChild(colDiv);
      });
    })
    .catch((error) => console.error("Error fetching product data:", error));
}

cartIcon.addEventListener("click", () => {
  renderCartData.classList.toggle("d-none");
});

closeCartBtn.addEventListener("click", () => {
  renderCartData.classList.add("d-none");
});

function addToCart(img, price, title) {
  alert("Item added to Cart");
  mycartData.push({ imag: img, pric: price, titl: title });

  cartCounts.textContent = mycartData.length;
  cartCounts.classList.remove("d-none");

  let cartItemDiv = document.createElement("div");
  cartItemDiv.classList.add("p-2", "bg-white", "border", "shadow-sm", "mb-2");

  let cartContentDiv = document.createElement("div");
  cartContentDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

  let cartLeftDiv = document.createElement("div");
  cartLeftDiv.classList.add("d-flex");

  let imgElement = document.createElement("img");
  imgElement.classList.add("cartImageElement", "me-3");
  imgElement.setAttribute("src", img);
  imgElement.style.width = "64px";
  imgElement.style.height = "64px";

  let cartDetailsDiv = document.createElement("div");
  cartDetailsDiv.classList.add("d-flex", "flex-column");

  let titleElement = document.createElement("h3");
  titleElement.classList.add("cart-title", "fs-6");
  titleElement.textContent = title;

  let priceElement = document.createElement("p");
  priceElement.classList.add("cart-price", "text-muted");
  priceElement.textContent = `${price} PKR`;

  let trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash", "cart-trash-btn", "cursor-pointer");

  trashIcon.addEventListener("click", () => deleteItem(cartItemDiv, price, title));

  cartDetailsDiv.appendChild(titleElement);
  cartDetailsDiv.appendChild(priceElement);

  cartLeftDiv.appendChild(imgElement);
  cartLeftDiv.appendChild(cartDetailsDiv);

  cartContentDiv.appendChild(cartLeftDiv);
  cartContentDiv.appendChild(trashIcon);

  cartItemDiv.appendChild(cartContentDiv);

  renderCartData.appendChild(cartItemDiv);
  updateTotalPrice(price);
}

function deleteItem(cartItemDiv, price, title) {
  alert("Item Deleted from Cart");
  cartItemDiv.remove();

  let index = mycartData.findIndex((item) => item.pric === price && item.titl === title);
  if (index !== -1) {
    mycartData.splice(index, 1);
  }

  // Cart ko count krega
  cartCounts.textContent = mycartData.length;

  if (mycartData.length === 0) {
    cartCounts.classList.add("d-none");
  }

  updateTotalPrice(-price);
}

function updateTotalPrice(price = 0) {
  totalAmount += price;
  totalPrice.textContent = `Your Total Price: ${totalAmount.toFixed(2)} PKR`;
}

getData();
