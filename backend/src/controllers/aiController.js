// Mock AI service - will be replaced with real API calls
class AIService {
    // Generate content suggestions based on title
    static generateContent(title) {
        const suggestions = [
            `Aqui está um ótimo conteúdo sobre ${title}. É importante destacar os pontos principais e engajar a audiência.`,
            `Explorando o tema ${title}, podemos observar diversas nuances interessantes. Aprofunde-se nos detalhes!`,
            `Dicas valiosas sobre ${title}: 1. Planejamento, 2. Execução, 3. Revisão. Espero que ajude!`,
            `Pensando em ${title}? Considere abordar os desafios comuns e como superá-los.`,
            `Uma perspectiva inovadora sobre ${title} pode ser a chave para um post de sucesso.`
        ];
        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }

    // Generate tags for a post
    static generateTags(title, content) {
        const wordList = `${title} ${content}`.toLowerCase().split(/\s+/);
        const keywords = wordList.filter(word => word.length > 4);
        return [...new Set(keywords)].slice(0, 5);
    }

    // Generate a summary
    static generateSummary(content) {
        const sentences = content.split(/[.!?]+/).filter(s => s.trim());
        const summary = sentences.slice(0, 2).join('. ').trim();
        return summary || 'Resumo não disponível';
    }

    // Moderate content (check for inappropriate content)
    static moderateContent(content) {
        const bannedWords = ['spam', 'violência', 'hate', 'insulto'];
        const contentLower = content.toLowerCase();
        
        const found = bannedWords.some(word => contentLower.includes(word));
        
        return {
            isInappropriate: found,
            confidence: found ? 0.85 : 0.05,
            reason: found ? 'Conteúdo potencialmente inapropriado detectado' : 'Conteúdo apropriado'
        };
    }

    // Generate automatic response for comments
    static generateAutoResponse(commentText) {
        const responses = [
            `Obrigado pelo comentário! Concordo totalmente com seu ponto de vista.`,
            `Excelente observação! Isso realmente enriquece a discussão.`,
            `Muito bom! Seu feedback é muito valioso para melhorar.`,
            `Ótimo insight! Vamos continuar essa conversa no próximo post.`,
            `Perfeito! Sua perspectiva adiciona muito valor aqui.`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Classify content by topic
    static classifyContent(title, content) {
        const fullText = `${title} ${content}`.toLowerCase();
        const topics = {
            'tecnologia': ['programação', 'software', 'código', 'app', 'sistema'],
            'educação': ['aula', 'aprendizado', 'estudante', 'professor', 'curso'],
            'negócio': ['empresa', 'negócio', 'mercado', 'cliente', 'vendas'],
            'saúde': ['saúde', 'médico', 'doença', 'tratamento', 'exercício']
        };

        let maxMatches = 0;
        let classification = 'geral';

        for (const [topic, keywords] of Object.entries(topics)) {
            const matches = keywords.filter(kw => fullText.includes(kw)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                classification = topic;
            }
        }

        return { classification, confidence: Math.min(maxMatches * 0.25, 0.95) };
    }
}

// Generate content suggestions
exports.generate = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório para gerar sugestão.' });
    }

    try {
        const content = AIService.generateContent(title);

        setTimeout(() => {
            res.status(200).json({ 
                success: true,
                content,
                timestamp: new Date()
            });
        }, 1500);

    } catch (error) {
        console.error('Erro na geração IA:', error);
        res.status(500).json({ error: 'Erro ao gerar sugestão.' });
    }
};

// Analyze post and generate insights
exports.analyze = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
    }

    try {
        const tags = AIService.generateTags(title, content);
        const summary = AIService.generateSummary(content);
        const classification = AIService.classifyContent(title, content);

        res.status(200).json({
            success: true,
            analysis: {
                tags,
                summary,
                classification,
                wordCount: content.split(/\s+/).length,
                readingTime: Math.ceil(content.split(/\s+/).length / 200) // estimativa em minutos
            },
            timestamp: new Date()
        });

    } catch (error) {
        console.error('Erro na análise IA:', error);
        res.status(500).json({ error: 'Erro ao analisar conteúdo.' });
    }
};

// Moderate content
exports.moderate = async (req, res) => {
    const { content, type = 'post' } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório para moderação.' });
    }

    try {
        const moderation = AIService.moderateContent(content);

        res.status(200).json({
            success: true,
            moderation: {
                ...moderation,
                type,
                shouldBlock: moderation.isInappropriate
            },
            timestamp: new Date()
        });

    } catch (error) {
        console.error('Erro na moderação IA:', error);
        res.status(500).json({ error: 'Erro ao moderar conteúdo.' });
    }
};

// Generate automatic response for a comment
exports.generateResponse = async (req, res) => {
    const { commentText, postId } = req.body;

    if (!commentText) {
        return res.status(400).json({ error: 'Texto do comentário é obrigatório.' });
    }

    try {
        const response = AIService.generateAutoResponse(commentText);

        setTimeout(() => {
            res.status(200).json({
                success: true,
                response,
                isAutoGenerated: true,
                postId,
                timestamp: new Date()
            });
        }, 1000);

    } catch (error) {
        console.error('Erro ao gerar resposta IA:', error);
        res.status(500).json({ error: 'Erro ao gerar resposta automática.' });
    }
};
