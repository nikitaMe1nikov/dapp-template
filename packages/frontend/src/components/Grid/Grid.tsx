import { default as MUIGrid, GridProps as MUIGridProps, GridSize } from '@mui/material/Grid'
import { FC } from 'react'

export type GridProps = MUIGridProps & { xxl?: boolean | GridSize; xxxl?: boolean | GridSize }

export const Grid: FC<GridProps> = props => <MUIGrid {...props} />
