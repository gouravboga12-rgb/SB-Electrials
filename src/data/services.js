import imgRes from '../assets/images/service_residential.png';
import imgCom from '../assets/images/service_commercial.png';
import imgMaint from '../assets/images/service_maintenance.png';
import imgRep from '../assets/images/service_repair.png';
import imgInv from '../assets/images/service_inverter.png';
import imgAmc from '../assets/images/service_amc.png';

export const services = [
  {
    id: 1,
    title: "Residential Solar Panel Installation",
    description: "Switch your home to clean, sustainable solar energy. Reduce electricity bills by up to 90% and secure energy independence.",
    icon: "Sun",
    image: imgRes,
    ctaMessage: "Hello SB Electricals, I am interested in Residential Solar Panel Installation for my home and would like a free consultation."
  },
  {
    id: 2,
    title: "Commercial Solar Panel Installation",
    description: "Scale down operational costs and demonstrate eco-friendly leadership with high-yield industrial solar installations.",
    icon: "Building",
    image: imgCom,
    ctaMessage: "Hello SB Electricals, I would like to receive a custom quote for Commercial Solar Panel Installation for our facility."
  },
  {
    id: 3,
    title: "Solar System Maintenance",
    description: "Keep your system running at peak performance. We conduct regular cleanings, electrical testing, and efficiency checkups.",
    icon: "Settings",
    image: imgMaint,
    ctaMessage: "Hello SB Electricals, I need maintenance service for my solar panels. Please schedule a check-up."
  },
  {
    id: 4,
    title: "Solar Panel Repair",
    description: "Experiencing drop-offs in output? We diagnose and fix broken panels, grid connection faults, and inverter warnings.",
    icon: "Wrench",
    image: imgRep,
    ctaMessage: "Hello SB Electricals, I am facing an issue with my solar setup and need to request panel repair services."
  },
  {
    id: 5,
    title: "Solar Inverter Installation & Replacement",
    description: "Supply, configure, and install advanced, long-lasting solar inverters that optimize DC-to-AC conversion.",
    icon: "BatteryCharging",
    image: imgInv,
    ctaMessage: "Hello SB Electricals, I would like to get information about solar inverter installation/replacement."
  },
  {
    id: 6,
    title: "Annual Maintenance Contracts (AMC)",
    description: "Total peace of mind with quarterly panel cleanings, priority outage response, and annual diagnostic inspections.",
    icon: "ShieldCheck",
    image: imgAmc,
    ctaMessage: "Hello SB Electricals, I want to learn more about your Annual Maintenance Contract (AMC) options for solar plants."
  }
];
