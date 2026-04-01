// Mock data for the eCommerce platform

const products = [
    // Women Category
    {
        id: 'w1',
        title: 'Silk Slip Dress',
        price: 185.00,
        gender: 'women',
        category: 'dresses',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1596783049184-75afbe760db5?q=80&w=1974&auto=format&fit=crop',
        description: 'A minimalist masterpiece crafted from 100% pure Mulberry silk. This slip dress features a bias cut that drapes beautifully across your natural curves, adjustable spaghetti straps, and a delicate V-neckline.',
        sizes: ['XS', 'S', 'M', 'L'],
        featured: true,
        newArrival: true
    },
    {
        id: 'w2',
        title: 'Structured wool Blazer',
        price: 240.00,
        gender: 'women',
        category: 'outerwear',
        image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=1972&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1549844471-a48f76edfff4?q=80&w=1974&auto=format&fit=crop',
        description: 'Elevate your tailored wardrobe with our structured Italian wool blazer. Featuring sharp shoulders, a nipped-in waist, and premium horn buttons. Perfect for layering over knits or a simple tee.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        featured: true,
        newArrival: false
    },
    {
        id: 'w3',
        title: 'Cashmere Turtleneck Sweater',
        price: 160.00,
        gender: 'women',
        category: 'tops',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=1972&auto=format&fit=crop',
        description: 'Incredibly soft and lightweight. Spun from premium grade-A inner Mongolian cashmere yarns. Designed with an elegant relaxed fit with ribbed trims.',
        sizes: ['S', 'M', 'L'],
        featured: false,
        newArrival: true
    },
    {
        id: 'w4',
        title: 'High-Rise Straight Jeans',
        price: 110.00,
        gender: 'women',
        category: 'bottoms',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop',
        description: 'Vintage-inspired straight leg jeans crafted from premium, non-stretch rigid denim that forms to your body over time. Featuring a classic high rise, five-pocket styling, and a button fly.',
        sizes: ['24', '25', '26', '27', '28', '29', '30'],
        featured: false,
        newArrival: false
    },
    {
        id: 'w5',
        title: 'Leather Crossbody Bag',
        price: 285.00,
        gender: 'women',
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1938&auto=format&fit=crop',
        description: 'A classic silhouette constructed from supple vegetable-tanned Italian calf leather. Features polished gold hardware, a spacious main compartment, and an internal slip pocket.',
        sizes: ['One Size'],
        featured: true,
        newArrival: false
    },
    {
        id: 'w6',
        title: 'Linen Wide-Leg Trousers',
        price: 145.00,
        gender: 'women',
        category: 'bottoms',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
        description: 'Relaxed and refined. These wide-leg trousers are cut from high-quality European linen. Features a high waist, deep pleats, and side pockets.',
        sizes: ['S', 'M', 'L'],
        featured: false,
        newArrival: true
    },

    // Men Category
    {
        id: 'm1',
        title: 'Minimalist Oxford Shirt',
        price: 95.00,
        gender: 'men',
        category: 'shirts',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=2080&auto=format&fit=crop',
        description: 'The cornerstone of a versatile wardrobe. Made from midweight organic cotton oxford cloth that softens with every wash. Tailored with a modern, athletic fit.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        featured: true,
        newArrival: true
    },
    {
        id: 'm2',
        title: 'Tailored Wool Coat',
        price: 320.00,
        gender: 'men',
        category: 'outerwear',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop',
        description: 'A timeless overcoat cut from a dense, luxurious wool blend for exceptional warmth and structure. Features a notch lapel, single-breasted closure, and a clean, straight cut.',
        sizes: ['M', 'L', 'XL'],
        featured: true,
        newArrival: false
    },
    {
        id: 'm3',
        title: 'Essential Crewneck Tee',
        price: 45.00,
        gender: 'men',
        category: 'tops',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1521572015091-fe6415add712?q=80&w=2080&auto=format&fit=crop',
        description: 'Knit from long-staple Peruvian Pima cotton for incredible softness and durability. Designed to retain its shape and opacity over time.',
        sizes: ['S', 'M', 'L', 'XL'],
        featured: false,
        newArrival: false
    },
    {
        id: 'm4',
        title: 'Slim Tapered Chinos',
        price: 98.00,
        gender: 'men',
        category: 'bottoms',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1473966968600-fa801b1c7cdda?q=80&w=1974&auto=format&fit=crop',
        description: 'Crafted from a custom-milled twill containing a hint of stretch for mobility. Cut with a comfortable mid-rise that tapers elegantly from the knee down.',
        sizes: ['30', '32', '34', '36'],
        featured: false,
        newArrival: true
    },
    {
        id: 'm5',
        title: 'Leather Chelsea Boots',
        price: 210.00,
        gender: 'men',
        category: 'shoes',
        image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1964&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1638247025859-28c04ec47901?q=80&w=1964&auto=format&fit=crop',
        description: 'A modern take on a classic profile. Crafted in Portugal from full-grain leather that will develop a rich patina. Features elasticated side panels and a stacked leather sole with rubber injections for grip.',
        sizes: ['8', '9', '10', '11', '12'],
        featured: true,
        newArrival: false
    },
    {
        id: 'm6',
        title: 'Knit Wool Polo',
        price: 125.00,
        gender: 'men',
        category: 'tops',
        image: 'https://images.unsplash.com/photo-1614252332210-917454c59d9a?q=80&w=1974&auto=format&fit=crop',
        hoverImage: 'https://images.unsplash.com/photo-1614252332210-917454c59d9a?q=80&w=1974&auto=format&fit=crop',
        description: 'Sophisticated comfort. This polo is knit from extra-fine merino wool for a soft, breathable feel. Features a classic polo collar and ribbed trims.',
        sizes: ['S', 'M', 'L', 'XL'],
        featured: false,
        newArrival: true
    }
];

// Export for usage
window.productData = products;
