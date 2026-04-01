import { products, artists, getFeaturedProducts, getNewArrivals, getProductsByCategory, getProductById, formatCurrency } from './data.js';
import { renderProductCard, renderArtistCard } from './components.js';

export function renderHomePage() {
    const featured = getFeaturedProducts().slice(0, 4);
    const newArrivals = getNewArrivals().slice(0, 4);

    return `
        <section class="hero">
            <div class="hero-bg"></div>
            <div class="hero-content">
                <h1>Play Seriously.<br>Live Presently.</h1>
                <p>Curated premium hobbies, luxury board games, and bespoke artist commissions for the sophisticated collector.</p>
                <a href="#" class="btn btn-primary hero-btn" data-link="category" data-category="board-games">Explore the Collection</a>
            </div>
        </section>

        <section class="container section-padding">
            <div class="section-header reveal-up">
                <h2>Collector's Picks</h2>
                <p>Our most sought-after pieces</p>
            </div>
            <div class="product-grid">
                ${featured.map(renderProductCard).join('')}
            </div>
        </section>

        <section class="brand-values">
            <div class="container values-grid">
                <div class="value-item">
                    <h4>Quality Guaranteed</h4>
                    <p>Only the finest materials</p>
                </div>
                <div class="value-item">
                    <h4>Adults Only</h4>
                    <p>Sophisticated & complex</p>
                </div>
                <div class="value-item">
                    <h4>Premium Materials</h4>
                    <p>Mahogany, brass & marble</p>
                </div>
                <div class="value-item">
                    <h4>Artist Verified</h4>
                    <p>Authentic commissions</p>
                </div>
            </div>
        </section>

        <section class="container section-padding">
            <div class="section-header reveal-up">
                <h2>Category Highlights</h2>
            </div>
            <div class="category-highlights">
                <div class="category-card reveal-up">
                    <img src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&fit=crop" alt="Board Games">
                    <div class="category-content">
                        <h3>Strategy & Board</h3>
                        <a href="#" data-link="category" data-category="board-games">Shop Collection</a>
                    </div>
                </div>
                <div class="category-card reveal-up">
                    <img src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&fit=crop" alt="Die Cast">
                    <div class="category-content">
                        <h3>Die-Cast Miniatures</h3>
                        <a href="#" data-link="category" data-category="die-cast">Shop Collection</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="container section-padding">
            <div class="section-header reveal-up">
                <h2>New Arrivals</h2>
            </div>
            <div class="product-grid">
                ${newArrivals.map(renderProductCard).join('')}
            </div>
        </section>

        <section class="container section-padding" style="background:var(--bg-color-card); margin-bottom: 5rem; padding: 4rem 2rem;">
            <div class="section-header reveal-up">
                <h2>Collector Testimonials</h2>
                <p>What our sophisticated community says</p>
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; text-align: center;">
                <div style="padding: 2rem; border: 1px solid var(--border-color);">
                    <div style="color:var(--gold); font-size:1.5rem; margin-bottom:1rem;">★★★★★</div>
                    <p style="font-style:italic; color:var(--text-secondary); margin-bottom:1.5rem;">"The mahogany Jenga set is a centerpiece in my office. A truly immaculate piece of craftsmanship."</p>
                    <h5 style="font-family:var(--font-heading); font-size:1.1rem;">Alexander P.</h5>
                </div>
                <div style="padding: 2rem; border: 1px solid var(--border-color);">
                    <div style="color:var(--gold); font-size:1.5rem; margin-bottom:1rem;">★★★★★</div>
                    <p style="font-style:italic; color:var(--text-secondary); margin-bottom:1.5rem;">"Commissioned Elena for a portrait, and the result was breathtaking. The Elysium curation matches no other."</p>
                    <h5 style="font-family:var(--font-heading); font-size:1.1rem;">Marcus L.</h5>
                </div>
                <div style="padding: 2rem; border: 1px solid var(--border-color);">
                    <div style="color:var(--gold); font-size:1.5rem; margin-bottom:1rem;">★★★★★</div>
                    <p style="font-style:italic; color:var(--text-secondary); margin-bottom:1.5rem;">"These aren't just toys; they are heirlooms. The Singer DLS miniature is absurdly detailed."</p>
                    <h5 style="font-family:var(--font-heading); font-size:1.1rem;">James H.</h5>
                </div>
            </div>
        </section>

        <section class="container section-padding" style="padding-top: 0;">
            <div class="section-header reveal-up">
                <h2>#ElysiumCollectibles</h2>
                <p>Join our Instagram community</p>
            </div>
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                <div style="aspect-ratio:1; background:#111; overflow:hidden;"><img src="https://images.unsplash.com/photo-1611002214172-792c1f90b59a?w=400&h=400&fit=crop" style="width:100%;height:100%;object-fit:cover; transition:var(--transition-smooth);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
                <div style="aspect-ratio:1; background:#111; overflow:hidden;"><img src="https://images.unsplash.com/photo-1587837073080-448bc5a4f781?w=400&h=400&fit=crop" style="width:100%;height:100%;object-fit:cover; transition:var(--transition-smooth);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
                <div style="aspect-ratio:1; background:#111; overflow:hidden;"><img src="https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?w=400&h=400&fit=crop" style="width:100%;height:100%;object-fit:cover; transition:var(--transition-smooth);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
                <div style="aspect-ratio:1; background:#111; overflow:hidden;"><img src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=400&h=400&fit=crop" style="width:100%;height:100%;object-fit:cover; transition:var(--transition-smooth);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
            </div>
        </section>
    `;
}

