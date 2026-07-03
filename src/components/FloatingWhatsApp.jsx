import { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds to draw user attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "918867710294";
  const message = "Hello SB Electricals, I would like to know more about your solar services.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Tooltip speech bubble */}
      <div 
        className={`bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xl border border-slate-800 pointer-events-auto transition-all duration-500 ease-in-out transform flex items-center gap-1 ${
          showTooltip 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-2 scale-90 select-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span>Need Solar Info? Chat on WhatsApp</span>
        <button 
          onClick={() => setShowTooltip(false)}
          className="text-slate-500 hover:text-white ml-2 focus:outline-none"
        >
          ✕
        </button>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setShowTooltip(false)}
        className="pointer-events-auto h-16 w-16 rounded-full bg-gradient-to-b from-[#25d366] to-[#128c7e] hover:from-[#2af074] hover:to-[#149e8f] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group relative flex items-center justify-center animate-bounce duration-[1500ms]"
        style={{ animationIterationCount: 'infinite' }}
        aria-label="Contact SB Electricals on WhatsApp"
      >
        {/* Radar wave pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-30 animate-ping -z-10 group-hover:opacity-50 transition-opacity duration-300"></span>
        
        {/* WhatsApp Icon */}
        <svg 
          className="h-8 w-8 fill-current text-white" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.384 9.86-9.775.002-2.611-1.008-5.066-2.845-6.905C16.65 2.085 14.2 1.077 11.587 1.077 6.151 1.077 1.729 5.46 1.727 10.85c-.001 1.67.437 3.3 1.266 4.757L1.97 21.085l5.677-1.488-.3-.507.001-.001-.301-.507zM18.006 14.86c-.352-.176-2.08-.94-2.4-.94c-.16 0-.32.072-.44.256c-.24.36-.6.828-.76.984-.12.12-.28.144-.48.036-.36-.18-1.524-.564-2.904-1.8c-1.073-.96-1.797-2.148-2.008-2.508c-.211-.36-.022-.556.159-.733c.162-.16.36-.42.54-.624c.18-.204.24-.348.36-.576c.12-.228.06-.432-.03-.612c-.09-.18-.84-2.028-.96-2.316c-.252-.6-.516-.516-.708-.516h-.6c-.204 0-.54.072-.828.396c-.288.324-1.104 1.08-1.104 2.628c0 1.548 1.128 3.048 1.284 3.252c.156.204 2.22 3.396 5.376 4.752c2.628 1.128 3.168.9 4.308.792c1.14-.108 2.4-.984 2.736-1.932c.336-.948.336-1.764.24-1.932c-.096-.168-.3-.264-.653-.44z"/>
        </svg>
      </a>
    </div>
  );
}
