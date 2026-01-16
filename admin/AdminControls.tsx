import React from 'react';
import { useContent } from '../context/ContentContext';
import { Settings, Save, X, RotateCcw, Check, PenTool } from 'lucide-react';

export const AdminControls: React.FC = () => {
    const { isEditing, toggleEditing, saveChanges, resetContent } = useContent();

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end">
            {isEditing && (
                <div className="bg-neutral-900 border border-white/10 p-3 rounded-lg shadow-2xl flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-5">
                    <div className="text-xs font-bold text-fishing-neon uppercase mb-1 tracking-wider text-center">Modo Editor</div>
                    <button
                        onClick={saveChanges}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors w-full justify-center"
                    >
                        <Check size={16} /> Salvar Alterações
                    </button>
                    <button
                        onClick={resetContent}
                        className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/50 text-red-200 px-4 py-2 rounded text-sm font-bold transition-colors w-full justify-center"
                    >
                        <RotateCcw size={16} /> Resetar Tudo
                    </button>
                </div>
            )}

            <button
                onClick={toggleEditing}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isEditing
                        ? 'bg-fishing-neon text-black rotate-90 shadow-[0_0_20px_rgba(163,230,53,0.5)]'
                        : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
                    }`}
                title={isEditing ? "Fechar Editor" : "Abrir Editor"}
            >
                {isEditing ? <X size={24} /> : <PenTool size={24} />}
            </button>
        </div>
    );
};

