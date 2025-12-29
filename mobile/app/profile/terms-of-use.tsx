import React from 'react';
import LegalScreenLayout, { LegalSection } from '@/components/LegalScreenLayout';

const sections: LegalSection[] = [
  {
    title: '1. Aceitação dos Termos',
    content: `Ao acessar e utilizar a plataforma Ensinai ("Plataforma", "Aplicativo" ou "Serviço"), você ("Usuário") concorda integralmente com estes Termos de Uso.

Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços. O uso continuado da Plataforma após alterações nos termos constitui aceitação das mudanças.`
  },
  {
    title: '2. Descrição do Serviço',
    content: `A Ensinai é uma plataforma educacional de blogging que permite:

• Professores: Criar, editar, publicar e gerenciar postagens educacionais; gerenciar matérias e alunos.
• Alunos: Acessar e visualizar conteúdo educacional publicado; buscar postagens por palavras-chave.

O serviço é fornecido "como está" (as is) e pode ser modificado, suspenso ou descontinuado a qualquer momento, mediante aviso prévio quando possível.`
  },
  {
    title: '3. Cadastro e Conta',
    content: `Para utilizar a Plataforma, você deve:

• Fornecer informações verdadeiras, completas e atualizadas durante o cadastro.
• Manter a confidencialidade de sua senha e credenciais de acesso.
• Notificar imediatamente qualquer uso não autorizado de sua conta.
• Ser maior de 18 anos, ou ter autorização expressa de pais ou responsável legal para utilização da plataforma.

MENORES DE IDADE: O uso da plataforma por menores de 18 anos deve ocorrer sob supervisão de pais ou responsáveis legais, que serão responsáveis pelo cumprimento destes Termos. Ao permitir o acesso de menores, o responsável declara que autoriza o tratamento dos dados conforme nossa Política de Privacidade.

Você é responsável por todas as atividades realizadas em sua conta. A Ensinai não se responsabiliza por perdas decorrentes de uso não autorizado de sua conta.`
  },
  {
    title: '4. Proteção de Dados Pessoais (LGPD)',
    content: `A Ensinai está comprometida com a proteção dos dados pessoais de seus usuários, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).

Ao utilizar a Plataforma, você reconhece que:

• Seus dados pessoais serão tratados conforme descrito em nossa Política de Privacidade.
• Você tem direito de acessar, corrigir, excluir e portar seus dados.
• Dados de menores de idade são tratados com proteção especial, conforme Art. 14 da LGPD.
• Você pode revogar seu consentimento a qualquer momento, entrando em contato através do e-mail: privacidade@ensinai.com.br

Para informações completas sobre o tratamento de seus dados, consulte nossa Política de Privacidade.`
  },
  {
    title: '5. Conduta do Usuário',
    content: `Ao utilizar a Plataforma, você concorda em NÃO:

• Publicar conteúdo ilegal, difamatório, obsceno, ofensivo ou discriminatório.
• Violar direitos autorais, marcas registradas ou outros direitos de propriedade intelectual.
• Distribuir vírus, malware ou qualquer código malicioso.
• Tentar acessar áreas restritas ou sistemas da Plataforma sem autorização.
• Usar a Plataforma para fins comerciais não autorizados.
• Criar contas falsas ou se passar por outra pessoa.
• Coletar dados de outros usuários sem consentimento.

O descumprimento dessas regras pode resultar em suspensão ou exclusão permanente da conta.`
  },
  {
    title: '6. Conteúdo do Usuário e Moderação',
    content: `Ao publicar conteúdo na Plataforma, você:

• Declara ser o autor original ou possuir os direitos necessários para publicação.
• Concede à Ensinai uma licença não exclusiva, gratuita e mundial para exibir, distribuir e armazenar o conteúdo na Plataforma.
• Mantém a responsabilidade pelo conteúdo publicado.
• Compromete-se a publicar apenas conteúdo educacional verossímil e fundamentado.

MODERAÇÃO DE CONTEÚDO: A Ensinai reserva-se o direito de remover, sem aviso prévio, qualquer conteúdo que:

• Viole direitos autorais de terceiros.
• Contenha informações comprovadamente falsas ou enganosas (fake news acadêmica).
• Seja plagiado ou não original.
• Viole estes Termos de Uso ou a legislação aplicável.
• Seja denunciado e confirmado como inadequado após análise.

A reincidência em violações pode resultar em suspensão ou exclusão permanente da conta.`
  },
  {
    title: '7. Propriedade Intelectual',
    content: `Todos os direitos de propriedade intelectual da Plataforma pertencem à Ensinai ou seus licenciadores, incluindo:

• Código-fonte, design, logos e marcas.
• Estrutura, organização e layout do aplicativo.
• Textos, imagens e conteúdos originais da Plataforma.

Você não pode copiar, modificar, distribuir ou criar obras derivadas sem autorização expressa.

O conteúdo criado por Professores permanece de propriedade do autor, sujeito à licença de uso concedida à Plataforma.`
  },
  {
    title: '8. Limitação de Responsabilidade',
    content: `A Ensinai não se responsabiliza por:

• Danos indiretos, incidentais, especiais ou consequentes decorrentes do uso da Plataforma.
• Interrupções, erros ou falhas no serviço.
• Conteúdo publicado por terceiros ou usuários.
• Perda de dados ou informações.
• Ações de terceiros que violem a segurança da Plataforma.
• Erros ou imprecisões no conteúdo educacional publicado por usuários.

O uso da Plataforma é por sua conta e risco. Em nenhuma hipótese a responsabilidade total da Ensinai excederá o valor pago pelo Usuário nos últimos 12 meses (se aplicável).`
  },
  {
    title: '9. Indenização',
    content: `Você concorda em indenizar e isentar a Ensinai, seus diretores, funcionários e parceiros de quaisquer reclamações, danos, perdas ou despesas (incluindo honorários advocatícios) decorrentes de:

• Violação destes Termos de Uso.
• Conteúdo publicado por você na Plataforma.
• Uso indevido do Serviço.
• Violação de direitos de terceiros.`
  },
  {
    title: '10. Modificações nos Termos',
    content: `A Ensinai pode modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor:

• Imediatamente após publicação para novos usuários.
• Após 30 dias da notificação para usuários existentes.

Notificaremos alterações significativas por e-mail ou através do aplicativo. O uso continuado após as alterações constitui aceitação dos novos termos.`
  },
  {
    title: '11. Rescisão',
    content: `Você pode encerrar sua conta a qualquer momento através das configurações do aplicativo ou entrando em contato conosco.

A Ensinai pode suspender ou encerrar sua conta se:

• Você violar estes Termos de Uso.
• Seu uso representar risco à Plataforma ou outros usuários.
• For exigido por lei ou autoridade competente.
• Houver publicação reiterada de conteúdo inadequado.

Após o encerramento, você perderá acesso à sua conta e conteúdo, sujeito às obrigações de retenção legal conforme nossa Política de Privacidade.`
  },
  {
    title: '12. Legislação Aplicável',
    content: `Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.

Qualquer disputa será submetida ao foro da Comarca de São Paulo, SP, com exclusão de qualquer outro, por mais privilegiado que seja.`
  },
  {
    title: '13. Disposições Gerais',
    content: `• Integralidade: Estes Termos constituem o acordo integral entre você e a Ensinai.
• Independência: Se qualquer disposição for considerada inválida, as demais permanecerão em vigor.
• Renúncia: A não aplicação de qualquer direito não constitui renúncia.
• Cessão: Você não pode ceder seus direitos sem consentimento prévio.`
  },
  {
    title: '14. Contato',
    content: `Para dúvidas sobre estes Termos de Uso, entre em contato:

E-mail: contato@ensinai.com.br

Ensinai - Plataforma Educacional
Projeto acadêmico - FIAP Pós-Graduação Full Stack Development`
  },
];

export default function TermsOfUseScreen() {
  return (
    <LegalScreenLayout
      title="Termos de Uso"
      lastUpdated="Última atualização: 29 de janeiro de 2025"
      sections={sections}
      crossLinkText="Ver Política de Privacidade"
      crossLinkRoute="/profile/privacy-policy"
    />
  );
}
