// Controller for AI features
exports.generate = async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic é obrigatório para gerar sugestão.' });
    }

    try {
        const response = await fetch('https://ensinai-ai-service.onrender.com/generate', {
            method: 'POST',
            headers: {
                'x-api-key': 'Ens1n412026',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({topic})  // Ajustado: usa "teste" em vez de "topic"
        });

        if (!response.ok) {
            throw new Error('Erro na resposta da API externa');
        }

        const data = await response.json();
        res.status(200).json({ content: data.content });  // Assumindo que a resposta externa tem { content: ... }
    } catch (error) {
        console.error('Erro na geração IA:', error);
        res.status(500).json({ error: 'Erro ao gerar sugestão.' });
    }
};