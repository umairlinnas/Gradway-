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
    description: 'We carefully assess your academics, English proficiency, finances, and goals to craft a personalized roadmap.',
    icon: 'fa-solid fa-user-graduate',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  {
    id: 2,
    title: 'Course & University Selection',
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
    icon: 'fa-solid fa-clipboard-question',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500'
  },
  {
    id: 5,
    title: 'Visa Application & Preparation',
    description: 'Expert guidance through international student visa and immigration laws, tailored to global study destinations.',
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

export const FULL_FAQ: FAQ[] = [
  // General
  {
    id: 1,
    category: 'General',
    question: "What is studying abroad?",
    answer: "Studying abroad means pursuing your higher education—whether undergraduate, postgraduate, or diploma programs—at a university or college outside Sri Lanka. It offers exposure to world-class education systems, diverse cultures, global networking opportunities, and enhanced career prospects."
  },
  {
    id: 2,
    category: 'General',
    question: "Is studying abroad worth it for Sri Lankan students?",
    answer: "Absolutely! Studying abroad provides numerous benefits including access to internationally recognized qualifications, exposure to cutting-edge research facilities, improved employment prospects with multinational companies, development of independence and cross-cultural skills, and potential pathways to permanent residency."
  },
  {
    id: 3,
    category: 'General',
    question: "Which countries are most popular for Sri Lankan students?",
    answer: "The most popular destinations include Australia (post-study work rights), United Kingdom (prestigious universities), Canada (affordable tuition), United States (diverse options), New Zealand (safe environment), Germany (low tuition fees), and Malaysia (proximity and affordability)."
  },
  {
    id: 4,
    category: 'General',
    question: "When should I start planning to study abroad?",
    answer: "Ideally, begin planning 12-18 months before your intended start date. This allows time for researching universities, preparing for standardized tests (IELTS, TOEFL, SAT, GRE), gathering documents, applying for scholarships, and processing visas."
  },
  // Academic
  {
    id: 5,
    category: 'Academic',
    question: "What are the minimum academic qualifications needed?",
    answer: "Generally: Foundation/Diploma needs O/L or A/L; Undergraduate requires A/Levels (typically minimum 2 passes); Postgraduate requires a Bachelor's degree with minimum GPA (usually 2.5-3.0). Some universities offer pathways if you don't meet direct entry."
  },
  {
    id: 6,
    category: 'Academic',
    question: "Can I study abroad with lower A/L results?",
    answer: "Yes! Many universities offer alternative pathways including foundation year programs, diploma courses that articulate into degree programs, and conditional admission. Gradway specializes in finding these suitable pathways."
  },
  {
    id: 7,
    category: 'Academic',
    question: "What English language tests are required?",
    answer: "Most commonly IELTS (Academic), TOEFL (iBT), PTE Academic, and the Duolingo English Test. Medium of instruction waivers may be available if previous education was entirely in English."
  },
  {
    id: 8,
    category: 'Academic',
    question: "Can I study abroad without IELTS?",
    answer: "Yes, under certain conditions: completing previous education in English (MOI waiver), universities accepting PTE/TOEFL/Duolingo, university-specific internal tests, or pathway programs with integrated English training."
  },
  // Application
  {
    id: 9,
    category: 'Application',
    question: "How do I apply to study abroad?",
    answer: "The process involves: researching and shortlisting, checking requirements, preparing documents (transcripts, personal statement, CV), submitting applications (directly or via Gradway), receiving and accepting offers, and finally applying for a student visa."
  },
  {
    id: 10,
    category: 'Application',
    question: "What is a Statement of Purpose (SOP)?",
    answer: "An SOP is a personal essay explaining your academic background, career goals, why you've chosen a specific program/university, and how it aligns with your aspirations. A well-crafted SOP is crucial for admission."
  },
  {
    id: 11,
    category: 'Application',
    question: "What is the difference between conditional and unconditional offers?",
    answer: "A Conditional Offer is pending fulfillment of requirements (like final grades or test scores). An Unconditional Offer means you've met all requirements and can proceed directly to enrollment."
  },
  // Financial
  {
    id: 12,
    category: 'Financial',
    question: "How much does it cost to study abroad?",
    answer: "Annual estimates (Tuition + Living) range from USD 30k-70k in the US, GBP 15k-40k in the UK, AUD 25k-50k in Australia, CAD 20k-40k in Canada, and EUR 0-15k in Germany (public universities)."
  },
  {
    id: 13,
    category: 'Financial',
    question: "What scholarships are available for Sri Lankan students?",
    answer: "Options include Government scholarships (Commonwealth, Chevening, Fulbright), University-specific merit/diversity awards, and external funding from organizations like Rotary or the World Bank."
  },
  {
    id: 14,
    category: 'Financial',
    question: "Can I work part-time while studying?",
    answer: "Most countries allow part-time work (typically 20 hours/week during semester and full-time during breaks). Wages range from USD 10-20 per hour depending on location, helping offset living costs."
  },
  {
    id: 15,
    category: 'Financial',
    question: "How do I show proof of funds for my visa?",
    answer: "Acceptable proof includes bank statements (6 months history), fixed deposits, education loans from recognized banks, affidavit of support, and scholarship letters. Required amounts vary by country."
  },
  // Visa
  {
    id: 16,
    category: 'Visa',
    question: "How long does student visa processing take?",
    answer: "Generally: UK takes 3 weeks; Australia 4-8 weeks; Canada 4-12 weeks; US 2-4 weeks after interview; New Zealand 4-6 weeks. Always apply well in advance of your intake."
  },
  {
    id: 17,
    category: 'Visa',
    question: "What are common reasons for visa rejection?",
    answer: "Common reasons include insufficient financial proof, incomplete documentation, poor academic history, inability to demonstrate genuine student intent, or lack of strong ties to Sri Lanka."
  },
  {
    id: 18,
    category: 'Visa',
    question: "Can I bring my family on a student visa?",
    answer: "Many countries (Australia, Canada, New Zealand, and UK for certain post-grad routes) allow dependent visas for spouses and children. Financial requirements increase substantially."
  },
  // Life Abroad
  {
    id: 19,
    category: 'Life Abroad',
    question: "Is studying abroad safe for Sri Lankan students?",
    answer: "Yes, popular destinations maintain high safety standards. Universities provide dedicated international support services, campus security, and orientation programs to help you adjust safely."
  },
  {
    id: 20,
    category: 'Life Abroad',
    question: "Do I need to speak the local language?",
    answer: "In English-speaking countries, English is enough. In non-English speaking countries, many Master's programs are taught in English, but learning basic local language enhances your experience and job prospects."
  },
  {
    id: 21,
    category: 'Life Abroad',
    question: "What about healthcare and insurance?",
    answer: "International student health insurance is typically mandatory (e.g., OSHC in Australia, IHS in the UK). It covers medical consultations, hospital care, and emergency services."
  },
  // Post-Study
  {
    id: 22,
    category: 'Post-Study',
    question: "Can I work in the country after graduation?",
    answer: "Yes, most countries offer post-study work rights: Among them are UK (1.6-3 years), Australia (2-4 years), Canada (up to 3 years), and NZ (1-3 years). This allows you to gain global experience."
  },
  {
    id: 23,
    category: 'Post-Study',
    question: "What are pathways to permanent residency (PR)?",
    answer: "Australia (Points-based), Canada (Express Entry), and New Zealand offer clear PR pathways for graduates. Qualifications, work experience, and language proficiency contribute to eligibility."
  },
  // Program-Specific
  {
    id: 24,
    category: 'Program-Specific',
    question: "What is a foundation program and do I need one?",
    answer: "It's a 6-12 month preparatory course for students who don't meet direct entry requirements. It bridges the gap in education systems and guarantees progression to Bachelor's degrees."
  },
  {
    id: 25,
    category: 'Program-Specific',
    question: "What is a co-op program or internship?",
    answer: "Common in Canada and US, these integrate academic study with paid work experience in your field. They significantly enhance employability and professional networking."
  },
  // Uncommon
  {
    id: 26,
    category: 'Uncommon & Niche',
    question: "Can I study abroad after a long gap in education?",
    answer: "Yes! Many students successfully return to study after career or family breaks. Clearly explaining the gap in your SOP and demonstrating professional growth is key."
  },
  {
    id: 27,
    category: 'Uncommon & Niche',
    question: "Is it too late to study abroad if I'm over 35?",
    answer: "Not at all. Mature students bring valuable experience. Visa focus is on genuine student intent and financial capacity, not age. Professional Master's or research degrees are popular for this group."
  },
  // Consultants
  {
    id: 28,
    category: 'Consultants',
    question: "Why should I use an education consultant like Gradway?",
    answer: "We navigate complex requirements, provide SOP guidance, offer scholarship access, and maintain high visa success rates, saving you significant time and potential rejection."
  },
  {
    id: 29,
    category: 'Consultants',
    question: "Are Gradway's services free?",
    answer: "Yes! Most of our services (consultation, application, visa guidance) are free for students. We receive commissions from partner universities upon your successful enrollment."
  },
  // Destinations
  {
    id: 30,
    category: 'Destinations',
    question: "What makes Australia a popular choice?",
    answer: "High-quality education (7 universities in global top 100), post-study work rights, a large Sri Lankan community, and a climate similar to home."
  },
  {
    id: 31,
    category: 'Destinations',
    question: "Why do students choose the UK?",
    answer: "Prestigious historic universities, shorter durations (1-year Master's), 2-year post-study work rights, and no need for SAT/GRE for most programs."
  }
];

export const MAIN_FAQ: FAQ[] = FULL_FAQ.filter(f => [1, 2, 5, 12, 16, 29].includes(f.id));