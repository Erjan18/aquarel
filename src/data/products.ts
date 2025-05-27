import { Product, Category } from '../types/Product';

export const categories: Category[] = [
  {
    id: 'drawing',
    name: 'Рисование',
    icon: 'pencil',
    subcategories: [
      { id: 'paints', name: 'Краски' },
      { id: 'pencils', name: 'Карандаши' },
      { id: 'markers', name: 'Маркеры' },
      { id: 'brushes', name: 'Кисти' },
      { id: 'canvas', name: 'Холсты' },
      { id: 'paper', name: 'Бумага' },
    ],
  },
  {
    id: 'sewing',
    name: 'Шитье',
    icon: 'scissors',
    subcategories: [
      { id: 'fabrics', name: 'Ткани' },
      { id: 'threads', name: 'Нитки' },
      { id: 'needles', name: 'Иглы' },
      { id: 'accessories', name: 'Аксессуары' },
    ],
  },
  {
    id: 'knitting',
    name: 'Вязание',
    icon: 'spool',
    subcategories: [
      { id: 'yarn', name: 'Пряжа' },
      { id: 'hooks', name: 'Крючки' },
      { id: 'needles', name: 'Спицы' },
      { id: 'accessories', name: 'Аксессуары' },
    ],
  },
  {
    id: 'scrapbooking',
    name: 'Скрапбукинг',
    icon: 'book-open',
    subcategories: [
      { id: 'paper', name: 'Бумага' },
      { id: 'embellishments', name: 'Украшения' },
      { id: 'tools', name: 'Инструменты' },
      { id: 'albums', name: 'Альбомы' },
    ],
  },
  {
    id: 'sculpting',
    name: 'Лепка',
    icon: 'hand-metal',
    subcategories: [
      { id: 'clay', name: 'Глина' },
      { id: 'tools', name: 'Инструменты' },
      { id: 'accessories', name: 'Аксессуары' },
    ],
  },
  {
    id: 'decorating',
    name: 'Декорирование',
    icon: 'sparkles',
    subcategories: [
      { id: 'paints', name: 'Краски' },
      { id: 'glitter', name: 'Блестки' },
      { id: 'stickers', name: 'Наклейки' },
      { id: 'ribbons', name: 'Ленты' },
    ],
  },
  {
    id: 'kids',
    name: 'Детское творчество',
    icon: 'baby',
    subcategories: [
      { id: 'sets', name: 'Наборы' },
      { id: 'modeling', name: 'Лепка' },
      { id: 'drawing', name: 'Рисование' },
      { id: 'applique', name: 'Аппликация' },
    ],
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Набор акварельных красок "Сонет", 24 цвета',
    price: 1250,
    oldPrice: 1500,
    description: 'Профессиональные акварельные краски "Сонет" в кюветах. Идеально подходят для художников любого уровня. В наборе 24 насыщенных цвета, которые легко смешиваются между собой, создавая богатую палитру оттенков.',
    images: [
      'https://basket-01.wbbasket.ru/vol85/part8551/8551476/images/big/1.webp',
      'https://artershop.com/_sh/00/13m_1.jpg',
    ],
    category: 'drawing',
    subcategory: 'paints',
    brand: 'Сонет',
    inStock: true,
    rating: 4.7,
    reviewCount: 128,
    attributes: {
      type: 'Акварель',
      colorCount: 24,
      format: 'Кюветы',
      packaging: 'Металлическая коробка',
      weight: 250,
    },
    isPopular: true,
    discount: 15,
  },
  {
    id: 2,
    name: 'Профессиональные цветные карандаши Faber-Castell, 48 цветов',
    price: 2900,
    oldPrice: 3200,
    description: 'Высококачественные цветные карандаши от немецкого бренда Faber-Castell. Набор из 48 ярких цветов в металлической коробке. Мягкие, но прочные грифели, легко наносятся на бумагу, давая насыщенный цвет. Идеально подходят для художественных работ, скетчей и иллюстраций.',
    images: [
      'https://content.img-gorod.ru/pim/products/images/30/5c/018ed397-4cf7-778a-aeb8-c509e5ec305c.jpg?width=336&height=480&fit=bounds',
      'https://cdn.vseinstrumenti.ru/images/goods/tovary-dlya-ofisa-i-doma/snabzhenie-i-osnaschenie-ofisa/7279165/1200x800/74187949.jpg',
    ],
    category: 'drawing',
    subcategory: 'pencils',
    brand: 'Faber-Castell',
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
    attributes: {
      type: 'Цветные карандаши',
      colorCount: 48,
      hardness: 'Средняя',
      material: 'Дерево',
      packaging: 'Металлическая коробка',
    },
    isPopular: true,
  },
  {
    id: 3,
    name: 'Набор акриловых красок "Ладога", 12 цветов',
    price: 890,
    description: 'Набор акриловых красок "Ладога" от российского производителя. В набор входит 12 тюбиков по 46 мл. Краски имеют яркие, насыщенные цвета, хорошо ложатся на различные поверхности, быстро сохнут и не выцветают со временем.',
    images: [
      'https://artershop.com/_sh/28/2812.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLrfZzf5oJy1FCrOGt2efri9rDx2qAXK6oxQ&s',
    ],
    category: 'drawing',
    subcategory: 'paints',
    brand: 'Ладога',
    inStock: true,
    rating: 4.5,
    reviewCount: 87,
    attributes: {
      type: 'Акриловые краски',
      colorCount: 12,
      volume: '46 мл',
      packaging: 'Тюбики',
      base: 'Водная',
    },
  },
  {
    id: 4,
    name: 'Набор профессиональных кистей для акварели, 7 шт',
    price: 1350,
    description: 'Набор профессиональных кистей из натурального ворса колонка. Идеально подходит для работы с акварелью, гуашью и тушью. В наборе 7 кистей разных размеров с удобными деревянными ручками.',
    images: [
      'https://ae04.alicdn.com/kf/HTB1ybnillmWBuNkSndVq6AsApXa8.jpg',
      'https://www.артмикс1.рф/d/set38-7.jpg',
    ],
    category: 'drawing',
    subcategory: 'brushes',
    brand: 'Roubloff',
    inStock: true,
    rating: 4.8,
    reviewCount: 64,
    attributes: {
      type: 'Кисти для акварели',
      material: 'Натуральный ворс (колонок)',
      count: 7,
      sizes: '№1, №2, №3, №4, №5, №6, №8',
      handleMaterial: 'Дерево',
    },
  },
  {
    id: 5,
    name: 'Хлопковая ткань "Цветочные мотивы", 2м',
    price: 750,
    description: 'Натуральная хлопковая ткань с ярким цветочным принтом. Идеально подходит для пошива летней одежды, декоративных элементов интерьера, игрушек и других творческих проектов. Ширина 150 см, длина отреза 2 метра.',
    images: [
      'https://shabbyland.ru/pictures/product/big/8147_big.jpg',
      'https://cs2.livemaster.ru/storage/e0/23/21cd71293dc593041e88b2b2d9ds--materialy-dlya-tvorchestva-hlopkovaya-tkan-tsvetochnaya-meloc.jpg',
    ],
    category: 'sewing',
    subcategory: 'fabrics',
    brand: 'Модные ткани',
    inStock: true,
    rating: 4.6,
    reviewCount: 42,
    attributes: {
      material: '100% хлопок',
      pattern: 'Цветочный принт',
      width: '150 см',
      length: '2 м',
      density: '120 г/м²',
    },
  },
  {
    id: 6,
    name: 'Набор швейных ниток "Радуга", 20 цветов',
    price: 520,
    description: 'Набор швейных ниток различных цветов для ручного и машинного шитья. В комплекте 20 катушек разных оттенков. Нитки прочные, не выцветают при стирке, подходят для работы с различными тканями.',
    images: [
      'https://hozryad.biz.ua/upload/resize_cache/iblock/dc6/630_873_1f03d140275e1d4ea06c4c45abe160441/dc61eea47a882df109bdfd6a113c6a5b.jpeg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpJsDPyUOsDxPTOJ9Xsep_862yNPzft_v9NQ&s',
    ],
    category: 'sewing',
    subcategory: 'threads',
    brand: 'Gamma',
    inStock: true,
    rating: 4.5,
    reviewCount: 78,
    attributes: {
      material: 'Полиэстер',
      count: 20,
      length: '200 м/катушка',
      thickness: '40/2',
    },
  },
  {
    id: 7,
    name: 'Набор пряжи для вязания "Мериносовая шерсть", 5 мотков',
    price: 1800,
    oldPrice: 2100,
    description: 'Мягкая пряжа из мериносовой шерсти высшего качества. Идеально подходит для вязания теплых свитеров, шапок, шарфов и других зимних аксессуаров. В наборе 5 мотков пряжи по 100 г каждый.',
    images: [
      'https://basket-12.wbbasket.ru/vol1785/part178598/178598927/images/big/1.webp',
      'https://basket-12.wbbasket.ru/vol1772/part177218/177218893/images/big/1.webp',
    ],
    category: 'knitting',
    subcategory: 'yarn',
    brand: 'Пехорка',
    inStock: true,
    rating: 4.9,
    reviewCount: 112,
    attributes: {
      material: '100% мериносовая шерсть',
      weight: '100 г/моток',
      length: '300 м/100 г',
      needleSize: '3-4 мм',
      count: 5,
      color: 'Ассорти',
    },
    isPopular: true,
    discount: 14,
  },
  {
    id: 8,
    name: 'Набор полимерной глины "Фимо", 10 цветов',
    price: 1200,
    description: 'Набор полимерной глины FIMO от немецкого производителя Staedtler. В комплекте 10 брикетов разных цветов по 57 г. Глина пластичная, легко разминается, хорошо держит форму, после запекания становится твердой и прочной.',
    images: [
      'https://polimerglinka.com.ua/wp-content/uploads/2020/10/photo_2023-06-08_12-05-01.jpg',
      'https://basket-10.wbbasket.ru/vol1381/part138149/138149667/images/big/1.webp',
    ],
    category: 'sculpting',
    subcategory: 'clay',
    brand: 'FIMO',
    inStock: true,
    rating: 4.7,
    reviewCount: 95,
    attributes: {
      type: 'Полимерная глина',
      count: 10,
      weight: '57 г/брикет',
      bakingTemperature: '110°C',
      bakingTime: '30 минут',
    },
    isNew: true,
  },
  {
    id: 9,
    name: 'Набор для скрапбукинга "Винтаж"',
    price: 1450,
    description: 'Набор для создания скрапбукинг-альбомов и открыток в винтажном стиле. В комплекте декоративная бумага, высечки, наклейки, чипборд, ленты, кружево и другие элементы декора.',
    images: [
      'https://storage.mrgeek.ru/KCKV73nOUi4e9up7YflfDye_2M7jsLZ5R93hJsBrMJU/fit/505/505/no/1/aHR0cHM6Ly9tcmdlZWsucnUvaW1hZ2VzL3Byb2R1Y3RfcGljdHVyZXNfbmV3LzExMDAwLzExMjAwLzExMjg1L3Byb2R1Y3RfcGljdHVyZXMvb3JpZ2luYWwvMTEyODUtMS5qcGc.jpg',
      'https://ir-3.ozone.ru/s3/multimedia-4/c1000/6049928656.jpg',
    ],
    category: 'scrapbooking',
    subcategory: 'sets',
    brand: 'ScrapBerry\'s',
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
    attributes: {
      style: 'Винтаж',
      paperSize: '30,5 x 30,5 см',
      paperCount: 10,
      components: 'Бумага, высечки, наклейки, чипборд, ленты, кружево',
      theme: 'Ретро, винтаж',
    },
    isNew: true,
  },
  {
    id: 10,
    name: 'Детский набор для творчества "Мир динозавров"',
    price: 890,
    oldPrice: 990,
    description: 'Яркий набор для детского творчества на тему динозавров. В комплекте все необходимое для создания аппликаций, рисования и лепки: цветная бумага, картон, пластилин, краски, кисточки, трафареты и инструкция с идеями для поделок.',
    images: [
      'https://basket-10.wbbasket.ru/vol1511/part151126/151126335/images/big/1.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqBCvgzwFP8aNYRf57bMKmGHTYxulW96ucdA&s',
    ],
    category: 'kids',
    subcategory: 'sets',
    brand: 'Луч',
    inStock: true,
    rating: 4.6,
    reviewCount: 83,
    attributes: {
      ageGroup: '4-8 лет',
      theme: 'Динозавры',
      components: 'Цветная бумага, картон, пластилин, краски, кисточки, трафареты, инструкция',
      packaging: 'Картонная коробка',
    },
    discount: 10,
  },
  {
    id: 11,
    name: 'Холст на подрамнике, грунтованный, 40х50 см',
    price: 580,
    description: 'Готовый грунтованный холст на деревянном подрамнике. Идеально подходит для работы маслом, акрилом и другими художественными красками. Размер 40х50 см, средняя зернистость.',
    images: [
      'https://basket-01.wbbasket.ru/vol93/part9397/9397682/images/big/1.webp',
      'https://basket-01.wbbasket.ru/vol132/part13212/13212972/images/big/1.webp',
    ],
    category: 'drawing',
    subcategory: 'canvas',
    brand: 'Малевичъ',
    inStock: true,
    rating: 4.7,
    reviewCount: 45,
    attributes: {
      size: '40х50 см',
      material: '100% хлопок',
      texture: 'Средняя зернистость',
      frame: 'Сосна',
      grounded: true,
    },
  },
  {
    id: 12,
    name: 'Набор маркеров для скетчинга, 48 цветов',
    price: 2950,
    oldPrice: 3300,
    description: 'Профессиональные двусторонние маркеры для скетчинга, иллюстрации и дизайна. В наборе 48 маркеров разных цветов. Спиртовая основа, не размывается водой, яркие насыщенные цвета, быстро сохнет.',
    images: [
      'https://basket-01.wbbasket.ru/vol135/part13549/13549400/images/big/1.webp',
      'https://lamantin.by/d/6016171360.jpg',
    ],
    category: 'drawing',
    subcategory: 'markers',
    brand: 'Touch',
    inStock: true,
    rating: 4.9,
    reviewCount: 132,
    attributes: {
      type: 'Спиртовые маркеры',
      colorCount: 48,
      tips: 'Двусторонние (тонкий и скошенный)',
      packaging: 'Пластиковый кейс',
    },
    isPopular: true,
    discount: 10,
  },
  {
    id: 13,
    name: 'Набор спиц для вязания, 11 размеров',
    price: 1200,
    description: 'Полный набор круговых спиц для вязания. В комплекте 11 пар спиц разных размеров от 2,5 мм до 8 мм. Спицы изготовлены из прочного алюминия, соединены гибким и прочным кабелем.',
    images: [
      'https://ae04.alicdn.com/kf/H0bfd73d1086e44d7928bdd523b95c287o.jpg',
      'https://cdn1.ozone.ru/s3/multimedia-t/6494150033.jpg',
    ],
    category: 'knitting',
    subcategory: 'needles',
    brand: 'KnitPro',
    inStock: true,
    rating: 4.8,
    reviewCount: 76,
    attributes: {
      type: 'Круговые спицы',
      material: 'Алюминий',
      sizes: '2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8 мм',
      cableLength: '80 см',
      count: 11,
    },
  },
  {
    id: 14,
    name: 'Декоративные ленты "Праздник", набор 10 шт',
    price: 650,
    description: 'Набор декоративных атласных лент разных цветов и ширины. Идеально подходит для скрапбукинга, упаковки подарков, шитья и других видов рукоделия. В комплекте 10 лент длиной по 1 метр.',
    images: [
      'https://basket-13.wbbasket.ru/vol1986/part198690/198690101/images/c516x688/1.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxDjOSxM0P6Fongac-Gaz1ux4LhicPTpbhA&s',
    ],
    category: 'decorating',
    subcategory: 'ribbons',
    brand: 'Gamma',
    inStock: true,
    rating: 4.6,
    reviewCount: 54,
    attributes: {
      material: 'Атлас',
      count: 10,
      width: '6-25 мм',
      length: '1 м/шт',
      colors: 'Ассорти',
    },
  },
  {
    id: 15,
    name: 'Набор инструментов для лепки, 14 предметов',
    price: 780,
    description: 'Профессиональный набор инструментов для работы с глиной, полимерной глиной, пластилином и другими материалами для лепки. В комплекте 14 инструментов разной формы из прочного пластика с деревянными ручками.',
    images: [
      'https://artbaza.com.ua/17580/nabor-skulpturnykh-stekov-v-kholdere-14-predmetov-regina.jpg',
      'https://ir.ozone.ru/s3/multimedia-r/c1000/6201155859.jpg',
    ],
    category: 'sculpting',
    subcategory: 'tools',
    brand: 'Fimo',
    inStock: true,
    rating: 4.7,
    reviewCount: 38,
    attributes: {
      count: 14,
      material: 'Пластик, дерево',
      packaging: 'Текстильный чехол',
      toolTypes: 'Стеки, петли, ножи, шпатели',
    },
  },
  {
    id: 16,
    name: 'Набор декоративных блесток, 24 цвета',
    price: 550,
    description: 'Набор мелких декоративных блесток разных цветов для скрапбукинга, декорирования, изготовления открыток и других творческих проектов. В комплекте 24 баночки с блестками разных оттенков.',
    images: [
      'https://basket-10.wbbasket.ru/vol1584/part158444/158444677/images/big/1.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ470Lr7uYDIIdI1EWMXM2A4o6LfM-uqT1K8g&s',
    ],
    category: 'decorating',
    subcategory: 'glitter',
    brand: 'Craft&Clay',
    inStock: true,
    rating: 4.5,
    reviewCount: 63,
    attributes: {
      count: 24,
      type: 'Мелкие блестки',
      volume: '5 мл/баночка',
      packaging: 'Пластиковые баночки в контейнере',
    },
    isNew: true,
  },
];

export const getProductsByCategory = (categoryId?: string) => {
  if (!categoryId) return products;
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getPopularProducts = () => {
  return products.filter(product => product.isPopular);
};

export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

export const getRelatedProducts = (product: Product) => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
};

export const getProductsBySearch = (query: string) => {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().trim().split(' ');
  
  return products.filter(product => {
    const searchableText = `
      ${product.name.toLowerCase()}
      ${product.description.toLowerCase()}
      ${product.brand.toLowerCase()}
      ${product.category.toLowerCase()}
    `;
    
    return searchTerms.every(term => searchableText.includes(term));
  }).slice(0, 5); // Limit to 5 results for dropdown
};