import { Destination, Service, SuccessStory, FAQ } from './types';

export const DESTINATIONS: Destination[] = [
  // Europe
  {
    id: 'uk',
    name: 'United Kingdom',
    description: 'World-renowned education and historic campuses with global recognition.',
    color: '#00247D',
    icon: 'fa-solid fa-building-columns',
    bgClass: 'bg-blue-50',
    image: 'https://flagcdn.com/w160/gb.png',
    region: 'Europe'
  },
  {
    id: 'germany',
    name: 'Germany',
    description: 'Leader in engineering and technology with low tuition programs.',
    color: '#000000',
    icon: 'fa-solid fa-gears',
    bgClass: 'bg-yellow-50',
    image: 'https://flagcdn.com/w160/de.png',
    region: 'Europe'
  },
  {
    id: 'france',
    name: 'France',
    description: 'European hub for business, fashion, and culinary excellence.',
    color: '#0055A4',
    icon: 'fa-solid fa-archway',
    bgClass: 'bg-indigo-50',
    image: 'https://flagcdn.com/w160/fr.png',
    region: 'Europe'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    description: 'A tech hub with warm hospitality and 2-year post-study work visa.',
    color: '#169B62',
    icon: 'fa-solid fa-clover',
    bgClass: 'bg-green-50',
    image: 'https://flagcdn.com/w160/ie.png',
    region: 'Europe'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    description: 'World-class hospitality and finance programs in a stunning alpine setting.',
    color: '#D52B1E',
    icon: 'fa-solid fa-mountain-sun',
    bgClass: 'bg-red-50',
    image: 'https://flagcdn.com/w160/ch.png',
    region: 'Europe'
  },
  {
    id: 'malta',
    name: 'Malta',
    description: 'Affordable English-speaking education in the heart of the Mediterranean.',
    color: '#D62828',
    icon: 'fa-solid fa-sun-bright',
    bgClass: 'bg-orange-50',
    image: 'https://flagcdn.com/w160/mt.png',
    region: 'Europe'
  },
  // Americas & Pacific
  {
    id: 'canada',
    name: 'Canada',
    description: 'High quality of life, diversity, and welcoming post-study work policies.',
    color: '#FF0000',
    icon: 'fa-solid fa-leaf',
    bgClass: 'bg-red-50',
    image: 'https://flagcdn.com/w160/ca.png',
    region: 'Americas & Pacific'
  },
  {
    id: 'australia',
    name: 'Australia',
    description: 'High standard of living and top-tier research institutions.',
    color: '#00008B',
    icon: 'fa-solid fa-sun',
    bgClass: 'bg-blue-50',
    image: 'https://flagcdn.com/w160/au.png',
    region: 'Americas & Pacific'
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    description: 'Safe, scenic environment excellent for research-based programs.',
    color: '#00247D',
    icon: 'fa-solid fa-mountain',
    bgClass: 'bg-blue-50',
    image: 'https://flagcdn.com/w160/nz.png',
    region: 'Americas & Pacific'
  },
  // Asia & Other
  {
    id: 'singapore',
    name: 'Singapore',
    description: 'A global business hub with top-ranked universities in Asia.',
    color: '#ED2939',
    icon: 'fa-solid fa-landmark',
    bgClass: 'bg-pink-50',
    image: 'https://flagcdn.com/w160/sg.png',
    region: 'Asia & Other'
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    description: 'Affordable education with twinning programs from UK and Aus.',
    color: '#003399',
    icon: 'fa-solid fa-school',
    bgClass: 'bg-indigo-50',
    image: 'https://flagcdn.com/w160/my.png',
    region: 'Asia & Other'
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    description: 'Leader in innovation with generous scholarship opportunities.',
    color: '#000000',
    icon: 'fa-solid fa-microchip',
    bgClass: 'bg-gray-50',
    image: 'https://flagcdn.com/w160/kr.png',
    region: 'Asia & Other'
  },
  {
    id: 'uae',
    name: 'UAE',
    description: 'A global hub for business and innovation in the heart of the Middle East.',
    color: '#00732F',
    icon: 'fa-solid fa-city',
    bgClass: 'bg-emerald-50',
    image: 'https://flagcdn.com/w160/ae.png',
    region: 'Asia & Other'
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Profile Review & Counselling',
    description: 'We carefully assess your academics, English, finances and goals to craft a personalized roadmap.',
    icon: 'fa-solid fa-user-graduate',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  {
    id: 2,
    title: 'Course & University Mapping',
    description: 'Find your perfect academic home from our extensive network of elite global partners.',
    icon: 'fa-solid fa-map-location-dot',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500'
  },
  {
    id: 3,
    title: 'Application & Documentation',
    description: 'Precision-perfect paperwork and SOP guidance to maximize your admission chances.',
    icon: 'fa-solid fa-file-lines',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500'
  },
  {
    id: 4,
    title: 'Interview Preparation & Queries',
    description: 'Face admissions committees and visa officers with absolute confidence through expert drills.',
    icon: 'fa-solid fa-comments-question',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500'
  },
  {
    id: 5,
    title: 'Visa Application & Preparation',
    description: 'Navigate the complex landscape of international migration laws with our seasoned experts.',
    icon: 'fa-solid fa-passport',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500'
  },
  {
    id: 6,
    title: 'Multiple Program Routes',
    description: 'From foundation years to post-grad, we unlock every possible entry point for your success.',
    icon: 'fa-solid fa-route',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500'
  },
  {
    id: 7,
    title: 'Pre-Departure & After-Arrival',
    description: 'Total support from the moment you leave home until you settle comfortably in your new country.',
    icon: 'fa-solid fa-plane-arrival',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-500'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 1,
    name: 'Dinuka Perera',
    university: 'United Kingdom',
    quote: "Honestly super thankful to Gradway. I had no idea where to start, but they guided me so well from Day 1. Today I'm finally in the UK because of them. Highly recommend!",
    image: 'https://i.pravatar.cc/150?u=dinuka',
    tag: 'Msc in Business Management'
  },
  {
    id: 2,
    name: 'Hashini Jayawardena',
    university: 'United Kingdom',
    quote: "Big thanks to the Gradway team. They handled my application, visa, everything without any stress for me. Really appreciate the support machan, thank you so much!",
    image: 'https://i.pravatar.cc/150?u=hashini',
    tag: 'MA in Global Business And Management'
  },
  {
    id: 3,
    name: 'Tharusha Fernando',
    university: 'United Kingdom',
    quote: "I'm so happy. Never thought I'd actually make it to the UK, but they kept pushing me and helping with every small detail.",
    image: 'https://i.pravatar.cc/150?u=tharusha',
    tag: 'Bsc in Computer Sciece'
  },
  {
    id: 4,
    name: 'Isuru Jayasuriya',
    university: 'United Kingdom',
    quote: "Very friendly staff, quick replies, and they know exactly what to do. Thanks a lot for helping me achieve this dream!",
    image: 'https://i.pravatar.cc/150?u=isuru',
    tag: 'Bsc in Civil Engineering'
  }
];

export const MAIN_FAQ: FAQ[] = [
  {
    id: 1,
    category: 'General',
    question: "How do I start my study abroad journey with Gradway?",
    answer: "The best way is to book a free initial consultation. We'll review your academic background, career goals, and financial preferences to map out the best countries and universities for you."
  },
  {
    id: 2,
    category: 'General',
    question: "Do you charge any consultation fees for students?",
    answer: "No, Gradway provides free initial profile reviews and counselling for all Sri Lankan students. We are committed to making global education accessible."
  },
  {
    id: 3,
    category: 'Visa',
    question: "What is the typical success rate for student visas?",
    answer: "While final decisions rest with embassy officials, Gradway boasts a very high success rate due to our meticulous documentation process and personalized interview preparation."
  },
  {
    id: 4,
    category: 'General',
    question: "Can I work while studying in the UK or Canada?",
    answer: "Yes, most student visas allow part-time work (typically up to 20 hours per week during term time and full-time during holidays) to help cover living expenses."
  },
  {
    id: 5,
    category: 'General',
    question: "What English language tests do I need to take?",
    answer: "Most universities require IELTS, PTE, or TOEFL scores. The required score varies by university and course level (undergraduate vs postgraduate)."
  },
  {
    id: 6,
    category: 'General',
    question: "Do you assist with scholarship applications?",
    answer: "Absolutely! We identify potential university-specific and government-funded scholarships that match your profile and guide you through the application process."
  },
  {
    id: 7,
    category: 'General',
    question: "How long does the entire application process take?",
    answer: "On average, it takes 4 to 6 months from the initial consultation to getting your visa. We recommend starting early to ensure all document deadlines are met."
  },
  {
    id: 8,
    category: 'General',
    question: "Can I bring my spouse or dependents with me?",
    answer: "Dependency rules vary significantly by country and level of study (e.g., Master's vs. Undergraduate). We provide specific advice based on the destination you choose."
  }
];

export const FULL_FAQ: FAQ[] = [
  ...MAIN_FAQ,
  {
    id: 9,
    category: 'Niche',
    question: "What if I have a gap in my education?",
    answer: "A gap is not a dealbreaker. We help you document work experience, internships, or certifications that explain the period and strengthen your application."
  },
  {
    id: 10,
    category: 'Niche',
    question: "Do you help with finding student accommodation?",
    answer: "Yes, as part of our after-arrival support, we help you find university dorms or private rentals and guide you on the safest and most affordable areas to live."
  },
  {
    id: 11,
    category: 'Visa',
    question: "What are 'Proof of Funds' requirements for the UK?",
    answer: "For the UK, you generally need to show you have enough money to pay for your tuition fees for one year and monthly living costs for up to 9 months."
  },
  {
    id: 12,
    category: 'Niche',
    question: "Can I transfer credits from my current Sri Lankan degree?",
    answer: "It depends on the university's 'Recognition of Prior Learning' policy. We can facilitate communication with universities to see if your current credits can be transferred."
  },
  {
    id: 13,
    category: 'Niche',
    question: "Is health insurance mandatory for international students?",
    answer: "Yes, almost all major study destinations require students to have international student health insurance (like OSHC in Australia or the IHS in the UK)."
  },
  {
    id: 14,
    category: 'General',
    question: "What is a Statement of Purpose (SOP)?",
    answer: "An SOP is a critical essay describing your background, goals, and why you chose a specific course. We provide expert feedback to make your SOP stand out."
  },
  {
    id: 15,
    category: 'Visa',
    question: "What is a 'Conditional Offer' vs an 'Unconditional Offer'?",
    answer: "A Conditional Offer means you must meet certain requirements (like a final IELTS score). An Unconditional Offer means you have been fully accepted."
  },
  {
    id: 16,
    category: 'Niche',
    question: "Are there age limits for studying abroad?",
    answer: "Education has no age limit! While some visas have specific conditions, many universities welcome mature students for postgraduate and professional courses."
  },
  {
    id: 17,
    category: 'General',
    question: "Do I need to pay tuition fees before the visa?",
    answer: "Most universities require a tuition deposit or the first semester's fees to issue the CAS (UK) or COE (Australia) needed for the visa application."
  }
];