import React, { useState } from 'react';
import { useContent } from './context/ContentContext';
import { EditableText } from './admin/Editable';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const { content, updateContent } = useContent();
  const { faqs, sections } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-12 text-center">
          <EditableText
            value={sections.faq.title}
            onSave={(val) => {
              const newSections = { ...sections };
              newSections.faq = { ...newSections.faq, title: val };
              updateContent('sections', newSections);
            }}
          />
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg bg-neutral-900/30 overflow-hidden transition-all duration-300 hover:border-fishing-neon/30"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="text-fishing-neon w-5 h-5 flex-shrink-0" />
                ) : (
                  <Plus className="text-gray-500 w-5 h-5 flex-shrink-0" />
                )}
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <p className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

