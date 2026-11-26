/** All site copy. Arabic is the default; keep both languages in sync. */
export type Lang = 'ar' | 'en'

const ar = {
  meta: {
    title: 'محمد الخشاب ويوسف سمير — مواقع وتطبيقات للعيادات والمتاجر والكافيهات وكل المشاريع',
  },
  skip: 'تخطَّ إلى المحتوى',
  nav: {
    wordmark: 'محمد × يوسف',
    langSwitch: 'EN',
    langSwitchLabel: 'English',
    links: [
      { href: '#work', label: 'الأعمال' },
      { href: '#services', label: 'الخدمات' },
      { href: '#team', label: 'من نحن' },
    ],
  },
  cta: {
    contact: 'تواصل معنا',
    work: 'شاهد أعمالنا',
  },
  hero: {
    eyebrow: 'تصميم وتطوير · القاهرة · مصر والسعودية',
    title: 'مشروعك يستحق موقعًا يليق به.',
    names: 'محمد الخشاب × يوسف سمير',
    line: 'نصمّم ونبني مواقع وتطبيقات لمشروعك — عيادة، متجر، كافيه أو مطعم، شركة أو أي نشاط — بهوية البراند الخاص بك، وتجيب لك عملاء أكثر.',
    phoneLabel: 'نموذج موقع يتحرك تلقائيًا',
    browserLabel: 'نموذج متجر إلكتروني',
    stats: [
      { value: '+٥٠', label: 'موقعًا ونموذجًا' },
      { value: '٧ أيام', label: 'تجربة مجانية' },
      { value: 'AR / EN', label: 'عربي وإنجليزي' },
    ],
  },
  features: [
    'مواقع للعيادات',
    'منيو للكافيهات والمطاعم',
    'متاجر إلكترونية بسلة ومفضلة',
    'تطبيقات أندرويد وآيفون',
    'حجز وطلب عبر واتساب',
    'مساعد ذكي يرد على عملائك',
    'الفروع على الخريطة',
    'عربي / English',
    'ألوان وشعار البراند',
  ],
  team: {
    title: 'من نحن',
    intro: 'فريق من شخصين في القاهرة، نشتغل مع مشاريع في مصر والسعودية والوطن العربي. كل واحد فينا عنده نقطة قوة، وكل مشروع بياخد الاثنين.',
    members: [
      {
        id: 'mohamed',
        initials: 'م',
        name: 'محمد الخشاب',
        role: 'مطوّر واجهات · مواقع ومنيوهات وإعلانات',
        body: 'طالب هندسة إلكترونيات واتصالات في جامعة ٦ أكتوبر. يبني مواقع سريعة على الجوال بهوية البراند، ومنيوهات رقمية للكافيهات والمطاعم، ومتاجر Shopify، ويدير الإعلانات ويجهّز بوتات الرد على الواتساب.',
        skills: ['React', 'TypeScript', 'Tailwind', 'Shopify', 'Ads', 'WhatsApp bots'],
      },
      {
        id: 'yousef',
        initials: 'ي',
        name: 'يوسف سمير',
        role: 'تصميم وتطوير · مواقع وتطبيقات',
        body: 'يصمّم ويطوّر مواقع للمتاجر والشركات والعيادات بتجربة شراء وحجز كاملة، وتطبيقات أندرويد وآيفون، ومساعدًا ذكيًا يجيب عن أسئلة العملاء، ويجهّز نشاطك على خرائط جوجل.',
        skills: ['Web design', 'E-commerce', 'Android / iOS', 'AI assistant', 'Google Maps'],
      },
    ],
  },
  services: {
    title: 'الخدمات',
    menu: {
      title: 'موقع إلكتروني لمشروعك',
      body: 'موقع سريع على الجوال بهوية البراند الخاص بك، يعرض خدماتك أو منتجاتك أو منيوك، ويحوّل الزائر لعميل بضغطة.',
      extras: 'وأي إضافة يحتاجها مشروعك، زي الحجز أو الطلب والدفع من الموقع نفسه، أو سلة ومفضلة وحسابات للعملاء، نضيفها بسعر منفصل.',
      features: ['الخدمات أو المنتجات أو المنيو بالأسعار', 'العروض والأقسام والفروع', 'زر حجز أو طلب عبر واتساب', 'الموقع على الخريطة', 'رابط تقييم جوجل', 'عربي وإنجليزي', 'وضع ليلي'],
      paletteLabel: 'جرّب ألوانًا مختلفة',
      preview: {
        place: 'مشروعك',
        category: 'الخدمات',
        items: [
          { name: 'الباقة الأساسية', cal: 'الأكثر طلبًا', price: '٢٩٩' },
          { name: 'الباقة المميزة', cal: 'عرض الشهر', price: '٤٥٠' },
          { name: 'استشارة', cal: '٣٠ دقيقة', price: '١٥٠' },
        ],
        order: 'احجز أو اطلب عبر واتساب',
      },
    },
    ads: {
      title: 'إدارة الإعلانات',
      body: 'على كل المنصات التي يستخدمها عملاؤك.',
      platforms: ['TikTok', 'Instagram / Facebook', 'Snapchat', 'Google'],
      points: ['استهداف الناس القريبين منك', 'تصاميم إعلانية جديدة كل شهر', 'تقرير شهري واضح'],
    },
    shopify: {
      title: 'متاجر Shopify',
      body: 'متجر إلكتروني جاهز للبيع، بنفس هوية البراند.',
    },
    apps: {
      title: 'تطبيقات موبايل',
      body: 'تطبيق أندرويد أو آيفون مع رفعه على المتاجر ومتابعة المراجعة، أو APK مباشر، أو تطبيق ويب يتثبّت على شاشة الآيفون.',
    },
    bots: {
      title: 'رد آلي ومساعد ذكي',
      body: 'بوت واتساب يرد ٢٤ ساعة وياخد الطلب كامل، ومساعد ذكي يجاوب أسئلة عملائك، وملخص يومي باللي محتاج رد.',
    },
    reach: {
      title: 'الظهور والدعم',
      body: 'دومين واستضافة، تهيئة لمحركات البحث ومعاينة الرابط، نشاطك على خرائط جوجل، وصيانة وتعديلات بعد التسليم.',
    },
  },
  how: {
    title: 'طريقة العمل',
    of: 'من',
    steps: [
      { title: 'ندرس البراند الخاص بك', body: 'الشعار، الألوان، الخطوط، وأسلوب المكان.' },
      { title: 'نبني نموذجًا بألوانك وشعارك', body: 'ترى موقع مشروعك جاهزًا قبل أي التزام.' },
      { title: 'تجرّبه ٧ أيام مجانًا', body: 'أي تعديل خلال فترة التجربة مجاني.' },
      { title: 'تختار الطريقة المناسبة لك', body: 'بعد التجربة، أحد خيارين:' },
    ],
    visual: {
      logo: 'شعارك',
      place: 'مشروعك',
      days: 'أيام',
      free: 'تعديلات مجانية',
    },
    plans: [
      { title: 'اشتراك شهري رمزي', body: 'تعديلات غير محدودة في أي وقت.' },
      { title: 'شراء مرة واحدة', body: 'الموقع ملكك، والتعديلات بعدها بسعر منفصل.' },
    ],
  },
  work: {
    title: 'الأعمال',
    realTitle: 'أعمال حقيقية',
    featuredTitle: 'أفضل أعمالنا',
    featuredNote: 'مشاريع حقيقية لعملاء، وديموهات تفاعلية تقدر تجربها بنفسك.',
    tagReal: 'مشروع حقيقي',
    tagDemo: 'ديمو تفاعلي',
    tagBest: 'الأبرز',
    by: { mohamed: 'محمد', yousef: 'يوسف' } as Record<string, string>,
    tryIt: 'جرّبه',
    featured: {
      tiffany: {
        title: 'تيفاني كلينك — موقع عيادة بثلاثة فروع',
        body: 'موقع لعيادة جلدية وتجميل وأسنان في الرياض: الخدمات والأسعار لكل فرع، العروض، الأطباء، الأسئلة الشائعة، والحجز عبر واتساب الفرع. عربي وإنجليزي، بهوية العيادة (البيج والذهبي).',
      },
      damas: {
        title: 'مطعم دمس — منيو تفاعلي على شكل كتاب',
        body: 'منيو رقمي بتقليب صفحات زي الكتاب الحقيقي لمطعم مصري في الرياض. عربي من اليمين للشمال، متجاوب مع الموبايل، وبهوية المطعم (الأحمر والذهبي).',
        book: 'قائمة الطعام',
      },
      volt: {
        title: 'ڤولت — متجر موبايلات كامل',
        body: 'متجر إلكتروني لموبايلات مجددة: سلة، مفضلة، تسجيل دخول، وفلاتر حسب الماركة والسعر. تجريبي، لكنه يبدو حقيقيًا.',
      },
      rukn: {
        title: 'رُكن — موقع تطوير عقاري',
        body: 'تصفّح المشروعات والوحدات واحسب قسطك بنفسك. الوحدة تُباع قبل المكالمة الأولى، من غير مندوب.',
      },
      lion: {
        title: 'Egypt Lion Auto Service — متجر Shopify لقطع غيار السيارات',
        body: 'متجر منظّم حسب موديلات بيجو وسنين الصنع، مع تعديلات مخصّصة على الثيم (قوائم بعناوين على سطرين، صور الأقسام في المنيو).',
      },
      bot: {
        title: 'بوت واتساب للمتاجر',
        body: 'يرد على العملاء ٢٤ ساعة، ياخد الطلب كامل، ويسجّله تلقائياً في جدول.',
      },
      library: {
        title: 'نموذج أولي تفاعلي — مكتبة حكايات',
        body: 'Prototype لمكتبة رقمية للأطفال: تصنيفات، قصص مصورة، قراءة بصوت، وأسئلة بنجوم.',
      },
    },
    demosTitle: 'ديموهات تفاعلية',
    demosNote: 'مواقع كاملة لأنشطة مختلفة بأسماء تجريبية. افتح أيًّا منها وجرّب السلة والحجز والطلب بنفسك.',
    filters: { all: 'الكل', store: 'متاجر', food: 'مطاعم وكافيهات', service: 'خدمات وشركات' } as Record<string, string>,
    conceptsTitle: 'نماذج منيو وصفحات',
    conceptsNote: 'نماذج صمّمناها لأماكن حقيقية، معروضة بدون أسماء أو شعارات. اضغط على أي نموذج لتجرّبه.',
    open: 'جرّب النموذج',
    visit: 'زيارة الموقع',
    showAll: (n: number) => `عرض كل النماذج (${n})`,
    close: 'إغلاق',
    prev: 'النموذج السابق',
    next: 'النموذج التالي',
    newTab: 'فتح في صفحة كاملة',
    scrollHint: 'اسحب لتحت',
    concept: (n: number) => `Concept ${n}`,
    demoNote: 'الديموهات التفاعلية بأسماء تجريبية لعرض التصميم وتجربة الاستخدام، والطلبات والتسجيل فيها للتجربة فقط.',
  },
  testimonials: {
    title: 'آراء العملاء',
  },
  contact: {
    title: 'تواصل معنا',
    body: 'ابعت لنا اسم مشروعك، ونجهّز لك نموذجًا مجانيًا بألوانك وشعارك.',
    whatsapp: 'واتساب',
    instagram: 'إنستقرام',
    email: 'البريد الإلكتروني',
  },
  footer: {
    rights: (year: number) => `© ${year} محمد الخشاب · يوسف سمير`,
    city: 'القاهرة',
  },
}

