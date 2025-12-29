
import { Destination, Service, Step, FAQ, Testimonial } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    description: 'Historic universities, modern campuses and globally recognised degrees',
    color: '#3B82F6',
    icon: 'fa-solid fa-building-columns',
    bgClass: 'bg-blue-50',
    image: 'https://flagcdn.com/w160/gb.png'
  },
  {
    id: 'australia',
    name: 'Australia',
    description: 'High quality of life, career focused courses and modern campuses',
    color: '#8B5CF6',
    icon: 'fa-solid fa-sun',
    bgClass: 'bg-purple-50',
    image: 'https://flagcdn.com/w160/au.png'
  },
  {
    id: 'france',
    name: 'France',
    description: 'World-class education in the heart of Europe with rich cultural heritage',
    color: '#1D4ED8',
    icon: 'fa-solid fa-archway',
    bgClass: 'bg-blue-50',
    image: 'https://flagcdn.com/w160/fr.png'
  },
  {
    id: 'germany',
    name: 'Germany',
    description: 'Engineering, technology and applied sciences with strong practical focus and low tuition options',
    color: '#FBBF24',
    icon: 'fa-solid fa-microscope',
    bgClass: 'bg-amber-50',
    image: 'https://flagcdn.com/w160/de.png'
  },
  {
    id: 'canada',
    name: 'Canada',
    description: 'Career-focused programs with clear pathways to post-study options',
    color: '#EF4444',
    icon: 'fa-solid fa-map',
    bgClass: 'bg-rose-50',
    image: 'https://flagcdn.com/w160/ca.png'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    description: 'A tech and finance hub of Europe with close links to global companies',
    color: '#10B981',
    icon: 'fa-solid fa-building',
    bgClass: 'bg-emerald-50',
    image: 'https://flagcdn.com/w160/ie.png'
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    description: 'Safe, scenic and student friendly with strong focus on quality of life',
    color: '#0EA5E9',
    icon: 'fa-solid fa-mountain',
    bgClass: 'bg-sky-50',
    image: 'https://flagcdn.com/w160/nz.png'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    description: 'Global excellence in hospitality, business, and finance education',
    color: '#DC2626',
    icon: 'fa-solid fa-mountain-sun',
    bgClass: 'bg-red-50',
    image: 'https://flagcdn.com/w160/ch.png'
  },
  {
    id: 'malta',
    name: 'Malta',
    description: 'Affordable English-taught programs in a Mediterranean island setting',
    color: '#64748B',
    icon: 'fa-solid fa-anchor',
    bgClass: 'bg-slate-50',
    image: 'https://flagcdn.com/w160/mt.png'
  },
  {
    id: 'uae',
    name: 'UAE',
    description: 'UK and Australian branch campuses plus respected local universities in a dynamic Middle Eastern setting',
    color: '#F59E0B',
    icon: 'fa-solid fa-city',
    bgClass: 'bg-yellow-50',
    image: 'https://flagcdn.com/w160/ae.png'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    description: 'Asian hub for business, finance and hospitality studies',
    color: '#EC4899',
    icon: 'fa-solid fa-landmark',
    bgClass: 'bg-pink-50',
    image: 'https://flagcdn.com/w160/sg.png'
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    description: 'Value for money twinning routes to UK and Australian degrees',
    color: '#6366F1',
    icon: 'fa-solid fa-school',
    bgClass: 'bg-indigo-50',
    image: 'https://flagcdn.com/w160/my.png'
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    description: 'Cutting-edge technology and high-ranking research universities',
    color: '#000000',
    icon: 'fa-solid fa-landmark-dome',
    bgClass: 'bg-gray-50',
    image: 'https://flagcdn.com/w160/kr.png'
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Profile Review & Counselling',
    description: 'We carefully assess your academics, English, finances and goals, then map realistic routes that match your situation.',
    icon: 'fa-solid fa-user-check',
    image: 'https://picsum.photos/seed/service1/800/600'
  },
  {
    id: 2,
    title: 'Course & University Mapping',
    description: 'We shortlist options across the UK, Europe, Canada, Australia and Asia that are properly recognised and valued.',
    icon: 'fa-solid fa-location-dot',
    image: 'https://picsum.photos/seed/service2/800/600'
  },
  {
    id: 3,
    title: 'Application & Documentation',
    description: 'We organise your applications, supporting documents, references and statements so everything looks professional.',
    icon: 'fa-solid fa-file-lines',
    image: 'https://picsum.photos/seed/service3/800/600'
  },
  {
    id: 4,
    title: 'Interview Preparation',
    description: 'We prepare you for university and visa interviews, helping you respond confidently to all admissions queries.',
    icon: 'fa-solid fa-comments',
    image: 'https://picsum.photos/seed/service4/800/600'
  },
  {
    id: 5,
    title: 'Visa Assistance',
    description: 'We guide you step-by-step through the visa process, financial evidence requirements and interview prep.',
    icon: 'fa-solid fa-passport',
    image: 'https://picsum.photos/seed/service5/800/600'
  },
  {
    id: 6,
    title: 'Pre-Departure Orientation',
    description: 'Practical advice on accommodation, banking, part-time work rules and settling into your new country.',
    icon: 'fa-solid fa-plane-departure',
    image: 'https://picsum.photos/seed/service7/800/600'
  }
];

export const STEPS: Step[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description: 'Explore universities, programs, and destinations that match your goals.',
    icon: 'fa-solid fa-compass'
  },
  {
    id: 'shortlist',
    number: '02',
    title: 'Shortlist',
    description: 'Get personalized recommendations based on your profile and budget.',
    icon: 'fa-solid fa-heart'
  },
  {
    id: 'apply',
    number: '03',
    title: 'Apply',
    description: 'Submit applications with our expert guidance on all documentation.',
    icon: 'fa-solid fa-file-pen'
  },
  {
    id: 'visa',
    number: '04',
    title: 'Visa',
    description: 'Navigate the visa process smoothly with our step-by-step assistance.',
    icon: 'fa-solid fa-id-card'
  },
  {
    id: 'depart',
    number: '05',
    title: 'Depart',
    description: 'Prepare for your journey with pre-departure orientation and support.',
    icon: 'fa-solid fa-paper-plane'
  }
];

export const FAQS: FAQ[] = [
  {
    question: 'When should I start planning my study abroad journey?',
    answer: 'Ideally, you should start planning 9-12 months before your intended intake to allow time for applications and visas.'
  },
  {
    question: 'What are the costs involved in studying abroad?',
    answer: 'Costs include tuition, living expenses, health insurance, and airfare. We provide detailed budgeting based on your country choice.'
  },
  {
    question: 'Do I need to take IELTS or TOEFL?',
    answer: 'Most English-speaking countries require proof of proficiency. Some universities may waive this based on your academic history.'
  },
  {
    question: 'Can I work while studying abroad?',
    answer: 'Yes, most countries allow international students to work part-time (usually 20 hours per week) during terms.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Hashini Jayawardena',
    location: 'Studying in UK',
    verified: true,
    quote: 'Big thanks to the Gradway team. They handled my application and visa without any stress. Really appreciate the support!',
    image: 'https://picsum.photos/seed/person1/200/200'
  },
  {
    name: 'Kasun Perera',
    location: 'Studying in Australia',
    verified: true,
    quote: 'The guidance I received for my Australian visa was exceptional. They mapped out exactly what I needed. Highly recommend!',
    image: 'https://picsum.photos/seed/person2/200/200'
  }
];
