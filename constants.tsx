
import { Destination, Service, SuccessStory } from './types';

export const DESTINATIONS: Destination[] = [
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
    id: 'uae',
    name: 'UAE',
    description: 'A global hub for business and innovation in the heart of the Middle East.',
    color: '#00732F',
    icon: 'fa-solid fa-city',
    bgClass: 'bg-emerald-50',
    image: 'https://flagcdn.com/w160/ae.png',
    region: 'Americas & Pacific'
  },
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
    id: 'switzerland',
    name: 'Switzerland',
    description: 'World-class hospitality and finance programs in a stunning alpine setting.',
    color: '#D52B1E',
    icon: 'fa-solid fa-mountain-sun',
    bgClass: 'bg-red-50',
    image: 'https://flagcdn.com/w160/ch.png',
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
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Career Counseling',
    description: 'Personalized guidance to find the right course and university that matches your career aspirations.',
    icon: 'fa-solid fa-lightbulb',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  {
    id: 2,
    title: 'Test Prep',
    description: 'Expert coaching for IELTS, TOEFL, GRE, and GMAT with high-score guaranteed strategies.',
    icon: 'fa-solid fa-graduation-cap',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500'
  },
  {
    id: 3,
    title: 'Application Support',
    description: 'End-to-end support for SOP writing, LORs, and university applications to ensure acceptance.',
    icon: 'fa-solid fa-file-contract',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500'
  },
  {
    id: 4,
    title: 'Visa Assistance',
    description: 'Hassle-free visa filing, financial document preparation, and mock interview sessions.',
    icon: 'fa-solid fa-plane-up',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    university: 'Imperial College London',
    quote: '"Gradway made my dream of studying in London a reality. Their counseling was spot on, and the visa process was seamless."',
    image: 'https://i.pravatar.cc/150?u=sarah',
    tag: 'MSc Data Science'
  },
  {
    id: 2,
    name: 'Michael Chen',
    university: 'University of Toronto',
    quote: '"The test prep coaches were incredible. I improved my IELTS score significantly, which opened doors to scholarships I didn\'t think possible."',
    image: 'https://i.pravatar.cc/150?u=michael',
    tag: 'B.Eng'
  },
  {
    id: 3,
    name: 'Priya Patel',
    university: 'University of Melbourne',
    quote: '"They helped me navigate the complex application system in Australia. I felt supported every step of the way, even after arriving."',
    image: 'https://i.pravatar.cc/150?u=priya',
    tag: 'MBA'
  }
];
