export interface Session {
  id: string
  title: string
  date: string
  time: string
  tag: string
  payment_link: string
  description: string
  image_link: string
  created_at: string
}

export interface Blog {
  id: string
  title: string
  image_link: string
  excerpt: string
  content: string
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  text: string
  image_link: string
  created_at: string
}

export interface ContentItem {
  id: string
  key: string
  value: string
  updated_at: string
}

export type SessionTag = 'One-on-One' | 'Group' | 'Corporate' | 'Workshop'