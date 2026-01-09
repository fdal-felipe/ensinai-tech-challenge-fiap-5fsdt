// Ensinai - Paleta de Cores (Conforme Figma)
// Tema minimalista preto e branco com suporte a dark mode

const Colors = {
  // Cores principais
  primary: '#27AE60',
  secondary: '#6FCF97',
  success: '#27AE60',
  error: '#EB5757',
  warning: '#F2994A',

  // Tema Light
  light: {
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#4F4F4F',
    border: '#E0E0E0',
    inputBackground: '#FFFFFF',
    tint: '#27AE60',
    tabIconDefault: '#828282',
    tabIconSelected: '#000000',
    notification: '#EB5757',
  },

  // Tema Dark (cores invertidas)
  dark: {
    background: '#000000',
    card: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#BDBDBD',
    border: '#333333',
    inputBackground: '#1A1A1A',
    tint: '#27AE60',
    tabIconDefault: '#828282',
    tabIconSelected: '#FFFFFF',
    notification: '#EB5757',
  },
};

export default Colors;
