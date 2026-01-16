import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit2, Save, X, Image as ImageIcon } from 'lucide-react';

interface EditableTextProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string;
    multiline?: boolean;
    type?: 'text' | 'textarea';
}

export const EditableText: React.FC<EditableTextProps> = ({ value, onSave, className = '', multiline = false, type = 'text' }) => {
    const { isEditing } = useContent();
    const [tempValue, setTempValue] = useState(value);

    // Sync internal state if external value changes (unless currently typing?)
    useEffect(() => {
        setTempValue(value);
    }, [value]);

    if (!isEditing) {
        return <span className={className}>{value}</span>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        setTempValue(newVal);
        onSave(newVal); // Auto-save to context state for seamless feel
    };

    if (multiline) {
        return (
            <textarea
                value={tempValue}
                onChange={handleChange}
                className={`bg-white/10 border border-fishing-neon/50 rounded p-1 text-white w-full ${className}`}
                rows={3}
            />
        );
    }

    return (
        <input
            type={type}
            value={tempValue}
            onChange={handleChange}
            className={`bg-white/10 border border-fishing-neon/50 rounded p-1 text-white inline-block max-w-full ${className}`}
        />
    );
};

interface EditableImageProps {
    src: string;
    alt: string;
    onSave: (newSrc: string) => void;
    className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ src, alt, onSave, className = '' }) => {
    const { isEditing } = useContent();
    const [showInput, setShowInput] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    if (!isEditing) {
        return <img src={src} alt={alt} className={className} />;
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        onSave(event.target.result as string);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert('Por favor, solte apenas arquivos de imagem.');
            }
        }
    };

    return (
        <div
            className={`relative group ${className} min-h-[50px] min-w-[50px] border-2 transition-all duration-300 ${isDragging ? 'border-fishing-neon bg-fishing-neon/20 scale-[1.02] z-10' : 'border-dashed border-fishing-neon/30'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <img src={src} alt={alt} className="w-full h-full object-cover opacity-80" />

            {isDragging && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-fishing-neon animate-pulse pointer-events-none">
                    <ImageIcon size={48} className="mb-2" />
                    <span className="font-bold uppercase tracking-widest text-sm">Solte a imagem aqui</span>
                </div>
            )}

            {!isDragging && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setShowInput(true)}>
                    <button className="bg-fishing-neon text-black p-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                        <Edit2 size={16} /> Alterar (Clique ou Arraste)
                    </button>
                </div>
            )}

            {showInput && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full max-w-sm space-y-2">
                        <label className="text-white text-xs font-bold uppercase">URL da Imagem</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                defaultValue={src}
                                className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onSave((e.currentTarget as HTMLInputElement).value);
                                        setShowInput(false);
                                    }
                                }}
                            />
                            <button onClick={(e) => { e.stopPropagation(); setShowInput(false); }} className="text-white hover:text-red-500"><X /></button>
                        </div>
                        <p className="text-[10px] text-gray-500">Cole um link, arraste um arquivo ou digite o caminho.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

