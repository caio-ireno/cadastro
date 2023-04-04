import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { useDebounce } from '../../shared/hooks'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { HistoriaService } from '../../shared/services/api/historia/HistoriaService'

export const Historia: React.FC = () => {
  const { debounce } = useDebounce()
  const [rows, setRows] = useState<string>('')

  useEffect(() => {
    debounce(() => {
      HistoriaService.getAll().then(result => {
        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          setRows(result.data[0].textoHistoriaPage)
        }
      })
    })
  }, [])

  return (
    <LayoutBaseDePagina>
      <Box>
        <Box
          width={'100%'}
          height="450px"
          sx={{
            objectFit: 'cover',
          }}
          component="img"
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
        />
      </Box>

      <Box display="flex" flexDirection={'column'} gap={5} mt={5}>
        <Typography textAlign={'center'}>{rows}</Typography>
      </Box>
    </LayoutBaseDePagina>
  )
}
