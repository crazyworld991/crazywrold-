// Application State
const state = {
    page: 'home', // 'home', 'women', 'men', 'product', 'checkout'
    activeProductId: null,
    cart: [],
    products: window.productData || [],
    authTab: 'login'
};

// DOM Elements
const appContent = document.getElementById('app-content');
const templates = {
    home: document.getElementById('tpl-home'),
    listing: document.getElementById('tpl-listing'),
    product: document.getElementById('tpl-product'),
    checkout: document.getElementById('tpl-checkout')
};

// Init UI Components
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCart();
    initAuthModal();
    renderPage();
});

// --- State Management & Routing ---

function navigateTo(page, productId = null) {
    state.page = page;
    state.activeProductId = productId;
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.remove('open');
    
    renderPage();
}

function renderPage() {
    appContent.innerHTML = ''; // Clear current content
    
    let content;
    switch (state.page) {
        case 'home':
            content = templates.home.content.cloneNode(true);
            appContent.appendChild(content);
            renderHome();
            break;
        case 'women':
        case 'men':
            content = templates.listing.content.cloneNode(true);
            appContent.appendChild(content);
            renderListing(state.page);
            break;
        case 'product':
            content = templates.product.content.cloneNode(true);
            appContent.appendChild(content);
            renderProductDetail(state.activeProductId);
            break;
        case 'checkout':
            content = templates.checkout.content.cloneNode(true);
            appContent.appendChild(content);
            renderCheckout();
            break;
        default:
            navigateTo('home');
            break;
    }
    
    // Attach global listeners for dynamically created nav links
    attachNavListeners();
}

function attachNavListeners() {
    document.querySelectorAll('[data-page]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const page = el.getAttribute('data-page');
            const cat = el.getAttribute('data-category');
            
            // Handle specific routing logic if needed
            navigateTo(page);
            
            // If navigating to listing with category pre-filter
            if(cat && (page === 'women' || page === 'men')) {
                setTimeout(() => {
                    const filterLinks = document.querySelectorAll('.filter-list a');
                    filterLinks.forEach(link => {
                        if(link.getAttribute('data-filter') === cat) {
                            link.click();
                        }
                    });
                }, 50);
            }
        });
    });
}

// --- Home Page Logic ---

function renderHome() {
    const arrivalsList = state.products.filter(p => p.newArrival).slice(0, 4);
    const trendingList = state.products.filter(p => !p.newArrival && p.featured).slice(0, 4);
    
    const arrivalsContainer = document.getElementById('new-arrivals-products');
    const trendingContainer = document.getElementById('trending-products');
    
    if(arrivalsContainer) {
        arrivalsContainer.innerHTML = arrivalsList.map(p => createProductCardHtml(p)).join('');
        attachProductCardListeners(arrivalsContainer);
    }

    if(trendingContainer) {
        trendingContainer.innerHTML = trendingList.map(p => createProductCardHtml(p)).join('');
        attachProductCardListeners(trendingContainer);
    }

    // Trigger animations
    const animatedElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

function attachProductCardListeners(container) {
    // Attach click listeners to new product cards
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // If clicking quick add button, don't navigate
            if(e.target.closest('.add-to-cart-quick')) return;
            
            const id = card.getAttribute('data-id');
            navigateTo('product', id);
        });
    });

    // Attach quick add listeners
    container.querySelectorAll('.add-to-cart-quick').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            quickAddToCart(id);
        });
    });
}

// --- Listing Page Logic ---

function renderListing(gender) {
    const titleEl = document.getElementById('listing-title');
    const countEl = document.getElementById('product-count');
    const gridEl = document.getElementById('listing-grid');
    const catsEl = document.getElementById('category-filters');
    
    if(!titleEl || !gridEl) return;
    
    titleEl.textContent = `${gender === 'women' ? 'Women\'s' : 'Men\'s'} Collection`;
    
    const filteredProducts = state.products.filter(p => p.gender === gender);
    
    // Extract unique categories for filters
    const categories = [...new Set(filteredProducts.map(p => p.category))];
    catsEl.innerHTML = `
        <li><a href="#" class="active" data-filter="all">All Items</a></li>
        ${categories.map(c => `<li><a href="#" data-filter="${c}">${c}</a></li>`).join('')}
    `;
    
    let currentFilter = 'all';
    
    const renderGrid = (products) => {
        countEl.textContent = `${products.length} Products`;
        if (products.length === 0) {
            gridEl.innerHTML = '<div class="empty-state">No products found matching your criteria.</div>';
            return;
        }
        gridEl.innerHTML = products.map(p => createProductCardHtml(p)).join('');
        
        // Attach listeners
        gridEl.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if(e.target.closest('.add-to-cart-quick')) return;
                navigateTo('product', card.getAttribute('data-id'));
            });
        });
        
        gridEl.querySelectorAll('.add-to-cart-quick').forEach(btn => {
            btn.addEventListener('click', (e) => {
                quickAddToCart(btn.getAttribute('data-id'));
            });
        });
    };
    
    renderGrid(filteredProducts);
    
    // Filter logic
    catsEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            catsEl.querySelectorAll('a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            currentFilter = link.getAttribute('data-filter');
            const displayList = currentFilter === 'all' 
                ? filteredProducts 
                : filteredProducts.filter(p => p.category === currentFilter);
                
            renderGrid(displayList);
        });
    });

    // Sort logic
    const sortSelect = document.getElementById('sort-select');
    if(sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            let list = currentFilter === 'all' 
                ? [...filteredProducts] 
                : filteredProducts.filter(p => p.category === currentFilter);
            
            switch(e.target.value) {
                case 'price-low':
                    list.sort((a,b) => a.price - b.price);
                    break;
                case 'price-high':
                    list.sort((a,b) => b.price - a.price);
                    break;
                case 'newest':
                    list = list.filter(p => p.newArrival).concat(list.filter(p => !p.newArrival));
                    break;
                default: 
                    // Featured originally
                    list = list.filter(p => p.featured).concat(list.filter(p => !p.featured));
            }
            renderGrid(list);
        });
    }
}

