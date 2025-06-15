import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
      <div 
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-orange-500" /> : 
          <ChevronDown className="h-5 w-5 text-orange-500" />
        }
      </div>
      <div 
        className={`accordion-content transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 p-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;