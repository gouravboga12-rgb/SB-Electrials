import { useEffect } from 'react';

/**
 * Hook to dynamically update SEO tags (Title, Description, Keywords) for each page
 * @param {string} title Page specific title
 * @param {string} description Page specific description
 * @param {string} keywords Custom comma separated keywords
 */
export default function useSEO(title, description, keywords) {
  useEffect(() => {
    const defaultTitle = "SB Electricals | Solar Panel Installation & Maintenance in Bengaluru";
    const defaultDesc = "SB Electricals provides professional residential and commercial solar panel installation, maintenance, inverter replacement, repairs, and AMC services in Bengaluru with 6+ years of experience.";
    const defaultKeywords = "Solar Panel Installation Bengaluru, Residential Solar, Commercial Solar, Solar Maintenance, Solar Repair, Solar Inverter Installation, AMC Solar, SB Electricals";
    const domain = "https://sbelectrics.in";
    const currentUrl = domain + (window.location.hash || "/");

    const finalTitle = title || defaultTitle;
    const finalDesc = description || defaultDesc;
    const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    // 1. Update Document Title & Primary Meta Title
    document.title = finalTitle;
    let metaTitle = document.querySelector('meta[name="title"]');
    if (!metaTitle) {
      metaTitle = document.createElement('meta');
      metaTitle.name = 'title';
      document.head.appendChild(metaTitle);
    }
    metaTitle.content = finalTitle;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = finalDesc;

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = finalKeywords;

    // 4. Update Open Graph Tags
    const setOgTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setOgTag('og:title', finalTitle);
    setOgTag('og:description', finalDesc);
    setOgTag('og:url', currentUrl);
    setOgTag('og:image', `${domain}/hero_solar.png`);

    // 5. Update Twitter Tags
    const setTwitterTag = (name, content) => {
      let element = document.querySelector(`meta[property="${name}"]`) || document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.name = name;
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setTwitterTag('twitter:title', finalTitle);
    setTwitterTag('twitter:description', finalDesc);
    setTwitterTag('twitter:url', currentUrl);
    setTwitterTag('twitter:image', `${domain}/hero_solar.png`);

    // 6. Update Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = currentUrl;
  }, [title, description, keywords]);
}