// --- Product Detail Logic ---

function renderProductDetail(id) {
    const product = state.products.find(p => p.id === id);
    if(!product) {
        navigateTo('home');
        return;
    }
    
    // Update Breadcrumbs
    const genderLink = document.getElementById('breadcrumb-gender');
    const nameSpan = document.getElementById('breadcrumb-name');
    if(genderLink) {
        genderLink.textContent = product.gender;
        genderLink.setAttribute('data-page', product.gender);
    }
    if(nameSpan) nameSpan.textContent = product.title;
    
    // Populate Info
    document.getElementById('detail-main-img').src = product.image;
    document.getElementById('detail-title').textContent = product.title;
    document.getElementById('detail-price').textContent = formatPrice(product.price);
    document.getElementById('detail-desc').textContent = product.description;
    document.getElementById('detail-btn-price').textContent = formatPrice(product.price);
    
    // Populate Sizes
    const sizesContainer = document.getElementById('detail-sizes');
    sizesContainer.innerHTML = product.sizes.map((s, idx) => 
        `<button class="size-btn ${idx === 0 ? 'selected' : ''}" data-size="${s}">${s}</button>`
    ).join('');
    
    let selectedSize = product.sizes[0];
    
    sizesContainer.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sizesContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.getAttribute('data-size');
        });
    });
    
    // Handle Add to cart
    const addToCartBtn = document.getElementById('detail-add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product, selectedSize);
        // Change button state temporarily to show success
        const originalText = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '<i class="ph ph-check"></i> Added to Cart';
        addToCartBtn.classList.add('btn-secondary');
        addToCartBtn.classList.remove('btn-primary');
        
        setTimeout(() => {
            addToCartBtn.innerHTML = originalText;
            addToCartBtn.classList.add('btn-primary');
            addToCartBtn.classList.remove('btn-secondary');
        }, 2000);
    });
}

// --- Cart & Checkout Logic ---

function initCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeBtn = document.getElementById('close-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    const openCart = () => {
        cartOverlay.classList.add('show');
        cartSidebar.classList.add('open');
    };
    
    const closeCart = () => {
        cartOverlay.classList.remove('show');
        cartSidebar.classList.remove('open');
    };
    
    cartToggle.addEventListener('click', openCart);
    closeBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    checkoutBtn.addEventListener('click', () => {
        if(state.cart.length > 0) {
            closeCart();
            navigateTo('checkout');
        }
    });

    renderCartUI();
}

function addToCart(product, size = null) {
    const pSize = size || product.sizes[0];
    const existingIndex = state.cart.findIndex(item => item.id === product.id && item.size === pSize);
    
    if (existingIndex > -1) {
        state.cart[existingIndex].quantity += 1;
    } else {
        state.cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            size: pSize,
            quantity: 1
        });
    }
    
    renderCartUI();
    document.getElementById('cart-overlay').classList.add('show');
    document.getElementById('cart-sidebar').classList.add('open');
}

function quickAddToCart(id) {
    const product = state.products.find(p => p.id === id);
    if(product) addToCart(product);
}

function updateCartQuantity(index, delta) {
    if(state.cart[index]) {
        state.cart[index].quantity += delta;
        if(state.cart[index].quantity <= 0) {
            state.cart.splice(index, 1);
        }
        renderCartUI();
        
        // If on checkout page, re-render it
        if(state.page === 'checkout') renderCheckout();
    }
}

function removeFromCart(index) {
    state.cart.splice(index, 1);
    renderCartUI();
    if(state.page === 'checkout') {
        if(state.cart.length === 0) navigateTo('home');
        else renderCheckout();
    }
}