export type Dict = typeof ar

const en: Dict = {
  meta: {
    title: 'Mohamed Elkhashab & Yousef Samir — Websites and apps for clinics, stores, cafés and any business',
  },
  skip: 'Skip to content',
  nav: {
    wordmark: 'Mohamed × Yousef',
    langSwitch: 'ع',
    langSwitchLabel: 'العربية',
    links: [
      { href: '#work', label: 'Work' },
      { href: '#services', label: 'Services' },
      { href: '#team', label: 'About us' },
    ],
  },
  cta: {
    contact: 'Contact us',
    work: 'See our work',
  },
  hero: {
    eyebrow: 'Design & development · Cairo · Egypt & Saudi Arabia',
    title: 'Your business deserves a website that fits it.',
    names: 'Mohamed Elkhashab × Yousef Samir',
    line: 'We design and build websites and apps for your business — a clinic, a store, a café or restaurant, a company or anything else — in your brand’s own look, built to bring you more customers.',
    phoneLabel: 'A website example, scrolling automatically',
    browserLabel: 'An online store demo',
    stats: [
      { value: '50+', label: 'sites & demos' },
      { value: '7 days', label: 'free trial' },
      { value: 'AR / EN', label: 'Arabic & English' },
    ],
  },
  features: [
    'Clinic websites',
    'Café & restaurant menus',
    'Online stores with cart & wishlist',
    'Android & iOS apps',
    'WhatsApp booking & orders',
    'AI assistant for your customers',
    'Branches on the map',
    'Arabic / English',
    'Your brand colors & logo',
  ],
  team: {
    title: 'About us',
    intro: 'A two-person team in Cairo, working with businesses in Egypt, Saudi Arabia and across the Arab world. Each of us has a strength, and every project gets both.',
    members: [
      {
        id: 'mohamed',
        initials: 'M',
        name: 'Mohamed Elkhashab',
        role: 'Frontend developer · websites, menus & ads',
        body: 'An Electronics & Communications Engineering student at October 6 University. Builds fast, phone-first sites in your brand, digital menus for cafés and restaurants and Shopify stores, and runs ads and WhatsApp auto-reply bots.',
        skills: ['React', 'TypeScript', 'Tailwind', 'Shopify', 'Ads', 'WhatsApp bots'],
      },
      {
        id: 'yousef',
        initials: 'Y',
        name: 'Yousef Samir',
        role: 'Design & development · websites & apps',
        body: 'Designs and develops websites for stores, companies and clinics with full shopping and booking flows, Android and iOS apps, an AI assistant that answers customer questions, and sets up your business on Google Maps.',
        skills: ['Web design', 'E-commerce', 'Android / iOS', 'AI assistant', 'Google Maps'],
      },
    ],
  },
  services: {
    title: 'Services',
    menu: {
      title: 'A website for your business',
      body: 'A fast, phone-first site in your brand identity that shows your services, products or menu, and turns visitors into customers in one tap.',
      extras: 'Need something extra, like booking, ordering and paying on the site itself, or a cart, wishlist and customer accounts? We can add it, priced separately.',
      features: ['Services, products or menu with prices', 'Offers, sections and branches', 'WhatsApp booking / order button', 'Location on the map', 'Google review link', 'Arabic & English', 'Dark mode'],
      paletteLabel: 'Try a different palette',
      preview: {
        place: 'Your business',
        category: 'Services',
        items: [
          { name: 'Basic package', cal: 'Most popular', price: '299' },
          { name: 'Premium package', cal: 'This month’s offer', price: '450' },
          { name: 'Consultation', cal: '30 min', price: '150' },
        ],
        order: 'Book or order on WhatsApp',
      },
    },
    ads: {
      title: 'Ads management',
      body: 'On every platform your customers use.',
      platforms: ['TikTok', 'Instagram / Facebook', 'Snapchat', 'Google'],
      points: ['Targeting people near you', 'New ad creatives every month', 'A clear monthly report'],
    },
    shopify: {
      title: 'Shopify stores',
      body: 'An online store ready to sell, in the same brand identity.',
    },
    apps: {
      title: 'Mobile apps',
      body: 'An Android or iOS app published to the stores with review follow-up, a direct APK, or a web app that installs on the iPhone home screen.',
    },
    bots: {
      title: 'Auto-replies & AI assistant',
      body: 'A WhatsApp bot that answers 24/7 and takes the full order, an AI assistant for customer questions, and a daily summary of what needs a reply.',
    },
    reach: {
      title: 'Visibility & support',
      body: 'Domain and hosting, search setup and link previews, your business on Google Maps, and maintenance and changes after delivery.',
    },
  },
  how: {
    title: 'How we work',
    of: 'of',
    steps: [
      { title: 'We study your brand', body: 'Logo, colors, type and the feel of the place.' },
      { title: 'We build a demo in your colors and logo', body: 'You see your own site, ready, before committing to anything.' },
      { title: 'You try it free for 7 days', body: 'Any change during the trial is free.' },
      { title: 'You choose what suits you', body: 'After the trial, one of two options:' },
    ],
    visual: {
      logo: 'Your logo',
      place: 'Your business',
      days: 'days',
      free: 'Free changes',
    },
    plans: [
      { title: 'Symbolic monthly subscription', body: 'Unlimited changes, any time.' },
      { title: 'Buy it once', body: 'The site is yours; later changes are priced separately.' },
    ],
  },
  work: {
    title: 'Work',
    realTitle: 'Live work',
    featuredTitle: 'Our best work',
    featuredNote: 'Real client projects, plus interactive demos you can try yourself.',
    tagReal: 'Client project',
    tagDemo: 'Interactive demo',
    tagBest: 'Highlight',
    by: { mohamed: 'Mohamed', yousef: 'Yousef' },
    tryIt: 'Try it',
    featured: {
      tiffany: {
        title: 'Tiffany Clinic — a three-branch clinic website',
        body: 'A site for a dermatology, cosmetic and dental clinic in Riyadh: services and prices per branch, offers, doctors, FAQ, and booking through each branch’s WhatsApp. Arabic & English, in the clinic’s beige & gold identity.',
      },
      damas: {
        title: 'Damas Restaurant — flipbook digital menu',
        body: 'A page-turning digital menu for an Egyptian restaurant in Riyadh. Right-to-left Arabic, fully responsive, in the restaurant’s red & gold identity.',
        book: 'Menu',
      },
      volt: {
        title: 'Volt — a complete phone store',
        body: 'An online store for refurbished phones: cart, wishlist, sign-in, and filters by brand and price. A demo, but it feels real.',
      },
      rukn: {
        title: 'Rukn — a real-estate developer site',
        body: 'Browse projects and units and work out your own installments. The unit sells before the first call, no sales rep needed.',
      },
      lion: {
        title: 'Egypt Lion Auto Service — Shopify auto-parts store',
        body: 'A store organised by Peugeot model and year range, with custom theme work (two-line menu titles, collection images in the drawer).',
      },
      bot: {
        title: 'WhatsApp bot for stores',
        body: 'Answers customers 24/7, takes the full order and logs it to a sheet automatically.',
      },
      library: {
        title: 'Interactive prototype — kids’ library',
        body: 'A clickable prototype for a kids’ digital library: categories, illustrated stories, read-aloud and quizzes with stars.',
      },
    },
    demosTitle: 'Interactive demos',
    demosNote: 'Complete sites for different kinds of business, under sample names. Open any one and try the cart, booking and ordering yourself.',
    filters: { all: 'All', store: 'Stores', food: 'Food & cafés', service: 'Services & companies' },
    conceptsTitle: 'Menu & page concepts',
    conceptsNote: 'Designs we made for real places, shown without names or logos. Tap any one to try it.',
    open: 'Try it',
    visit: 'Visit site',
    showAll: (n: number) => `Show all concepts (${n})`,
    close: 'Close',
    prev: 'Previous concept',
    next: 'Next concept',
    newTab: 'Open full page',
    scrollHint: 'Scroll',
    concept: (n: number) => `Concept ${n}`,
    demoNote: 'Interactive demos use sample names to show design and usability; orders and sign-ups in them are for trying only.',
  },
  testimonials: {
    title: 'What clients say',
  },
  contact: {
    title: 'Get in touch',
    body: 'Send us your business’s name and we’ll prepare a free demo in your colors and logo.',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    email: 'Email',
  },
  footer: {
    rights: (year: number) => `© ${year} Mohamed Elkhashab · Yousef Samir`,
    city: 'Cairo',
  },
}

export const dictionaries: Record<Lang, Dict> = { ar, en }

/** Arabic-Indic digits for Arabic copy. */
export const formatNumber = (n: number, lang: Lang) => n.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')
