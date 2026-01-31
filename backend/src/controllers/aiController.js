// Controller for AI features
exports.generate = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório para gerar sugestão.' });
    }

    try {
        // Mock AI generation logic
        // In a real app, this would call OpenAI/Gemini API
        const suggestions = [
            `Aqui está um ótimo conteúdo sobre ${title}. É importante destacar os pontos principais e engajar a audiência.`,
            `Explorando o tema ${title}, podemos observar diversas nuances interessantes. Aprofunde-se nos detalhes!`,
            `Dicas valiosas sobre ${title}: 1. Planejamento, 2. Execução, 3. Revisão. Espero que ajude!`,
            `Pensando em ${title}? Considere abordar os desafios comuns e como superá-los.`,
            `Uma perspectiva inovadora sobre ${title} pode ser a chave para um post de sucesso.`
        ];

        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

        // Simulate network delay for realism
        setTimeout(() => {
            res.status(200).json({ content: randomSuggestion });
        }, 1500);

    } catch (error) {
        console.error('Erro na geração IA:', error);
        res.status(500).json({ error: 'Erro ao gerar sugestão.' });
    }
};