function renderCartUI() {
    const counts = document.querySelectorAll('.cart-count');
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    counts.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
    });
    
    subtotalEl.textContent = formatPrice(subtotal);
    
    if(state.cart.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">Your cart is currently empty.</div>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        container.innerHTML = state.cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <span class="cart-item-size">Size: ${item.size}</span>
                    <span class="cart-item-price">${formatPrice(item.price)}</span>
                    <div class="quantity-controls">
                        <button class="icon-btn qty-btn" style="width:20px;height:20px;font-size:12px;" onclick="updateCartQuantity(${index}, -1)"><i class="ph ph-minus"></i></button>
                        <span>${item.quantity}</span>
                        <button class="icon-btn qty-btn" style="width:20px;height:20px;font-size:12px;" onclick="updateCartQuantity(${index}, 1)"><i class="ph ph-plus"></i></button>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
    }
}

function renderCheckout() {
    const container = document.getElementById('checkout-items');
    const subEl = document.getElementById('checkout-subtotal');
    const totEl = document.getElementById('checkout-total');
    
    if(!container) return;
    
    if(state.cart.length === 0) {
        navigateTo('home');
        return;
    }
    
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subEl.textContent = formatPrice(subtotal);
    totEl.textContent = formatPrice(subtotal); // Free shipping
    
    container.innerHTML = state.cart.map(item => `
        <div class="cart-item" style="margin-bottom: 16px;">
            <div class="cart-item-img" style="width: 60px;">
                <img src="${item.image}" alt="">
            </div>
            <div class="cart-item-details" style="justify-content: center;">
                <h4 class="cart-item-title">${item.title}</h4>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--color-gray-500);">
                    <span>Size: ${item.size} &times; ${item.quantity}</span>
                    <span>${formatPrice(item.price * item.quantity)}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Form submission mock
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.innerHTML = '<i class="ph ph-spinner-gap"></i> Processing...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            state.cart = [];
            renderCartUI();
            alert('Thank you for your purchase! Your order has been placed.');
            navigateTo('home');
        }, 1500);
    });
}

// --- Navigation & Auth UI Logic ---

function initNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const searchBtn = document.querySelector('.search-btn');
    
    mobileBtn.addEventListener('click', () => menu.classList.add('open'));
    closeBtn.addEventListener('click', () => menu.classList.remove('open'));
    searchBtn.addEventListener('click', openSearch);
    
    initSearch();

    // Hide navbar on scroll down, show on scroll up
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            document.getElementById('navbar').classList.remove('hidden');
            return;
        }
        if (currentScroll > lastScroll && currentScroll > 100) {
            document.getElementById('navbar').classList.add('hidden');
        } else {
            document.getElementById('navbar').classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });
}

function openSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    searchOverlay.classList.add('show');
    document.getElementById('search-input').focus();
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    searchOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function initSearch() {
    const closeBtn = document.getElementById('close-search-btn');
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) closeSearch();
    });
    
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if(query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        const matches = state.products.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.gender.toLowerCase().includes(query)
        ).slice(0, 6);
        
        resultsContainer.innerHTML = matches.map(p => `
            <div class="search-result-item" data-id="${p.id}">
                <img src="${p.image}" alt="${p.title}" style="width: 50px; height: 60px; object-fit: cover;">
                <div class="search-result-info">
                    <div style="font-weight: 500;">${p.title}</div>
                    <div style="font-size: 0.8rem; color: var(--color-gray-500);">${formatPrice(p.price)}</div>
                </div>
            </div>
        `).join('');
        
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                navigateTo('product', id);
                closeSearch();
            });
            // Style for search items
            item.style.display = 'flex';
            item.style.gap = '12px';
            item.style.padding = '12px';
            item.style.cursor = 'pointer';
            item.style.borderBottom = '1px solid #eee';
        });
    });
}

function initAuthModal() {
    const authBtn = document.getElementById('account-btn');
    const overlay = document.getElementById('auth-overlay');
    const closeBtn = document.getElementById('close-auth-btn');
    const tabs = document.querySelectorAll('.auth-tab');
    
    authBtn.addEventListener('click', () => overlay.classList.add('show'));
    closeBtn.addEventListener('click', () => overlay.classList.remove('show'));
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) overlay.classList.remove('show');
    });
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            // Toggle active classes
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.auth-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${target}-form`).classList.add('active');
        });
    });
    
    // Mock login submit
    document.querySelectorAll('.auth-submit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const form = e.target.closest('form');
            if(form.checkValidity()) {
                e.preventDefault();
                e.target.innerHTML = 'Processing...';
                setTimeout(() => {
                    overlay.classList.remove('show');
                    e.target.innerHTML = e.target.closest('#login-form') ? 'Sign In' : 'Create Account';
                }, 800);
            }
        });
    });
}

// --- Helpers ---

function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function createProductCardHtml(product) {
    return `
        <div class="product-card group" data-id="${product.id}">
            <div class="product-image-wrapper">
                ${product.newArrival ? '<span class="product-badge">New</span>' : ''}
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <img src="${product.hoverImage}" alt="${product.title}" class="product-img-hover">
                <button class="add-to-cart-quick" data-id="${product.id}">Quick Add</button>
            </div>
            <div class="product-info-card">
                <h3 class="product-title-card">${product.title}</h3>
                <span class="product-price-card">${formatPrice(product.price)}</span>
            </div>
        </div>
    `;
}
