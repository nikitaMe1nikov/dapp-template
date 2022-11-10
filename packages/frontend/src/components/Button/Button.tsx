import { FC, forwardRef } from 'react'
import { default as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { CircularProgress } from 'components/Icon/CircularProgress'
import { Box } from 'components/Box'

const AnimCircularProgress = styled(CircularProgress)`
  color: inherit;
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoaderContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`

const StyledMuiButton = styled(MuiButton)`
  position: relative;
  pointer-events: none;
  cursor: not-allowed;

  span {
    visibility: hidden;
    color: inherit;
  }

  color: ${({ variant, theme }) =>
    variant === 'contained' ? theme.palette.paper.bg : theme.palette.primary.main};
  background: ${({ variant, theme }) =>
    variant === 'contained' ? theme.palette.primary.main : 'inherit'};
`

export type ButtonProps = MuiButtonProps & {
  loading?: boolean
}

export const Button: FC<ButtonProps> = forwardRef(
  ({ loading, children, startIcon, endIcon, variant, size, ...rest }, ref) => {
    if (loading) {
      return (
        <StyledMuiButton ref={ref} variant={variant} size={size} {...rest}>
          <span>{children}</span>
          <LoaderContainer color='text.primary'>
            <AnimCircularProgress fontSize={size === 'large' ? 'medium' : 'small'} />
          </LoaderContainer>
        </StyledMuiButton>
      )
    }

    return (
      <MuiButton
        ref={ref}
        startIcon={startIcon}
        endIcon={endIcon}
        variant={variant}
        size={size}
        {...rest}
      >
        {children}
      </MuiButton>
    )
  },
)
