import { CSSProperties } from 'react'
import { createTheme, experimental_sx as sx, alpha } from '@mui/material/styles'
import '@mui/lab/themeAugmentation'
import InterMedium from './fonts/Inter-Medium.woff2'
import InterSemibold from './fonts/Inter-SemiBold.woff2'
import InterRegular from './fonts/Inter-Regular.woff2'
import InterBold from './fonts/Inter-Bold.woff2'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    paper?: {
      cross?: string
      bg?: string
    }
    itemRarity?: {
      common?: string
      rare?: string
      epic?: string
      elite?: string
      legendary?: string
    }
    boxType?: {
      basic?: string
      starter?: string
      enhanced?: string
      limited?: string
      deluxe?: string
      promo?: string
    }
    controls: {
      bg: string
    }
    menu: {
      bg: string
    }
    alpha: {
      5: string
      8: string
      10: string
      12: string
      20: string
      30: string
      40: string
      60: string
    }
  }

  interface TypeBackground {
    secondary: string
  }

  interface TypeText {
    icon: string
    altPrimary: string
    third: string
    action: string
  }

  interface TypographyVariantsOptions {
    h1alt?: CSSProperties
    h7?: CSSProperties
    h8?: CSSProperties
    counter?: CSSProperties
    subtitle0?: CSSProperties
    subtitle1alt?: CSSProperties
    subtitle2alt?: CSSProperties
    subtitle3?: CSSProperties
    subtitle3alt?: CSSProperties
    subtitle4?: CSSProperties
    subtitle4alt?: CSSProperties
    subtitle5?: CSSProperties
    subtitle6?: CSSProperties
    menu?: CSSProperties
    menuAlt?: CSSProperties
    menu2alt?: CSSProperties
    largeTabs?: CSSProperties
    tinyTabs?: CSSProperties
    buttonSmall?: CSSProperties
    buttonBig?: CSSProperties
    modalTitle?: CSSProperties
    tierSmall?: CSSProperties
    tierLarge?: CSSProperties
    timersubtitle?: CSSProperties
    subtitle2altadaptive?: CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1alt: true
    h7: true
    h8: true
    counter: true
    subtitle0: true
    subtitle1alt: true
    subtitle2alt: true
    subtitle3: true
    subtitle3alt: true
    subtitle4: true
    subtitle4alt: true
    subtitle5: true
    subtitle6: true
    menu: true
    menuAlt: true
    menu2alt: true
    largeTabs: true
    tinyTabs: true
    buttonSmall: true
    buttonBig: true
    modalTitle: true
    tierSmall: true
    tierLarge: true
    timersubtitle: true
    subtitle2altadaptive: true
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsSizeOverrides {
    xlarge: true
    xsmall: true
    xxsmall: true
    xxxsmall: true
    xmedium: true
    xxlarge: true
  }

  interface SvgIconPropsColorOverrides {
    third: true
    warningAlt: true
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    big: true
    filledCounter: true
    large: true
    number: true
  }
}
declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    large: true
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
    xxxl: true
    container: true
  }

  interface Theme {
    palette: typeof palette
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true
    simple: true
    base: true
    menuActive: true
  }

  interface ButtonPropsSizeOverrides {
    xsmall: true
  }
}

declare module '@mui/material/Skeleton' {
  interface SkeletonPropsVariantOverrides {
    radius: true
  }
}

