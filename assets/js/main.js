import { Products as data } from "../../data.js";

// Top Bar Slider
let span1 = document.getElementById("top-bar-slide-1");
let span2 = document.getElementById("top-bar-slide-2");

if (span1 && span2) {
  let isSpan1Visible = true;

  setInterval(() => {
    if (isSpan1Visible) {
      span1.classList.remove("opacity-100");
      span1.classList.add("opacity-0");

      span2.classList.remove("opacity-0");
      span2.classList.add("opacity-100");
    } else {
      span1.classList.remove("opacity-0");
      span1.classList.add("opacity-100");

      span2.classList.remove("opacity-100");
      span2.classList.add("opacity-0");
    }
    isSpan1Visible = !isSpan1Visible;
  }, 3000);
} else {
  console.warn("Top bar slider elements not found in the DOM.");
}

// Header
const header = document.getElementById("main-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");
const drawerOverlay = document.getElementById("drawer-overlay");

if (header && menuToggle && mobileDrawer && drawerOverlay) {
  // Functions for Mobile Drawer
  const toggleDrawer = (isOpen) => {
    mobileDrawer.classList.toggle("-translate-x-full", !isOpen);
    drawerOverlay.classList.toggle("hidden", !isOpen);
  };

  // Functions for Header Scroll Behavior
  const handleScroll = () => {
    const shouldFixHeader = window.scrollY > 50;
    header.classList.toggle("fixed", shouldFixHeader);
    header.classList.toggle("top-0", shouldFixHeader);
    header.classList.toggle("left-0", shouldFixHeader);
    header.classList.toggle("shadow-lg", shouldFixHeader);
    header.classList.toggle("relative", !shouldFixHeader);
  };

  // Event Listeners
  menuToggle.addEventListener("click", () => toggleDrawer(true));
  drawerOverlay.addEventListener("click", () => toggleDrawer(false));
  window.addEventListener("scroll", handleScroll);
} else {
  console.warn("Header or related elements not found in the DOM.");
}

// Product page accordion
if (document.querySelectorAll('.accordion-header')) {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('svg');

      if (content && icon) {
        // Toggle content visibility
        content.classList.toggle('hidden');

        // Rotate the arrow icon
        icon.classList.toggle('rotate-180');
      } else {
        console.warn("Accordion content or icon not found in the DOM.");
      }
    });
  });
} else {
  console.warn("Accordion headers not found in the DOM.");
}

const counterElement = document.getElementById("counter");
if (counterElement) {
  counterElement.innerHTML = `products (${data.length})`;
} else {
  console.warn("Counter element not found in the DOM.");
}

let product = document.getElementById("product-grid");
let paginationContainer = document.getElementById("pagination");

