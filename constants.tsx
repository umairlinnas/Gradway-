import { Destination, Service, SuccessStory } from './types';

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
