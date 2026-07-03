import { useEffect } from 'react';

/**
 * Hook to dynamically update SEO tags (Title, Description, Keywords) for each page
 * @param {string} title Page specific title
 * @param {string} description Page specific description
 * @param {string} keywords Custom comma separated keywords
 */
export default function useSEO(title, description, keywords) {
  useEffect(() => {
    // Update title
    document.title = title || "SB Electricals | Solar Panel Installation & Maintenance in Bengaluru";

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || "SB Electricals provides professional residential and commercial solar panel installation, maintenance, inverter replacement, repairs, and AMC services in Bengaluru with 6+ years of experience.";

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    const defaultKeywords = "Solar Panel Installation Bengaluru, Residential Solar, Commercial Solar, Solar Maintenance, Solar Repair, Solar Inverter Installation, AMC Solar, SB Electricals";
    metaKeywords.content = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  }, [title, description, keywords]);
}