export function renderCategoryPage(categorySlug) {
    const categoryProducts = getProductsByCategory(categorySlug);
    const title = categorySlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return `
        <div class="container section-padding" style="padding-top: 2rem;">
            <div style="margin-bottom: 2rem; color: var(--text-secondary); font-size: 0.9rem;">
                <a href="#" data-link="home">Home</a> / <span style="color: var(--text-primary)">${title}</span>
            </div>
            <div class="section-header reveal-up" style="text-align: left;">
                <h2>${title}</h2>
                <p>Discover our premium selection of ${title.toLowerCase()}.</p>
            </div>
            ${categoryProducts.length > 0 ? `
                <div class="product-grid">
                    ${categoryProducts.map(renderProductCard).join('')}
                </div>
            ` : `
                <div style="padding: 4rem; text-align: center; border: 1px solid var(--border-color);">
                    <h3>No products found in this collection yet.</h3>
                </div>
            `}
        </div>
    `;
}

export function renderProductDetailPage(id) {
    const product = getProductById(id);
    if(!product) return `<div class="container section-padding"><h2>Product not found</h2></div>`;

    return `
        <div class="product-detail-container">
            <div class="product-gallery reveal-up">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="thumbnail-strip">
                    <div><img src="${product.image}" alt="Thumb 1"></div>
                    <div><img src="${product.image}" alt="Thumb 2"></div>
                </div>
            </div>
            <div class="product-info-detail reveal-up">
                <div class="product-category" style="margin-bottom:1rem;">${product.category.replace('-', ' ')}</div>
                <h1>${product.title}</h1>
                <div class="product-price-large">${formatCurrency(product.price)}</div>
                <p class="product-description">${product.description}</p>
                
                <div class="product-meta">
                    <div class="product-meta-item">
                        <span>Availability</span>
                        <span style="color:#4caf50">In Stock</span>
                    </div>
                </div>

                <div class="qty-section">
                    <div class="qty-control">
                        <button onclick="document.getElementById('qty').value = Math.max(1, parseInt(document.getElementById('qty').value) - 1)">-</button>
                        <input type="number" id="qty" value="1" min="1">
                        <button onclick="document.getElementById('qty').value = parseInt(document.getElementById('qty').value) + 1">+</button>
                    </div>
                </div>

                <button class="btn btn-primary btn-add-large" data-action="add-to-cart" data-id="${product.id}" onclick="this.setAttribute('data-qty', document.getElementById('qty').value)">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

export function renderCommissionPage() {
    return `
        <div class="hero" style="height: 50vh; min-height: 400px;">
            <div class="hero-bg" style="background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&fit=crop') center/cover;"></div>
            <div class="hero-content">
                <h1 style="font-size:3rem">Commission a Masterpiece</h1>
                <p>Collaborate with our verified artists bringing your unique vision to life.</p>
            </div>
        </div>

        <section class="container section-padding">
            <div class="section-header reveal-up">
                <h2>How It Works</h2>
            </div>
            <div class="steps-list">
                <div class="step-item">
                    <div class="step-number">1</div>
                    <h4>Browse Artists</h4>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">Review portfolios and select your preferred creator.</p>
                </div>
                <div class="step-item">
                    <div class="step-number">2</div>
                    <h4>Submit Brief</h4>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">Provide your ideas, references, and specifications.</p>
                </div>
                <div class="step-item">
                    <div class="step-number">3</div>
                    <h4>Artist Confirms</h4>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">Agree on timeline and budget. Work begins.</p>
                </div>
                <div class="step-item">
                    <div class="step-number">4</div>
                    <h4>Receive Art</h4>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">Your custom piece is securely shipped to your door.</p>
                </div>
            </div>

            <div class="section-header reveal-up">
                <h2>Featured Artists</h2>
            </div>
            <div class="artist-grid">
                ${artists.map(renderArtistCard).join('')}
            </div>

            <div id="commission-form" class="booking-form-section">
                <h3 style="font-family:var(--font-heading); font-size:2rem; text-align:center; margin-bottom:2rem;">Start Your Commission</h3>
                <form id="artist-booking-form">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                        <div class="form-group">
                            <label>Select Artist</label>
                            <select class="form-control" required>
                                <option value="">Choose an artist...</option>
                                ${artists.map(a => `<option value="${a.id}">${a.name} (${a.specialty})</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Medium</label>
                            <select class="form-control" required>
                                <option value="oil">Oil on Canvas</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="acrylic">Acrylic</option>
                                <option value="miniature">Miniature Painting</option>
                            </select>
                        </div>
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                        <div class="form-group">
                            <label>Canvas Size</label>
                            <select class="form-control" required>
                                <option value="">Select size...</option>
                                <option value="small">Small (12" x 16")</option>
                                <option value="medium">Medium (18" x 24")</option>
                                <option value="large">Large (24" x 36")</option>
                                <option value="oversized">Oversized (36" x 48"+)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Reference Image Upload</label>
                            <input type="file" class="form-control" accept="image/*" style="padding: 0.6rem 1rem;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Subject Description</label>
                        <textarea class="form-control" rows="4" placeholder="Describe your vision in detail..." required></textarea>
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                         <div class="form-group">
                            <label>Target Deadline</label>
                            <input type="date" class="form-control" required style="color-scheme: dark;">
                        </div>
                        <div class="form-group">
                            <label>Budget Range (৳)</label>
                            <select class="form-control">
                                <option>৳10,000 - ৳25,000</option>
                                <option>৳25,000 - ৳50,000</option>
                                <option>৳50,000+</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%; padding:1rem; font-size:1rem; margin-top:1rem;">Submit Initial Brief</button>
                    <p id="booking-success-msg" style="display:none; color:var(--gold); text-align:center; margin-top:1rem; font-weight:bold;">Your brief has been submitted! Our curator will contact you within 24 hours.</p>
                </form>
            </div>
        </section>
    `;
}

export function renderCartPage(cartItems, cartTotal) {
    if(cartItems.length === 0) {
        return `
            <div class="container section-padding" style="text-align: center;">
                <h2 style="font-family:var(--font-heading); font-size:2.5rem; margin-bottom:2rem;">Your Cart is Empty</h2>
                <a href="#" class="btn btn-primary" data-link="home">Continue Shopping</a>
            </div>
        `;
    }

    return `
        <div class="container section-padding" style="padding-top:2rem;">
            <h1 style="font-family:var(--font-heading); font-size:2.5rem; margin-bottom:2rem;">Shopping Cart</h1>
            <div class="cart-page-content">
                <div class="cart-items">
                    ${cartItems.map(item => `
                        <div class="cart-item">
                            <div class="cart-item-img">
                                <img src="${item.image}" alt="${item.title}">
                            </div>
                            <div class="cart-item-info">
                                <h3 class="cart-item-title">${item.title}</h3>
                                <div class="cart-item-price">${formatCurrency(item.price)}</div>
                                <div class="cart-item-actions">
                                    <div class="qty-control">
                                        <button data-action="update-cart" data-id="${item.id}" data-qty="${item.quantity - 1}">-</button>
                                        <input type="number" readonly value="${item.quantity}">
                                        <button data-action="update-cart" data-id="${item.id}" data-qty="${item.quantity + 1}">+</button>
                                    </div>
                                    <button class="btn-remove" data-action="remove-cart" data-id="${item.id}">Remove</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div>
                    <div class="cart-summary">
                        <h3>Order Summary</h3>
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>${formatCurrency(cartTotal)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div class="summary-total">
                            <span>Total</span>
                            <span>${formatCurrency(cartTotal)}</span>
                        </div>
                        <button class="btn btn-primary" style="width:100%; padding:1rem; margin-top:2rem;" data-link="checkout">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderCheckoutPage(cartTotal) {
    return `
        <div class="container section-padding" style="padding-top:2rem;">
            <h1 style="font-family:var(--font-heading); font-size:2.5rem; margin-bottom:2rem;">Checkout</h1>
            <div class="cart-page-content">
                <div>
                    <h3 style="margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">Shipping Information</h3>
                    <form id="checkout-form">
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                            <div class="form-group"><label>First Name</label><input type="text" class="form-control" required></div>
                            <div class="form-group"><label>Last Name</label><input type="text" class="form-control" required></div>
                        </div>
                        <div class="form-group"><label>Address</label><input type="text" class="form-control" required></div>
                        <div class="form-group"><label>City</label><input type="text" class="form-control" required></div>
                        <div class="form-group"><label>Phone Number</label><input type="tel" class="form-control" required></div>
                        
                        <h3 style="margin:2.5rem 0 1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">Payment Method</h3>
                        <div class="form-group" style="margin-bottom:0.5rem;">
                            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                                <input type="radio" name="payment" value="card" checked> Credit/Debit Card
                            </label>
                        </div>
                        <div class="form-group" style="margin-bottom:0.5rem;">
                            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                                <input type="radio" name="payment" value="bkash"> bKash
                            </label>
                        </div>
                        <div class="form-group" style="margin-bottom:0.5rem;">
                            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                                <input type="radio" name="payment" value="nagad"> Nagad
                            </label>
                        </div>
                        <div class="form-group" style="margin-bottom:1.5rem;">
                            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                                <input type="radio" name="payment" value="cod"> Cash on Delivery
                            </label>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width:100%; padding:1rem; font-size:1.1rem;">Place Order</button>
                    </form>
                </div>
                <div>
                    <div class="cart-summary">
                        <h3>Total Amount</h3>
                        <div class="summary-total" style="border-top:none; margin-top:0; padding-top:0;">
                            <span>Total</span>
                            <span style="color:var(--gold)">${formatCurrency(cartTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
