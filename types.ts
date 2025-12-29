
export interface Destination {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  bgClass: string;
  image?: string;
  region: 'Europe' | 'Americas & Pacific' | 'Asia & Other';
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface SuccessStory {
  id: number;
  name: string;
  university: string;
  quote: string;
  image: string;
  tag: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  image: string;
  verified: boolean;
}
