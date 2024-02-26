// eslint-disable-next-line import/named
import { GridColDef } from '@mui/x-data-grid'

type Props = {
  containerWidth: number
}

export function getColumns({ containerWidth }: Props): GridColDef[] {
  return [
    {
      field: 'title',
      headerName: 'Название',
      width: containerWidth,
    },
  ]
}
