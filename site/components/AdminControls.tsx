import React from 'react';
import { useContent } from '../context/ContentContext';
import { Save, X, RotateCcw } from 'lucide-react';

const AdminControls: React.FC = () => {
    const { isEditing, saveChanges, toggleEditing, resetContent } = useContent();

    if (!isEditing) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-neutral-900/90 backdrop-blur border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col gap-3 min-w-[200px]">
                <div className="text-xs font-bold text-fishing-neon uppercase tracking-wider mb-1 border-b border-white/10 pb-2">
                    Painel de Edição
                </div>

                <button
                    onClick={saveChanges}
                    className="flex items-center gap-2 px-4 py-2 bg-fishing-neon text-black rounded-lg font-bold hover:bg-fishing-neon/90 transition-colors text-sm"
                >
                    <Save size={16} />
                    Salvar Alterações
                </button>

                <button
                    onClick={resetContent}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm transition-colors border border-red-500/20"
                >
                    <RotateCcw size={16} />
                    Restaurar Padrão
                </button>

                <button
                    onClick={toggleEditing}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors"
                >
                    <X size={16} />
                    Sair da Edição
                </button>
            </div>
        </div>
    );
};

export default AdminControls;
