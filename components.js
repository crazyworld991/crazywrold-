import { formatCurrency } from './data.js';

export function renderProductCard(product) {
    return `
        <div class="product-card reveal-up" data-id="${product.id}">
            <a href="#" data-link="product" data-id="${product.id}" class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                ${product.isNew ? '<span style="position:absolute; top:10px; left:10px; background:var(--gold); color:#000; padding:2px 8px; font-size:10px; font-weight:bold; letter-spacing:1px; z-index:3;">NEW</span>' : ''}
            </a>
            <div class="product-info">
                <span class="product-category">${product.category.replace('-', ' ')}</span>
                <a href="#" data-link="product" data-id="${product.id}" class="product-title">${product.title}</a>
                <span class="product-price">${formatCurrency(product.price)}</span>
                <button class="btn add-to-cart-btn" data-action="add-to-cart" data-id="${product.id}">
                    Add to Collection
                </button>
            </div>
        </div>
    `;
}

export function renderArtistCard(artist) {
    return `
        <div class="artist-card reveal-up">
            <div class="artist-avatar">
                <img src="${artist.image}" alt="${artist.name}" loading="lazy">
            </div>
            <h3 class="artist-name">${artist.name}</h3>
            <p class="artist-specialty">${artist.specialty}</p>
            <div style="color:var(--gold); font-size:1.2rem; margin-bottom:1rem;">
                ★★★★★ <span style="font-size:0.8rem; color:var(--text-secondary)">(${artist.rating})</span>
            </div>
            <button class="btn btn-primary" onclick="document.getElementById('commission-form').scrollIntoView({behavior: 'smooth'})">
                Select Artist
            </button>
        </div>
    `;
}
