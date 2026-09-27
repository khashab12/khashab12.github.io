/** All site copy. Arabic is the default; keep both languages in sync. */
export type Lang = 'ar' | 'en'

const ar = {
  meta: {
    title: 'محمد الخشاب — مواقع ومنيو إلكتروني للكافيهات والمطاعم',
  },
  skip: 'تخطَّ إلى المحتوى',
  nav: {
    wordmark: 'محمد',
    langSwitch: 'EN',
    langSwitchLabel: 'English',
  },
  cta: {
    contact: 'تواصل معي',
    work: 'شاهد أعمالي',
  },
  hero: {
    eyebrow: 'مطوّر واجهات · القاهرة',
    name: 'محمد الخشاب',
    line: 'أصمّم مواقع ومنيو إلكتروني للكافيهات والمطاعم، بهوية البراند الخاص بك',
    phoneLabel: 'نموذج منيو إلكتروني يتحرك تلقائيًا',
  },
  features: [
    'منيو بالأسعار والسعرات',
    'موقع الفرع على الخريطة',
    'زر طلب عبر واتساب',
    'رابط تقييم جوجل',
    'عربي / English',
    'وضع ليلي',
    'ألوان وشعار البراند',
  ],
  about: {
    title: 'عنّي',
    body: [
      'أنا محمد، مطوّر واجهات أمامية مقيم في القاهرة، وطالب هندسة إلكترونيات واتصالات في جامعة ٦ أكتوبر.',
      'أصمّم وأبني مواقع ومنيوهات رقمية للكافيهات والمطاعم في مصر والرياض، وأدير إعلاناتها. أفضّل أن ترى الشغل بنفسك قبل أن تدفع، لذلك أبدأ دائمًا بنموذج مجاني بألوانك وشعارك.',
    ],
    facts: [
      { label: 'الدراسة', value: 'هندسة إلكترونيات واتصالات — جامعة ٦ أكتوبر' },
      { label: 'العمل', value: 'مطوّر واجهات أمامية' },
      { label: 'المكان', value: 'القاهرة · أعمل مع أماكن في مصر والرياض' },
    ],
  },
  services: {
    title: 'الخدمات',
    menu: {
      title: 'موقع ومنيو إلكتروني لمكانك',
      body: 'صفحة سريعة على الجوال، مصممة بألوان وشعار البراند الخاص بك.',
      features: ['المنيو كامل بالأسعار', 'موقع المكان على الخريطة', 'زر طلب عبر واتساب', 'رابط تقييم جوجل', 'عربي وإنجليزي', 'السعرات الحرارية', 'وضع ليلي'],
      paletteLabel: 'جرّب ألوانًا مختلفة',
      preview: {
        place: 'مكانك',
        category: 'قهوة ساخنة',
        items: [
          { name: 'لاتيه', cal: '١٩٠ سعرة', price: '١٨' },
          { name: 'كورتادو', cal: '١٢٠ سعرة', price: '١٦' },
          { name: 'إسبريسو', cal: '١٠ سعرات', price: '١٢' },
        ],
        order: 'اطلب عبر واتساب',
      },
    },
    ads: {
      title: 'إدارة الإعلانات',
      body: 'على كل المنصات التي يستخدمها عملاؤك.',
      platforms: ['TikTok', 'Instagram / Facebook', 'Snapchat', 'Google'],
      points: ['استهداف الناس القريبين من مكانك', 'تصاميم إعلانية جديدة كل شهر', 'تقرير شهري واضح'],
    },
    shopify: {
      title: 'متاجر Shopify',
      body: 'متجر إلكتروني جاهز للبيع، بنفس هوية البراند.',
    },
  },
  how: {
    title: 'طريقة العمل',
    of: 'من',
    steps: [
      { title: 'أدرس البراند الخاص بك', body: 'الشعار، الألوان، الخطوط، وأسلوب المكان.' },
      { title: 'أبني نموذجًا بألوانك وشعارك', body: 'ترى منيو مكانك جاهزًا قبل أي التزام.' },
      { title: 'تجرّبه ١٤ يومًا مجانًا', body: 'أي تعديل خلال فترة التجربة مجاني.' },
      { title: 'تختار الطريقة المناسبة لك', body: 'بعد التجربة، أحد خيارين:' },
    ],
    visual: {
      logo: 'شعارك',
      place: 'مكانك',
      days: 'يوم',
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
    conceptsTitle: 'نماذج تصميم',
    conceptsNote: 'نماذج صمّمتها لأماكن مختلفة، معروضة بدون أسماء أو شعارات. اضغط على أي نموذج لتجرّبه.',
    open: 'جرّب النموذج',
    visit: 'زيارة الموقع',
    showAll: (n: number) => `عرض كل النماذج (${n})`,
    close: 'إغلاق',
    prev: 'النموذج السابق',
    next: 'النموذج التالي',
    newTab: 'فتح في صفحة كاملة',
    concept: (n: number) => `Concept ${n}`,
  },
  testimonials: {
    title: 'آراء العملاء',
  },
  contact: {
    title: 'تواصل معي',
    body: 'أرسل لي اسم مكانك، وأجهّز لك نموذجًا مجانيًا بألوانك وشعارك.',
    whatsapp: 'واتساب',
    instagram: 'إنستقرام',
    email: 'البريد الإلكتروني',
  },
  footer: {
    rights: (year: number) => `© ${year} محمد الخشاب`,
    city: 'القاهرة',
  },
}

export type Dict = typeof ar

const en: Dict = {
  meta: {
    title: 'Mohamed Elkhashab — Websites & digital menus for cafés and restaurants',
  },
  skip: 'Skip to content',
  nav: {
    wordmark: 'Mohamed',
    langSwitch: 'ع',
    langSwitchLabel: 'العربية',
  },
  cta: {
    contact: 'Contact me',
    work: 'See my work',
  },
  hero: {
    eyebrow: 'Frontend developer · Cairo',
    name: 'Mohamed Elkhashab',
    line: 'I build websites and digital menus for cafés and restaurants, in your brand’s own look',
    phoneLabel: 'A digital menu example, scrolling automatically',
  },
  features: [
    'Menu with prices & calories',
    'Location on the map',
    'WhatsApp order button',
    'Google review link',
    'Arabic / English',
    'Dark mode',
    'Your brand colors & logo',
  ],
  about: {
    title: 'About',
    body: [
      'I’m Mohamed, a frontend developer based in Cairo and an Electronics & Communications Engineering student at October 6 University.',
      'I design and build websites and digital menus for cafés and restaurants in Egypt and Riyadh, and run their ads. I’d rather you see the work before you pay, so I always start with a free demo in your colors and logo.',
    ],
    facts: [
      { label: 'Study', value: 'Electronics & Communications Eng. — October 6 University' },
      { label: 'Work', value: 'Frontend developer' },
      { label: 'Based in', value: 'Cairo · working with places in Egypt and Riyadh' },
    ],
  },
  services: {
    title: 'Services',
    menu: {
      title: 'Website + digital menu for your place',
      body: 'A fast, phone-first page designed in your brand colors and logo.',
      features: ['Full menu with prices', 'Location on the map', 'WhatsApp order button', 'Google review link', 'Arabic & English', 'Calories', 'Dark mode'],
      paletteLabel: 'Try a different palette',
      preview: {
        place: 'Your place',
        category: 'Hot coffee',
        items: [
          { name: 'Latte', cal: '190 kcal', price: '18' },
          { name: 'Cortado', cal: '120 kcal', price: '16' },
          { name: 'Espresso', cal: '10 kcal', price: '12' },
        ],
        order: 'Order on WhatsApp',
      },
    },
    ads: {
      title: 'Ads management',
      body: 'On every platform your customers use.',
      platforms: ['TikTok', 'Instagram / Facebook', 'Snapchat', 'Google'],
      points: ['Targeting people near your place', 'New ad creatives every month', 'A clear monthly report'],
    },
    shopify: {
      title: 'Shopify stores',
      body: 'An online store ready to sell, in the same brand identity.',
    },
  },
  how: {
    title: 'How I work',
    of: 'of',
    steps: [
      { title: 'I study your brand', body: 'Logo, colors, type and the feel of the place.' },
      { title: 'I build a demo in your colors and logo', body: 'You see your own menu, ready, before committing to anything.' },
      { title: 'You try it free for 14 days', body: 'Any change during the trial is free.' },
      { title: 'You choose what suits you', body: 'After the trial, one of two options:' },
    ],
    visual: {
      logo: 'Your logo',
      place: 'Your place',
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
    conceptsTitle: 'Design concepts',
    conceptsNote: 'Designs I made for different places, shown without names or logos. Tap any one to try it.',
    open: 'Try it',
    visit: 'Visit site',
    showAll: (n: number) => `Show all concepts (${n})`,
    close: 'Close',
    prev: 'Previous concept',
    next: 'Next concept',
    newTab: 'Open full page',
    concept: (n: number) => `Concept ${n}`,
  },
  testimonials: {
    title: 'What clients say',
  },
  contact: {
    title: 'Get in touch',
    body: 'Send me your place’s name and I’ll prepare a free demo in your colors and logo.',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    email: 'Email',
  },
  footer: {
    rights: (year: number) => `© ${year} Mohamed Elkhashab`,
    city: 'Cairo',
  },
}

export const dictionaries: Record<Lang, Dict> = { ar, en }

/** Arabic-Indic digits for Arabic copy. */
export const formatNumber = (n: number, lang: Lang) => n.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')
