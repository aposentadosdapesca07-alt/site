import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Youtube } from 'lucide-react';
import { useContent } from './context/ContentContext';
import { EditableText } from './admin/Editable';

const Contact: React.FC = () => {
    const { content, updateContent } = useContent();
    const { sections } = content;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/contato@aposentadosdapesca.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `Novo Contato do Site: ${formData.name}`,
                    _template: 'table'
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Mensagem Enviada com Sucesso! Em breve entraremos em contato.');
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                throw new Error(data.message || 'Erro ao enviar');
            }
        } catch (error) {
            console.error(error);
            alert('Houve um erro ao enviar sua mensagem. Por favor, tente novamente ou use o email direto.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contato" className="py-24 bg-transparent relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fishing-neon/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">
                            <EditableText
                                value={sections.contact.title}
                                onSave={(val) => {
                                    const newSections = { ...sections };
                                    newSections.contact = { ...newSections.contact, title: val };
                                    updateContent('sections', newSections);
                                }}
                            />
                        </h2>
                        <p className="text-gray-400">
                            <EditableText
                                value={sections.contact.subtitle}
                                onSave={(val) => {
                                    const newSections = { ...sections };
                                    newSections.contact = { ...newSections.contact, subtitle: val };
                                    updateContent('sections', newSections);
                                }}
                            />
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Seu Nome</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fishing-neon transition-colors"
                                    placeholder="João Pescador"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Seu Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fishing-neon transition-colors"
                                    placeholder="joao@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mensagem</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fishing-neon transition-colors"
                                placeholder="Como posso ajudar?"
                                required
                            ></textarea>
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-8 py-4 bg-fishing-neon text-black font-bold uppercase tracking-wide rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>Enviando...</>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Enviar Mensagem
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-center md:items-start text-center md:text-left">
                        <a href="mailto:contato@aposentadosdapesca.com" className="flex items-center gap-4 group min-w-max">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fishing-neon group-hover:bg-fishing-neon group-hover:text-black transition-colors shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Contato Geral</p>
                                <p className="text-white font-medium text-sm">contato@aposentadosdapesca.com</p>
                            </div>
                        </a>
                        <a href="https://discord.com/channels/1224462243979067624/1224462243979067628/1460393873338794117" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group min-w-max">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fishing-neon group-hover:bg-fishing-neon group-hover:text-black transition-colors shrink-0">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Discord</p>
                                <p className="text-white font-medium">Comunidade Discord</p>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/@CHAIRA_ONIX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group min-w-max">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fishing-neon group-hover:bg-fishing-neon group-hover:text-black transition-colors shrink-0">
                                <Youtube size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Youtube</p>
                                <p className="text-white font-medium">@CHAIRA_ONIX</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;


