
export interface Destination {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  bgClass: string;
  image?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
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