export const palette = {
  mode: 'dark' as const,
  background: {
    default: '#171717',
    secondary: '#232323',
  },
  controls: {
    bg: '#150915',
  },
  menu: {
    bg: '#2E2E2E',
    bgOpacity: 'rgba(46, 46, 46, 0.98)',
  },
  paper: {
    bg: '#191119',
    cross: '#C4C4C4',
  },
  primary: {
    // light: will be calculated from palette.primary.main,
    main: '#0070E4',
    dark: '#005CBB',
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  secondary: {
    main: '#E44797',
  },
  text: {
    primary: '#F4F4F4',
    secondary: '#797979',
    third: '#F0CD89',
    altPrimary: '#171717',
    icon: '#8C888C',
    action: '#0070E4',
  },
  success: {
    main: '#00EAB2',
    light:
      'linear-gradient(90deg, rgba(0, 234, 178, 0.1) 0%, rgba(0, 234, 178, 0) 100%), rgba(37, 29, 37, 0.9)',
  },
  warning: {
    main: '#FFBE4D',
    light:
      'linear-gradient(90deg, rgba(255, 190, 77, 0.1) 0%, rgba(255, 190, 77, 0) 100%), rgba(37, 29, 37, 0.9)',
  },
  info: {
    main: '#00EAB2',
  },
  error: {
    main: '#EE2051',
    light:
      'linear-gradient(90deg, rgba(238, 32, 81, 0.1) 0%, rgba(238, 32, 81, 0) 100%), rgba(37, 29, 37, 0.9)',
  },
  // TODO expand with gradient
  itemRarity: {
    common: '#5AC8FA',
    rare: '#FFBE4D',
    epic: '#FF2D55',
    elite: '#C5FF74',
    legendary: '#AA94FF',
  },
  boxType: {
    basic: '#F7F6F6',
    starter: '#6FD166',
    enhanced: '#6F9BE8',
    limited: '#D3C25B',
    deluxe: '#E35457',
  },
  nftBoxType: {
    basic: '#F7F6F6',
    starter: '#6FD166',
    enhanced: '#6F9BE8',
    limited: '#D3C25B',
    deluxe: '#E35457',
  },
  alpha: {
    4: 'rgba(255, 255, 255, 0.04)',
    5: 'rgba(255, 255, 255, 0.05)',
    8: 'rgba(255, 255, 255, 0.08)',
    10: 'rgba(255, 255, 255, 0.1)',
    12: 'rgba(255, 255, 255, 0.12)',
    20: 'rgba(255, 255, 255, 0.2)',
    24: 'rgba(255, 255, 255, 0.24)',
    30: 'rgba(255, 255, 255, 0.3)',
    40: 'rgba(255, 255, 255, 0.4)',
    60: 'rgba(255, 255, 255, 0.6)',
  },
  chart: {
    axis: '#A3A3A3',
  },
}

const { breakpoints } = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
      xxxl: 1920,
      container: 1344,
    },
  },
})

export type Theme = typeof darkTheme & typeof themeOptions

