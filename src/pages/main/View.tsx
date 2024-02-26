import { FC, useCallback, useState } from 'react'

import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { getColumns } from './columns'
import { CompetitionForm } from './CompetitionForm'
import { FormDataDrawer, MainLayout } from '../../components'
import { StyledDataGrid } from '../../components/StyledDataGrid'
import { gridLocaleText } from '../../lib/gridLocaleText'
import { CompetitionsStore } from '../../stores'

type Props = {
  store: CompetitionsStore
}

export const View: FC<Props> = observer(({ store }) => {
  const [containerWidth, setContainerWidth] = useState(768)

  const container = useCallback((container: HTMLDivElement | null) => {
    setContainerWidth(state => container?.offsetWidth || state)
  }, [])

  const columns = getColumns({ containerWidth })

  return (
    <MainLayout>
      <FormDataDrawer hide={store.closeDrawer} open={store.open} submit={store.form.submit}>
        <CompetitionForm form={store.form} submit={store.onSubmit} />
      </FormDataDrawer>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Box textAlign="end" mb={1}>
          <Button startIcon={<Add />} variant="outlined" onClick={store.openDrawer}>
            Добавить
          </Button>
        </Box>
        <Box ref={container} height="100%" width="100%">
          <StyledDataGrid
            getRowClassName={params =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            loading={false}
            rows={[]}
            rowHeight={32}
            columns={columns}
            onRowSelectionModelChange={([id]) => store.selectItem(id)}
            // rowSelectionModel={selectedItemId ? [selectedItemId] : []}
            localeText={gridLocaleText}
            sx={{ '--DataGrid-overlayHeight': '300px' }}
          />
        </Box>
      </Box>
    </MainLayout>
  )
})
