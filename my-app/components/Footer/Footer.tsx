import React from 'react';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Info',
    links: [
      { href: '/#workflow', label: "Yatri's Workflow" },
      { href: '/#faq', label: 'FAQ' },
      { href: '/#team', label: "Yatri's Team" },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '#', label: "Yatri's Blog" },
      { href: '#', label: 'Testimonial' },
      { href: '#', label: 'Privacy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Contact' },
      { href: '#', label: 'Terms of Service' },
    ],
  },
  {
    title: 'Support', // New column title
    links: [
      { href: '#', label: 'Help Center' },
      { href: '#', label: 'Documentation' },
      { href: '#', label: 'FAQs' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="footer box-shadow" id="footer">
      {footerLinks.map((col, index) => (
        <div key={index} className="col">
          <h3 className="col-title">{col.title}</h3>
          <nav className="col-list">
            <ul>
              {col.links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
