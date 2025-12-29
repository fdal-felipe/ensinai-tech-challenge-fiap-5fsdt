import React from 'react';
import LegalScreenLayout, { LegalSection } from '@/components/LegalScreenLayout';

const sections: LegalSection[] = [
  {
    title: '1. Introdução',
    content: `A Ensinai ("nós", "nosso" ou "Plataforma") está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários ("você" ou "Usuário"), em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD) e demais legislações aplicáveis.

Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais ao utilizar nossa plataforma educacional.`
  },
  {
    title: '2. Dados Coletados',
    content: `Coletamos os seguintes dados pessoais:

• Dados de Identificação: Nome completo e endereço de e-mail.
• Dados de Autenticação: Senha (armazenada de forma criptografada com bcrypt).
• Dados de Perfil: Função na plataforma (Professor ou Aluno).
• Dados de Vínculo Acadêmico: Relação entre Professor e Alunos, matérias vinculadas e disciplinas cursadas.
• Dados de Uso: Logs de acesso, interações com postagens, histórico de visualizações e preferências do aplicativo.
• Dados Técnicos: Tipo de dispositivo, sistema operacional, versão do aplicativo e endereço IP.`
  },
  {
    title: '3. Finalidade do Tratamento',
    content: `Seus dados são tratados para as seguintes finalidades:

• Permitir o cadastro e autenticação na plataforma.
• Personalizar a experiência do usuário com base em seu perfil (Professor/Aluno).
• Gerenciar vínculos acadêmicos entre Professores, Alunos e Matérias.
• Gerenciar postagens, matérias e interações educacionais.
• Enviar comunicações relevantes sobre a plataforma (opt-in).
• Cumprir obrigações legais e regulatórias.
• Melhorar a segurança e funcionalidade da plataforma.`
  },
  {
    title: '4. Base Legal',
    content: `O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais da LGPD:

• Execução de Contrato: Para fornecer os serviços educacionais contratados.
• Consentimento: Para envio de comunicações de marketing (quando aplicável).
• Legítimo Interesse: Para melhorias na plataforma e segurança.
• Cumprimento de Obrigação Legal: Para atender requisitos legais e regulatórios.`
  },
  {
    title: '5. Tratamento de Dados de Menores',
    content: `Em conformidade com o Art. 14 da LGPD, o tratamento de dados pessoais de crianças e adolescentes recebe atenção especial:

• Menores de 18 Anos: O cadastro e uso da plataforma por menores de 18 anos deve ser realizado com conhecimento e consentimento de pelo menos um dos pais ou responsável legal.
• Menores de 12 Anos (Crianças): O tratamento de dados de crianças somente será realizado com consentimento específico e em destaque dado por pelo menos um dos pais ou responsável legal.
• Verificação: Empreendemos esforços razoáveis para verificar que o consentimento foi dado pelo responsável, considerando as tecnologias disponíveis.
• Dados Estritamente Necessários: Coletamos apenas os dados pessoais estritamente necessários para a atividade educacional.
• Fins Educacionais: Os dados de menores são utilizados exclusivamente para fins pedagógicos e acadêmicos, nunca sendo compartilhados para fins comerciais ou de marketing.

Pais e responsáveis podem, a qualquer momento, solicitar informações sobre o tratamento de dados de seus filhos ou tutelados através do e-mail: privacidade@ensinai.com.br`
  },
  {
    title: '6. Compartilhamento de Dados',
    content: `Seus dados podem ser compartilhados com:

• Provedores de Serviços: Empresas que nos auxiliam na operação da plataforma (hospedagem, banco de dados), sob contratos de confidencialidade.
• Instituições de Ensino: Quando houver vínculo acadêmico formal, dados podem ser compartilhados com a instituição de ensino vinculada.
• Autoridades Públicas: Quando exigido por lei ou ordem judicial.

Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing sem seu consentimento expresso.`
  },
  {
    title: '7. Armazenamento e Segurança',
    content: `Seus dados são armazenados em servidores seguros com as seguintes medidas de proteção:

• Criptografia de senhas utilizando algoritmo bcrypt.
• Transmissão de dados via HTTPS/TLS.
• Tokens de autenticação JWT com expiração.
• Armazenamento seguro no dispositivo (SecureStore).
• Backups regulares com criptografia.
• Controle de acesso baseado em funções (RBAC).`
  },
  {
    title: '8. Retenção de Dados',
    content: `Os dados são mantidos de acordo com os seguintes critérios:

• Conta Ativa: Enquanto sua conta estiver ativa na plataforma.
• Após Exclusão da Conta: Dados são removidos em até 30 dias, exceto:
  - Logs de acesso: Mantidos por 6 meses para fins de segurança e auditoria.
  - Dados necessários para cumprimento de obrigações legais (conforme legislação aplicável).
  - Backups: Dados em backups são excluídos no próximo ciclo de backup (máximo de 90 dias).
• Conteúdo Acadêmico: Postagens e materiais educacionais podem ser mantidos em formato anonimizado para fins estatísticos e de melhoria da plataforma.`
  },
  {
    title: '9. Seus Direitos (LGPD)',
    content: `Você possui os seguintes direitos em relação aos seus dados pessoais:

• Confirmação e Acesso: Saber se tratamos seus dados e acessá-los.
• Correção: Solicitar a correção de dados incompletos ou desatualizados.
• Anonimização ou Bloqueio: Solicitar tratamento restrito de dados desnecessários.
• Portabilidade: Receber seus dados em formato estruturado.
• Eliminação: Solicitar a exclusão de dados tratados com base em consentimento.
• Revogação do Consentimento: Retirar consentimento a qualquer momento.
• Oposição: Opor-se ao tratamento em determinadas situações.

Para exercer seus direitos, entre em contato pelo e-mail: privacidade@ensinai.com.br`
  },
  {
    title: '10. Cookies e Tecnologias Similares',
    content: `O aplicativo móvel não utiliza cookies. No entanto, utilizamos:

• AsyncStorage/SecureStore: Para armazenar preferências locais e tokens de autenticação.
• Logs de Uso: Para análise de desempenho e melhorias na experiência do usuário.

Você pode gerenciar essas preferências nas configurações do aplicativo.`
  },
  {
    title: '11. Alterações na Política',
    content: `Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos você sobre alterações significativas através do aplicativo ou por e-mail.

A data da última atualização será sempre exibida no início deste documento.`
  },
  {
    title: '12. Contato e Encarregado (DPO)',
    content: `Para dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade ou ao tratamento de seus dados pessoais, entre em contato:

Encarregado de Proteção de Dados (DPO):
E-mail: privacidade@ensinai.com.br

Ensinai - Plataforma Educacional
Projeto acadêmico - FIAP Pós-Graduação Full Stack Development`
  },
];

export default function PrivacyPolicyScreen() {
  return (
    <LegalScreenLayout
      title="Política de Privacidade"
      lastUpdated="Última atualização: 29 de janeiro de 2025"
      sections={sections}
      crossLinkText="Ver Termos de Uso"
      crossLinkRoute="/profile/terms-of-use"
    />
  );
}
