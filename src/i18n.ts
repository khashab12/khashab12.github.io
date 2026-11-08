/** All site copy. Arabic is the default; keep both languages in sync. */
export type Lang = 'ar' | 'en'

const ar = {
  meta: {
    title: 'محمد الخشاب — مواقع إلكترونية للعيادات والمتاجر والكافيهات وكل المشاريع',
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
    line: 'أصمّم مواقع إلكترونية لمشروعك — عيادة، متجر، كافيه أو مطعم، أو أي نشاط — بهوية البراند الخاص بك، وتجيب لك عملاء أكثر',
    phoneLabel: 'نموذج موقع يتحرك تلقائيًا',
  },
  features: [
    'مواقع للعيادات',
    'منيو للكافيهات والمطاعم',
    'صفحات للمتاجر والبراندات',
    'حجز وطلب عبر واتساب',
    'الخدمات والأسعار والعروض',
    'الفروع على الخريطة',
    'عربي / English',
    'ألوان وشعار البراند',
  ],
  about: {
    title: 'عنّي',
    body: [
      'أنا محمد، مطوّر واجهات أمامية مقيم في القاهرة، وطالب هندسة إلكترونيات واتصالات في جامعة ٦ أكتوبر.',
      'أصمّم وأبني مواقع إلكترونية للمشاريع في مصر والسعودية: عيادات ومجمعات طبية، متاجر وبراندات، كافيهات ومطاعم، وأي نشاط يحتاج واجهة احترافية تجيب له عملاء. وأدير الإعلانات وأجهّز بوتات الرد على الواتساب. أفضّل أن ترى الشغل بنفسك قبل أن تدفع، لذلك أبدأ دائمًا بنموذج مجاني بألوانك وشعارك.',
    ],
    facts: [
      { label: 'الدراسة', value: 'هندسة إلكترونيات واتصالات — جامعة ٦ أكتوبر' },
      { label: 'العمل', value: 'مطوّر واجهات أمامية' },
      { label: 'المكان', value: 'القاهرة · أعمل مع أماكن في مصر والسعودية' },
    ],
  },
  services: {
    title: 'الخدمات',
    menu: {
      title: 'موقع إلكتروني لمشروعك',
      body: 'موقع سريع على الجوال بهوية البراند الخاص بك، يعرض خدماتك أو منتجاتك أو منيوك، ويحوّل الزائر لعميل بضغطة.',
      extras: 'وأي إضافة يحتاجها مشروعك، زي الحجز أو الطلب والدفع من الموقع نفسه، أو بوت يرد على عملائك في الواتساب، نضيفها بسعر منفصل.',
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
  },
  how: {
    title: 'طريقة العمل',
    of: 'من',
    steps: [
      { title: 'أدرس البراند الخاص بك', body: 'الشعار، الألوان، الخطوط، وأسلوب المكان.' },
      { title: 'أبني نموذجًا بألوانك وشعارك', body: 'ترى موقع مشروعك جاهزًا قبل أي التزام.' },
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
    featuredTitle: 'أعمال مختارة',
    featuredNote: 'مشاريع حقيقية لعملاء، وديموهات تفاعلية تقدر تجربها بنفسك.',
    tagReal: 'مشروع حقيقي',
    tagDemo: 'ديمو تفاعلي',
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
    conceptsTitle: 'نماذج تصميم',
    conceptsNote: 'نماذج صمّمتها لأماكن مختلفة، معروضة بدون أسماء أو شعارات. اضغط على أي نموذج لتجرّبه.',
    open: 'جرّب النموذج',
    visit: 'زيارة الموقع',
    showAll: (n: number) => `عرض كل النماذج (${n})`,
    close: 'إغلاق',
    prev: 'النموذج السابق',
    next: 'النموذج التالي',
    newTab: 'فتح في صفحة كاملة',
    scrollHint: 'اسحب لتحت',
    concept: (n: number) => `Concept ${n}`,
  },
  testimonials: {
    title: 'آراء العملاء',
  },
  contact: {
    title: 'تواصل معي',
    body: 'أرسل لي اسم مشروعك، وأجهّز لك نموذجًا مجانيًا بألوانك وشعارك.',
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
    title: 'Mohamed Elkhashab — Websites for clinics, stores, cafés and any business',
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
    line: 'I build websites for your business — a clinic, a store, a café or restaurant, or anything else — in your brand’s own look, built to bring you more customers',
    phoneLabel: 'A website example, scrolling automatically',
  },
  features: [
    'Clinic websites',
    'Café & restaurant menus',
    'Store & brand pages',
    'WhatsApp booking & orders',
    'Services, prices & offers',
    'Branches on the map',
    'Arabic / English',
    'Your brand colors & logo',
  ],
  about: {
    title: 'About',
    body: [
      'I’m Mohamed, a frontend developer based in Cairo and an Electronics & Communications Engineering student at October 6 University.',
      'I design and build websites for businesses in Egypt and Saudi Arabia: clinics and medical centers, stores and brands, cafés and restaurants, and any business that needs a professional front that brings in customers. I also run ads and set up WhatsApp auto-reply bots. I’d rather you see the work before you pay, so I always start with a free demo in your colors and logo.',
    ],
    facts: [
      { label: 'Study', value: 'Electronics & Communications Eng. — October 6 University' },
      { label: 'Work', value: 'Frontend developer' },
      { label: 'Based in', value: 'Cairo · working with places in Egypt and Saudi Arabia' },
    ],
  },
  services: {
    title: 'Services',
    menu: {
      title: 'A website for your business',
      body: 'A fast, phone-first site in your brand identity that shows your services, products or menu, and turns visitors into customers in one tap.',
      extras: 'Need something extra, like booking, ordering and paying on the site itself, or a bot that answers your customers on WhatsApp? I can add it, priced separately.',
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
  },
  how: {
    title: 'How I work',
    of: 'of',
    steps: [
      { title: 'I study your brand', body: 'Logo, colors, type and the feel of the place.' },
      { title: 'I build a demo in your colors and logo', body: 'You see your own site, ready, before committing to anything.' },
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
    featuredTitle: 'Selected work',
    featuredNote: 'Real client projects, plus interactive demos you can try yourself.',
    tagReal: 'Client project',
    tagDemo: 'Interactive demo',
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
    conceptsTitle: 'Design concepts',
    conceptsNote: 'Designs I made for different places, shown without names or logos. Tap any one to try it.',
    open: 'Try it',
    visit: 'Visit site',
    showAll: (n: number) => `Show all concepts (${n})`,
    close: 'Close',
    prev: 'Previous concept',
    next: 'Next concept',
    newTab: 'Open full page',
    scrollHint: 'Scroll',
    concept: (n: number) => `Concept ${n}`,
  },
  testimonials: {
    title: 'What clients say',
  },
  contact: {
    title: 'Get in touch',
    body: 'Send me your business’s name and I’ll prepare a free demo in your colors and logo.',
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
