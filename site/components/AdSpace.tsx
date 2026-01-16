import React from 'react';

interface AdSpaceProps {
    className?: string;
    slot?: string; // For future real AdSense slot IDs
    format?: 'auto' | 'fluid' | 'rectangle';
    label?: string; // Optional label "Publicidade"
}

const AdSpace: React.FC<AdSpaceProps> = ({ className = "", slot = "1234567890", format = "auto", label = "Espaço Publicitário" }) => {
    return (
        <div className={`w-full flex flex-col items-center justify-center my-16 ${className}`}>
            {label && (
                <span className="text-[10px] uppercase tracking-widest text-gray-600 mb-2">
                    {label}
                </span>
            )}
            {/* 
              This is a placeholder for Google AdSense. 
              In production, you would replace this div with the <ins> tag provided by Google.
            */}
            <div className="w-full max-w-[728px] h-[90px] bg-neutral-900/50 border border-white/5 rounded-lg flex items-center justify-center text-gray-500 text-xs uppercase tracking-wider relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                <span>Google AdSpace ({format})</span>
            </div>
        </div>
    );
};

export default AdSpace;
