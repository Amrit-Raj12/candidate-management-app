// Types
export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: number;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string;
  experience?: string;
}