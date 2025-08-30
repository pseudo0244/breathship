import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Heart, Star } from 'lucide-react'
import { useContentProduction } from '../../hooks/useContentProduction'

export default function Footer() {
  const { content } = useContentProduction()

  return (
    <footer className="bg-brand-green text-brand-beige relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <img src="src/public/brownleaf.png" alt="" className="absolute top-10 left-10 w-16 h-16" />
        <img src="src/public/greenleaf.png" alt="" className="absolute bottom-10 right-10 w-14 h-14" />
        <img src="src/public/brownstar.png" alt="" className="absolute top-1/3 right-1/4 w-12 h-12" />
        <img src="src/public/greensun.png" alt="" className="absolute bottom-1/3 left-1/4 w-20 h-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="src/public/logo.png" alt={content.header_logo_alt || "Breathship Logo"} className="h-8 w-auto" />
              <span className="text-xl font-cormorant-bold">
                {content.header_company_name || "Breathship"}
              </span>
            </div>
            <p className="text-brand-beige/80 mb-6 max-w-md leading-relaxed font-proxima-nova">
              {content.footer_description || 'Transform your life through the power of conscious breathing. Experience deep healing, stress relief, and inner peace with our evidence-based breathwork programs.'}
            </p>
            <div className="flex space-x-4">
              <a href={`mailto:${content.contact_email || 'hello@breathship.com'}`} className="text-brand-beige/80 hover:text-brand-brown transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
              <a href={`tel:${content.contact_phone || '+1 (555) 123-4567'}`} className="text-brand-beige/80 hover:text-brand-brown transition-colors">
                <span className="sr-only">Phone</span>
                <Phone className="h-5 w-5" />
              </a>
              <a href="#" className="text-brand-beige/80 hover:text-brand-brown transition-colors">
                <span className="sr-only">Location</span>
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-cormorant-regular mb-4 text-brand-beige">Quick Links</h3>
            <ul className="space-y-2 font-proxima-nova">
              <li>
                <Link to="/" className="text-brand-beige/80 hover:text-brand-brown transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="text-brand-beige/80 hover:text-brand-brown transition-colors">
                  Sessions
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-brand-beige/80 hover:text-brand-brown transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-beige/80 hover:text-brand-brown transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-cormorant-regular mb-4 text-brand-beige">Services</h3>
            <ul className="space-y-2 font-proxima-nova">
              <li>
                <Link to="/sessions" className="text-brand-beige/80 hover:text-brand-brown transition-colors flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  One-on-One Sessions
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="text-brand-beige/80 hover:text-brand-brown transition-colors flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Group Sessions
                </Link>
              </li>
              <li>
                <Link to="/corporate" className="text-brand-beige/80 hover:text-brand-brown transition-colors flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Corporate Programs
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="text-brand-beige/80 hover:text-brand-brown transition-colors flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Workshops
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-beige/20 mt-8 pt-8 text-center">
          <p className="text-brand-beige/60 font-proxima-nova">
            {content.footer_copyright || '© 2024 Breathship. All rights reserved.'} | 
            <Link to={content.footer_privacy_link || "/privacy"} className="ml-1 text-brand-beige/80 hover:text-brand-brown transition-colors">
              Privacy Policy
            </Link> | 
            <Link to={content.footer_terms_link || "/terms"} className="ml-1 text-brand-beige/80 hover:text-brand-brown transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}