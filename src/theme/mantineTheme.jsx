import { createTheme } from '@mantine/core';

export const mantineTheme = createTheme({
  primaryColor: 'dark',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '42px', lineHeight: '1.2' },
      h2: { fontSize: '32px', lineHeight: '1.3' },
      h3: { fontSize: '24px', lineHeight: '1.4' },
    },
  },

  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.05), 0 20px 25px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.05), 0 25px 50px rgba(0, 0, 0, 0.1)',
  },

  radius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
      styles: (theme) => ({
        input: {
          borderColor: '#e0e0e0',
          '&:focus': {
            borderColor: '#000000',
          },
        },
      }),
    },
    
    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
      styles: (theme) => ({
        input: {
          borderColor: '#e0e0e0',
          '&:focus': {
            borderColor: '#000000',
          },
        },
      }),
    },
    
    Paper: {
      defaultProps: {
        radius: 'md',
      },
      styles: (theme) => ({
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #eeeeee',
        },
      }),
    },
  },
});
