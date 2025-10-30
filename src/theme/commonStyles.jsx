export const pageContainerStyles = (theme) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: theme.colors.gray[0],
  padding: theme.spacing.md,
});

export const cardStyles = (theme) => ({
  backgroundColor: theme.white,
  borderRadius: theme.radius.md,
  padding: theme.spacing.xl,
});

export const primaryButtonStyles = (theme) => ({
  backgroundColor: theme.black,
  '&:hover': {
    backgroundColor: theme.colors.dark[9],
  },
});

export const outlineButtonStyles = (theme) => ({
  borderColor: theme.black,
  color: theme.black,
  '&:hover': {
    backgroundColor: theme.colors.gray[0],
  },
});

export const inputStyles = (theme) => ({
  input: {
    borderColor: theme.colors.gray[3],
    '&:focus': {
      borderColor: theme.colors.dark[9],
    },
  },
});

export const linkTextStyles = (theme, disabled = false) => ({
  cursor: disabled ? 'not-allowed' : 'pointer',
  color: theme.colors.dark[6],
  '&:hover': disabled ? {} : {
    color: theme.black,
    textDecoration: 'underline',
  },
});

export const tableStyles = (theme) => ({
  '& thead tr th': {
    backgroundColor: theme.colors.gray[1],
    color: theme.black,
    fontWeight: 600,
    borderBottom: `2px solid ${theme.colors.gray[3]}`,
  },
  '& tbody tr:hover': {
    backgroundColor: theme.colors.gray[0],
  },
});

export const headerStyles = (theme) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  borderBottom: `1px solid ${theme.colors.gray[3]}`,
  backgroundColor: theme.white,
  zIndex: 100,
});

export const contentWithHeaderStyles = (theme) => ({
  marginTop: 80, // Account for fixed header height (60px) + padding
  padding: theme.spacing.xl,
  minHeight: 'calc(100vh - 80px)',
  backgroundColor: theme.colors.gray[0],
});

export const iconButtonStyles = (theme) => ({
  '&:hover': {
    backgroundColor: theme.colors.gray[1],
  },
});

export const activeNavItemStyles = (theme) => ({
  cursor: 'pointer',
  paddingBottom: 2,
  borderBottom: `3px solid ${theme.black}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    borderBottom: `3px solid ${theme.colors.gray[6]}`,
  },
});

export const inactiveNavItemStyles = (theme) => ({
  cursor: 'pointer',
  paddingBottom: 2,
  borderBottom: '3px solid transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderBottom: `3px solid ${theme.colors.gray[6]}`,
  },
});
