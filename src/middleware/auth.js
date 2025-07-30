const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, 'SUA_CHAVE_SECRETA_SUPER_SEGURA');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};

exports.authorizeProfessor = (req, res, next) => {
    if (req.user.role !== 'professor') {
        return res.status(403).json({ error: 'Acesso negado. Rota exclusiva para professores.' });
    }
    next();
};