if (product && paginationContainer) {
  let currentPage = 1;
  let itemsPerPage = 8;
  let filteredData = [...data];

  const showProduct = () => {
    product.innerHTML = "";
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = filteredData.slice(start, end);

    paginatedItems.forEach((val) => {
      product.innerHTML += `
      <a href="/product.html?id=${val.id}">
        <div class="relative bg-white shadow-md rounded-lg group">
          <img src="${val.imgUrl}" alt="Product Image" class="w-full rounded-tr-lg rounded-tl-lg" />
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800">${val.Name}</h3>
            <p class="text-gray-600 text-sm">${val.Description.slice(0, 60)}...</p>
            <p class="mt-2 text-red-500 font-bold">${val.Price}</p>
          </div>

          <div class="flex-col flex gap-2 absolute -right-8 -top-4 transition-all duration-300 transform opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:-right-4 group-hover:-top-0 group-hover:flex">
            <div class="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div class="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </a>`;
    });

    updatePagination();
  };

  const updatePagination = () => {
    paginationContainer.innerHTML = "";
    let totalPages = Math.ceil(filteredData.length / itemsPerPage);

    paginationContainer.innerHTML += `
      <button onclick="changePage(${currentPage - 1})" class="w-10 h-10 flex items-center justify-center bg-red-700 text-white rounded-full hover:bg-red-800" ${currentPage === 1 ? "disabled" : ""}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>`;

    for (let i = 1; i <= totalPages; i++) {
      paginationContainer.innerHTML += `
        <span onclick="changePage(${i})" class="cursor-pointer px-3 py-1 rounded-md ${i === currentPage ? "bg-red-700 text-white" : "hover:text-red-600"}">${i}</span>`;
    }

    paginationContainer.innerHTML += `
      <button onclick="changePage(${currentPage + 1})" class="w-10 h-10 flex items-center justify-center bg-red-700 text-white rounded-full hover:bg-red-800" ${currentPage === totalPages ? "disabled" : ""}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>`;
  };

  window.changePage = (page) => {
    let totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    showProduct();
  };

  window.removeCategory = (category) => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      if (checkbox.value == category) {
        checkbox.checked = false;
      }
    });
    checkboxes.forEach((checkbox) => {
      if (checkbox.value === category) {
        checkbox.dispatchEvent(new Event("change"));
      }
    });
  };

  document.getElementById("price-filter")?.addEventListener("change", (event) => {
    let value = event.target.value;
    if (value == "low-to-high") {
      filteredData.sort((a, b) => a.Price - b.Price);
    } else if (value == "high-to-low") {
      filteredData.sort((a, b) => b.Price - a.Price);
    }
    currentPage = 1;
    showProduct();
  });

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let selectedCategories = [
        ...document.querySelectorAll('input[type="checkbox"]:checked'),
      ].map((c) => c.value);

      // filter box after clicked
      let filter_box = document.getElementById("filter-box");
      if (filter_box) {
        filter_box.innerHTML = "";
        selectedCategories.forEach((category) => {
          filter_box.innerHTML += `<div onclick="removeCategory('${category}')" class="flex items-center bg-red-700 text-white rounded-full hover:bg-red-800 cursor-pointer py-2 px-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span>${category}</span>
                          </div>`;
        });
      } else {
        console.warn("Filter box element not found in the DOM.");
      }

      currentPage = 1;
      filteredData = selectedCategories.length
        ? data.filter((product) => selectedCategories.includes(product.Category))
        : [...data];

      showProduct();
    });
  });

  showProduct();
} else {
  console.warn("Product grid or pagination container not found in the DOM.");
}


const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const productData = data.find((p) => p.id === Number(productId));

const productDetails = document.getElementById('product-details');

if (!productData) {
  productDetails ? productDetails.innerHTML = "<p>Product not found.</p>": console.warn('product details not found');
} else {
  productDetails.innerHTML = `
    <!-- Product Image -->
    <div class="product-image md:w-1/2">
        <img 
            src="${productData.FeatureImg}" 
            alt="${productData.Name}" 
            class="w-full h-auto rounded-lg"
        >
    </div>

    <!-- Product Information -->
    <div class="product-info md:w-1/2 flex flex-col gap-4">
        <!-- Product Title -->
        <h1 class="product-title text-3xl font-bold text-gray-900">
            ${productData.Name}
        </h1>

        <!-- Pricing Section -->
        <div class="product-pricing flex gap-3 items-baseline">
            <span class="original-price text-xl text-gray-500 line-through">
                Rs.${productData.Price}
            </span>
            <span class="discounted-price text-2xl font-semibold text-gray-900">
                Rs.${productData.Sale_Price}
            </span>
        </div>

        <!-- Product Description -->
        <p class="product-description text-gray-700">
            ${productData.Description}
        </p>

        <!-- Additional Information -->
        <p class="shipping-info text-sm text-gray-500">
            Tax included. Shipping calculated at checkout.
        </p>

        <!-- Call-to-Action Buttons -->
        <div class="product-actions flex gap-4">
            <button class="add-to-cart bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
            </button>
            <button class="buy-now bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Buy it now
            </button>
        </div>
    </div>
  `;
}