const themeOptions = {
  breakpoints,
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter"',
      fontSize: '3.5rem',
      lineHeight: 1.08,
      fontWeight: 500,
      [breakpoints.down('lg')]: {
        fontSize: '2.875rem',
      },
      [breakpoints.down('md')]: {
        fontSize: '2.375rem',
        lineHeight: 1.05,
      },
      [breakpoints.down('sm')]: {
        fontSize: '2.125rem',
      },
    },
    h2: {
      fontFamily: '"Inter"',
      fontSize: '2.5rem',
      lineHeight: 1.1,
      fontWeight: 500,
      [breakpoints.down('lg')]: {
        fontSize: '2.375rem',
        lineHeight: 1.1053,
      },
      [breakpoints.down('md')]: {
        fontSize: '2.5rem',
        lineHeight: 1.25,
      },
      [breakpoints.down('sm')]: {
        fontSize: '1.75rem',
        lineHeight: 1.143,
      },
    },
    h3: {
      fontFamily: '"Inter"',
      lineHeight: 1.125,
      fontSize: '2rem',
      fontWeight: 500,
      [breakpoints.down('md')]: {
        fontSize: '1.625rem',
        lineHeight: 1.15,
      },
      [breakpoints.down('sm')]: {
        fontSize: '1.5rem',
        lineHeight: 1.33,
      },
    },
    h4: {
      fontFamily: '"Inter"',
      fontSize: '1.625rem',
      lineHeight: 1.23,
      fontWeight: 500,
      [breakpoints.down('md')]: {
        fontSize: '1.5rem',
        lineHeight: 1.25,
      },
      [breakpoints.down('sm')]: {
        fontSize: '1.25rem',
        lineHeight: 1.3,
      },
    },
    h5: {
      fontFamily: '"Inter"',
      fontSize: '1.25rem',
      lineHeight: 1.2,
      fontWeight: 500,
      [breakpoints.down('lg')]: {
        fontSize: '1.375rem',
        lineHeight: 1.27,
      },
      [breakpoints.down('md')]: {
        fontSize: '1.25rem',
        lineHeight: 1.27,
      },
      [breakpoints.down('sm')]: {
        fontSize: '1.125rem',
        lineHeight: 1.22,
      },
    },
    h6: {
      fontFamily: '"Inter"',
      textTransform: 'uppercase',
      fontSize: '1rem',
      lineHeight: 1.25,
      fontWeight: 500,
      [breakpoints.down('lg')]: {
        fontSize: '1.125rem',
        lineHeight: 1.22,
      },
      [breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: 1.25,
      },
    },
    h7: {
      fontFamily: '"Inter"',
      textTransform: 'uppercase',
      fontSize: '1.375rem',
      lineHeight: 1.1818,
      fontWeight: 600,
    },
    h8: {
      fontFamily: '"Inter"',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      lineHeight: 1.1666,
      fontWeight: 600,
    },
    counter: {
      fontFamily: '"Inter"',
      fontSize: '1.25rem',
      lineHeight: 1.875,
      fontWeight: 500,
    },
    subtitle0: {
      fontWeight: 500,
      fontSize: '1.75rem',
      lineHeight: 1.5,
      [breakpoints.down('md')]: {
        fontSize: '1.5rem',
      },
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: palette.text.secondary,
    },
    subtitle1alt: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.25,
      color: palette.text.secondary,
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.428,
    },
    subtitle2alt: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.428,
    },
    subtitle2altadaptive: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.428,
      [breakpoints.down('sm')]: {
        fontWeight: 600,
        fontSize: '0.785rem',
        lineHeight: 1.272,
      },
    },
    menu: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.428,
      letterSpacing: '0.03em',
    },
    menuAlt: {
      fontWeight: 700,
      fontSize: '0.875rem',
      lineHeight: 1.428,
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
    },
    menu2alt: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.428,
      [breakpoints.down('md')]: {
        fontSize: '0.625rem',
      },
    },
    subtitle3: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    subtitle3alt: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    timersubtitle: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      lineHeight: 1.26,
      textTransform: 'capitalize',
    },
    subtitle4: {
      fontSize: '0.625rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    subtitle4alt: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      lineHeight: 1.27,
      letterSpacing: '0.03em',
    },
    subtitle5: {
      fontSize: '0.5625rem',
      fontWeight: 600,
      lineHeight: 1.333,
    },
    subtitle6: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      lineHeight: 1.333,
    },
    button: {
      letterSpacing: '0.03em',
    },
    buttonBig: {
      fontSize: '1.125rem',
      fontWeight: 400,
      letterSpacing: '0.03em',
      lineHeight: 1.3333,
    },
    buttonSmall: {
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.03em',
      lineHeight: 1.4285,
    },
    largeTabs: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.375,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    tinyTabs: {
      fontWeight: 700,
      fontSize: '0.75rem',
      lineHeight: 1.333,
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
    },
    modalTitle: {
      fontFamily: '"Inter"',
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.83,
    },
    tierLarge: {
      fontFamily: '"Inter"',
      textTransform: 'uppercase',
      fontSize: '1rem',
      lineHeight: 1.25,
      fontWeight: 400,
      [breakpoints.down('lg')]: {
        fontSize: '0.875rem',
        lineHeight: 1.28,
      },
    },
    tierSmall: {
      fontFamily: '"Inter"',
      textTransform: 'uppercase',
      fontSize: '0.5rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
  },
  palette,
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `  
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Inter'), local('Inter-Medium'), url(${InterMedium}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;    
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('Inter'), local('Inter-SemiBold'), url(${InterSemibold}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Inter'), local('Inter-Regular'), url(${InterRegular}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Inter'), local('Inter-Bold'), url(${InterBold}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        html, body, #__next {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        a {
          text-decoration: none;
        }
      `,
    },
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        variant: 'outlined',
        disableElevation: true,
        size: 'medium',
      },
      variants: [
        {
          props: { variant: 'action' },
          style: sx({
            position: 'relative',
            color: 'primary.main',
            transition: '0.6s',
            paddingY: '7px',
            '&:after, &:before': {
              content: '" "',
              position: 'absolute',
              width: 0,
              height: '1px',
              transition: '0.6s',
              backgroundSize: '200%',
              opacity: 0,
            },
            '&:after': {
              top: 0,
              left: 0,
              background: `linear-gradient(90deg, ${palette.primary.main} 0%, rgba(228, 71, 151, 0) 100%)`,
            },
            '&:before': {
              bottom: 0,
              right: 0,
              background: `linear-gradient(90deg, rgba(228, 71, 151, 0) 0%, ${palette.primary.main} 100%)`,
            },
            '&:hover': {
              background: 'none',
              textShadow: `0px 0px 20px ${alpha(palette.primary.main, 0.7)}`,
              transition: '0.6s',
              '&:after, &:before': {
                width: '40px',
                transition: '0.6s',
                opacity: 1,
              },
            },
          }),
        },
        {
          props: { variant: 'simple' },
          style: sx({
            position: 'relative',
            color: `${palette.text.secondary}`,
            transition: '0.6s',
            paddingY: '3px',
            paddingX: '9px',
            background: `${palette.alpha[5]}`,
            '&:hover': {
              background: `${palette.alpha[12]}`,
            },
            '&:active': {
              background: `${palette.alpha[8]}`,
            },
            '&:disabled': {
              color: 'text.secondary',
            },
          }),
        },
        {
          props: { variant: 'simple', size: 'medium' },
          style: sx({
            minWidth: 40,
            borderRadius: '4px',
          }),
        },
        {
          props: { variant: 'base' },
          style: sx({
            position: 'relative',
            color: palette.text.primary,
            transition: '0.6s',
            background: palette.alpha['5'],
            '&:hover': {
              background: palette.alpha['12'],
            },
            '&:active': {
              background: `${palette.alpha['8']}`,
            },
            '&:disabled': {
              color: 'text.secondary',
            },
          }),
        },
        {
          props: { variant: 'menuActive' },
          style: sx({
            border: '1px solid',
            borderColor: 'alpha.10',
            borderRadius: '4px',
          }),
        },
      ],
      styleOverrides: {
        root: sx({
          whiteSpace: 'no-wrap',
          textTransform: 'capitalize',
        }),
        sizeXsmall: sx({
          minWidth: '40px',
          height: '24px !important',
          p: '3px 6px',
          color: `${palette.text.secondary} !important`,
          borderRadius: '4px',
        }),
        sizeLarge: sx({
          height: '56px',
          paddingX: 3.5,
          fontSize: '1.125rem',
          fontWeight: 400,
          lineHeight: 1,
          borderRadius: '8px',
          '& > .MuiButton-startIcon': {
            mr: '12px',
            ml: 0,
          },
          '& > .MuiButton-endIcon': {
            ml: '12px',
            mr: 0,
          },
          '& > .MuiButton-startIcon > *:nth-of-type(1)': {
            fontSize: '24px',
          },
          '& > .MuiButton-endIcon > *:nth-of-type(1)': {
            fontSize: '24px',
          },
        }),
        sizeMedium: sx({
          height: '40px',
          paddingX: 2.5,
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1,
          borderRadius: '4px',
          '& > .MuiButton-startIcon': {
            ml: 0,
          },
          '& > .MuiButton-endIcon': {
            mr: 0,
          },
          '& > .MuiButton-startIcon > *:nth-of-type(1)': {
            fontSize: '16px',
          },
          '& > .MuiButton-endIcon > *:nth-of-type(1)': {
            fontSize: '16px',
          },
        }),
        sizeSmall: sx({
          height: '32px',
          paddingX: 2,
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1,
          borderRadius: '4px',
          '& > MuiButton-startIcon': {
            ml: 0,
          },
          '& > MuiButton-endIcon': {
            mr: 0,
          },
          '& > .MuiButton-startIcon > *:nth-of-type(1)': {
            fontSize: '16px',
          },
          '& > .MuiButton-endIcon > *:nth-of-type(1)': {
            fontSize: '16px',
          },
          '&.MuiButton-basePrimary': {
            height: '48px',
          },
        }),
        containedPrimary: sx({
          bgcolor: 'primary.main',
          borderRadius: '4px',
          color: 'text.primary',
          '&:hover': {
            background: 'primary.dark',
          },
          '&:disabled': {
            color: 'text.secondary',
            background: alpha(palette.text.primary, 0.12),
          },
        }),
        outlinedPrimary: sx({
          borderColor: 'alpha.24',
          borderRadius: '4px',
          color: 'text.primary',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'alpha.24',
          },
          '&:active': {
            background: 'rgba(255, 255, 255, 0.08)',
          },
          '&:disabled': {
            color: alpha(palette.text.primary, 0.4),
            background: 'transparent',
          },
        }),
        textPrimary: sx({
          background: 'transparent',
          color: 'text.secondary',
          '&:hover': {
            color: 'text.primary',
            background: 'transparent',
          },
          '&:active': {
            color: 'rgba(232, 232, 232, 0.8)',
          },
          '&:disabled': {
            color: 'rgba(232, 232, 232, 0.4)',
            background: 'transparent',
          },
        }),
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableFocusRipple: true,
      } as any,
      variants: [
        {
          props: { variant: 'text' } as any,
          style: {
            background: 'transparent',
            borderRadius: '50%',
          },
        },
        {
          props: { variant: 'square' } as any,
          style: {
            background: 'transparent',
          },
        },
      ],
      styleOverrides: {
        root: sx({
          bgcolor: 'alpha.5',
          '&:hover': {
            background: 'alpha.12',
          },
          '&:active': {
            background: 'alpha.8',
          },
          '&:disabled': {
            color: 'text.secondary',
          },
          '&.MuiButtonBase-root': {
            borderRadius: '4px',
          },
        }),
        sizeMedium: sx({
          height: '40px',
          width: '40px',
        }),
        sizeSmall: sx({
          height: '32px',
          width: '32px',
        }),
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: sx({
          padding: 0,
          bgcolor: 'background.default',
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: sx({
          height: '88px',
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'container',
      },
      styleOverrides: {
        root: sx({
          paddingX: { xs: '16px', md: '44px', lg: '56px', xl: '60px' },
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 100%',
        }),
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
        square: true,
      },
      styleOverrides: {
        root: sx({
          background: 'transparent',
          padding: 3,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          overflow: 'initial',
          borderRadius: '8px',
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: sx({
          color: 'secondary.main',
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: sx({
          input: {
            color: 'text.primary',
            padding: 0,
            '&::placeholder': {
              color: 'text.secondary',
            },
          },
          '.MuiFormHelperText-root': {
            margin: '6px 0 0 0',
            color: 'text.secondary',
          },
          '.MuiFormHelperText-root.Mui-error': {
            margin: '6px 0 0 0',
            color: 'error.main',
          },
          '.MuiInputAdornment-root.MuiInputAdornment-positionStart svg, .MuiInputAdornment-root.MuiInputAdornment-positionEnd svg':
            {
              maxHeight: 32,
              maxWidth: 32,
            },
          '.MuiInputAdornment-root': {
            marginTop: '0!important',
          },
          // workround for unsupport variant
          '&.filledCounter': {
            '.MuiFilledInput-root': {
              fontSize: '28px',
              fontWeight: '500',
              padding: '0px 16px 7px 16px!important',
            },
          },
        }),
      },
      variants: [
        {
          props: { size: 'medium' } as any,
          style: {
            input: {
              fontSize: '1rem',
            },
          },
        },
        {
          props: { size: 'big' } as any,
          style: {
            input: {
              fontSize: '1.5rem',
            },
          },
        },
        {
          props: { size: 'large' } as any,
          style: {
            input: {
              fontSize: '1.75rem',
              fontWeight: 700,
            },
            '& .MuiInputBase-root.MuiInputBase-formControl': {
              paddingBottom: 8,
              paddingTop: 8,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: sx({
            fieldset: { border: 'none' },
            '.MuiInputBase-root': {
              padding: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.07)',
              borderRadius: '6px',
              '&:hover': {
                boxShadow: '0px 0px 0px 1px rgba(255, 255, 255, 0.24) inset',
              },
              color: 'text.primary',
            },
            '.MuiInputBase-root.Mui-disabled': {
              boxShadow: '0px 0px 0px 1px rgba(255, 255, 255, 0.24) inset',
              cursor: 'not-allowed',
              background: 'transparent',
            },
            '.MuiInputBase-root.Mui-focused': {
              boxShadow: '0px 0px 0px 1px rgba(255, 255, 255, 0.64) inset',
            },
            '.MuiInputBase-root.Mui-error.Mui-focused, .MuiInputBase-root.Mui-error.Mui-disabled, .MuiInputBase-root.Mui-error':
              {
                boxShadow: '0px 0px 0px 1px #EE2051 inset',
                '&:hover': {
                  boxShadow: '0px 0px 0px 1px #EE2051 inset',
                },
              },
          }),
        },
        {
          props: { variant: 'filled' },
          style: sx({
            fieldset: {
              border: 'none',
            },
            '.MuiFilledInput-root': {
              padding: '16px',
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
              },
              '&:not(&:hover)': {
                bgcolor: 'transparent',
              },
              '&:before': {
                borderBottom: '1px solid  rgba(255, 255, 255, 0.1)',
              },
            },
          }),
        },
        {
          props: { variant: 'standard' },
          style: sx({
            fieldset: { border: 'none' },
            '.MuiInputBase-root': {
              padding: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.07)',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
              '&:hover': {
                boxShadow: '0px 0px 0px 1px rgba(255, 255, 255, 0.24) inset',
              },
              color: 'text.primary',
            },
            '.MuiInputBase-root.Mui-disabled': {
              boxShadow: '0px 0px 0px 1px rgba(255, 255, 255, 0.24) inset',
              cursor: 'not-allowed',
            },
            '.MuiInputBase-root.Mui-focused': {
              boxShadow: '0px 0px 0px 1px rgba(255, 255, 255, 0.64) inset',
            },
            '.MuiInputBase-root.Mui-error.Mui-focused, .MuiInputBase-root.Mui-error.Mui-disabled, .MuiInputBase-root.Mui-error':
              {
                boxShadow: '0px 0px 0px 1px #EE2051 inset',
                '&:hover': {
                  boxShadow: '0px 0px 0px 1px #EE2051 inset',
                },
              },
          }),
        },
        {
          props: { size: 'number' },
          style: sx({
            input: { fontSize: '24px', fontWeight: 500 },
            '& .MuiInputBase-root': { maxHeight: '56px' },
          }),
        },
      ],
    },
    MuiFormControl: {
      styleOverrides: {
        root: sx({
          fieldset: { border: 'none' },

          '&:hover': {
            boxShadow: 'none',
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: sx({
          mb: 1,
          color: 'text.primary',
          lineHeight: 1.333,
          display: 'flex',
          alignItems: 'center',
          '& svg': {
            ml: 1,
          },
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        variant: 'subtitle2',
        underline: 'none',
      },
      variants: [
        {
          props: { variant: 'subtitle2' },
          style: sx({
            color: 'primary.main',
            borderBottom: '1px solid rgba(0, 112, 228, 0.15)',
            '&:hover': {
              borderBottomColor: 'primary.main',
            },
          }),
        },
        {
          props: { variant: 'subtitle2alt' },
          style: sx({
            borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
            fontWeight: 400,
            '&:hover': {
              borderBottomColor: 'text.primary',
            },
          }),
        },
        {
          props: { variant: 'subtitle1' },
          style: sx({
            color: 'primary.main',
            borderBottom: '1px solid rgba(0, 112, 228, 0.15)',
            '&:hover': {
              borderBottomColor: 'primary.main',
            },
          }),
        },
        {
          props: { variant: 'subtitle1alt' },
          style: sx({
            fontWeight: 400,
            borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
            '&:hover': {
              borderBottomColor: 'text.primary',
            },
          }),
        },
        {
          props: { variant: 'subtitle3' },
          style: sx({
            borderBottom: `1px solid rgba(255, 255, 255, 0)`,
            '&:hover': {
              borderBottomColor: 'rgba(255, 255, 255, 0.1)',
            },
          }),
        },
      ],
      styleOverrides: {
        root: sx({
          textDecoration: 'none',
          transition: 'border-color 0.3s',
          cursor: 'pointer',
          '&:hover': {
            transition: '0.2s',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
          },
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: sx({
          fontFamily: '"Inter"',
          fontSize: '1.5rem',
          lineHeight: 1.83,
          textTransform: 'none',
        }),
      },
    },
    MuiDialog: {
      defaultProps: {
        maxWidth: 'sm',
        fullScreen: false,
        fullWidth: true,
      },
      styleOverrides: {
        paper: sx({
          position: 'sticky',
          top: 0,
          bgcolor: '#232323',
          backgroundImage: 'none',
          padding: 0,
          mt: {
            xs: '0',
            sm: '10vh',
          },
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          width: '100%',
          height: 'auto',
          overflow: 'visible',
          maxHeight: 'fit-content !important',
        }),
        container: {
          height: '100vh',
          overflow: 'auto',
          alignItems: 'flex-start',
        },
        paperWidthSm: {
          width: '480px',
        },
      },
      variants: [
        {
          props: { maxWidth: 'xs' },
          style: {
            '& .MuiPaper-root': {
              maxWidth: 385,
            },
          },
        },
        {
          props: { maxWidth: 'sm' },
          style: {
            '& .MuiPaper-root': {
              maxWidth: 480,
            },
          },
        },
      ],
    },
    MuiGrid: {
      defaultProps: {
        columns: {
          xs: 4,
          sm: 4,
          md: 6,
          lg: 8,
          xl: 10,
          xxl: 10,
        },
        spacing: {
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        },
      },
      styleOverrides: {
        container: sx({
          maxWidth: 'none !important',
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: 0,
          background: 'transparent',
        },
        tooltipPlacementBottom: {
          marginTop: '5px!important',
        },
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'medium',
      },
      styleOverrides: {
        fontSizeXxxsmall: sx({
          fontSize: '8px',
        }),
        fontSizeXxsmall: sx({
          fontSize: '10.5px',
        }),
        fontSizeXsmall: sx({
          fontSize: '12px',
        }),
        fontSizeSmall: sx({
          fontSize: '16px',
        }),
        fontSizeMedium: sx({
          fontSize: '20px',
        }),
        fontSizeXmedium: sx({
          fontSize: '22px',
        }),
        fontSizeLarge: sx({
          fontSize: '24px',
        }),
        fontSizeXlarge: sx({
          fontSize: '48px',
        }),
        fontSizeXxlarge: sx({
          fontSize: '64px',
        }),
        colorThird: sx({
          color: 'text.secondary',
        }),
        colorWarningAlt: sx({
          color: 'text.third',
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 36,
          height: 20,
          padding: 0,
          marginRight: 8,
          '&:hover': {
            '.MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#DF2685',
            },
            '.MuiSwitch-switchBase + .MuiSwitch-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            '.MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
          '.MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            border: 0,
          },
          '.MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(15px)',
          },
          '.MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#E44797',
            opacity: 1,
          },
          '.MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
            opacity: 1,
          },
          '.MuiSwitch-switchBase.Mui-checked.Mui-disabled + .MuiSwitch-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '.Mui-disabled + .MuiSwitch-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '.MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 16,
            height: 16,
          },
          '.MuiSwitch-track': {
            borderRadius: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            opacity: 1,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: { background: 'transparent', boxShadow: 'none' },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          flexDirection: 'row-reverse',
          padding: 0,
        },
        expandIconWrapper: { marginRight: '8px' },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 12px 0 0',
          transition: '0.3s',
          '&.active': {
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: '100%',
          flexShrink: 0,
          top: 88,
          '& .MuiDrawer-paper': {
            top: 88,
            width: '100%',
            padding: '32px 16px',
            boxSizing: 'border-box',
            background: 'rgba(23, 23, 23, 0.95)',
            [breakpoints.up('sm')]: {
              padding: '32px 44px',
            },
            [breakpoints.up('md')]: {
              padding: '36px 58px',
            },
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          '& .MuiBadge-badge': {
            background: '#191119',
            right: 4,
            top: 21,
            fontSize: '0.5rem',
            height: '14px',
            minWidth: '14px',
            padding: '0 4px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiSelect-select.MuiInputBase-input': {
            background: 'rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
          },
          '& .MuiSvgIcon-root': {
            color: '#8C888C',
          },
        },
      },
      variants: [
        {
          props: { size: 'small', variant: 'filled' },
          style: sx({
            '& .MuiSelect-select.MuiInputBase-input': {
              paddingTop: '8px',
              paddingBottom: '8px',
            },
          }),
        },
        {
          props: { size: 'small' },
          style: sx({
            '& .MuiSelect-select.MuiInputBase-input': {
              borderRadius: '4px',
            },
          }),
        },
        {
          props: { size: 'medium' },
          style: sx({
            fontSize: '1rem',
            '& .MuiSelect-select.MuiInputBase-input': {
              paddingBottom: '16px',
              paddingTop: '16px',
            },
          }),
        },
        {
          props: { size: 'large' },
          style: sx({
            fontSize: '1.75rem',
            fontWeight: 700,
            '& .MuiSelect-select.MuiInputBase-input': {
              paddingBottom: '16px',
              paddingTop: '16px',
            },
          }),
        },
      ],
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(46, 46, 46, 0.98)',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&.:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          position: 'relative',
          alignItems: 'flex-end',
          '& .MuiBox-root:first-of-type': {
            transform: 'scale(-1,1)',
            left: -10,
          },
          '& .MuiBox-root:last-of-type': {
            right: -10,
          },
          '&:before': {
            position: 'absolute',
            background: alpha(palette.text.primary, 0.1),
            width: '100%',
            height: '1px',
            bottom: 0,
            content: "''",
            display: 'block',
            zIndex: 1,
          },
          '& .MuiTab-iconWrapper': {
            opacity: 0.5,
          },
          '& .MuiButtonBase-root': {
            '&:hover': {
              '& .MuiTab-iconWrapper': {
                opacity: 1,
              },
            },
          },
          '& .Mui-selected': {
            '& .MuiTypography-root': {
              color: palette.text.primary,
            },
            '& .MuiTab-iconWrapper': {
              opacity: 1,
            },
          },
        },
        indicator: {
          backgroundColor: palette.primary.main,
          height: '1px',
        },
        flexContainer: {
          height: 'inherit',
        },
        scroller: {
          '&:hover': {
            '& .MuiTabs-indicator': {
              backgroundColor: palette.primary.main,
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: sx({
          padding: '14px 10px',
          minHeight: 'auto',
          textTransform: 'capitalize',
          '& .MuiTypography-root': {
            color: palette.secondary,
            fontWeight: 500,
            [breakpoints.down('lg')]: {
              fontSize: '1rem',
            },
            [breakpoints.down('md')]: {
              fontSize: '0.875rem',
            },
            [breakpoints.down('sm')]: {
              fontSize: '0.75rem',
            },
          },
          '&:hover': {
            '& .MuiTypography-root': {
              color: palette.text.primary,
            },
          },
          '&:disabled': {
            cursor: 'not-allowed',
          },
        }),
        sizeLarge: sx({ background: 'red' }),
      },
      variants: [
        {
          props: { variant: 'tinyTabs' } as any,
          style: sx({
            padding: '8px 12px',
            minWidth: 46,
          }),
        },
        {
          props: { variant: 'menu' } as any,
          style: sx({
            padding: '11px 16px',
            minWidth: 60,
          }),
        },
        {
          props: { variant: 'largeTabs' } as any,

          style: sx({
            padding: '11px 16px',
            minWidth: 60,
          }),
        },
      ],
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          paddingRight: 0,
          paddingLeft: 0,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: '3px',
          '& .MuiSlider-track': {
            backgroundColor: '#0070E4',
            border: '0 solid #0070E4',
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        },
        thumbColorPrimary: {
          background: '#F4F4F4',
          width: 16,
          height: 16,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
    MuiSkeleton: {
      variants: [
        {
          props: { variant: 'radius' } as any,
          style: sx({
            borderRadius: '16px',
            [breakpoints.down('md')]: {
              borderRadius: '8px',
            },
          }),
        },
      ],
    },
  },
}

export const darkTheme = createTheme(themeOptions as any)
