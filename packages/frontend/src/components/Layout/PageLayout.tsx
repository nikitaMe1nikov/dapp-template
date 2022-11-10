import { FC } from 'react'
import { Container } from '@mui/material'

export const PageLayout: FC = ({ children }) => (
  <>
    <Container>{children}</Container>
  </>
)
