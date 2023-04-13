import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe'
import { useVForm } from '../../shared/components/form/useVForm'
import { VForm } from '../../shared/components/form/VForm'
import { VImageField } from '../../shared/components/form/VImageField'
import { VTextField } from '../../shared/components/form/VTextField'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { NoticiaServices } from '../../shared/services/api/noticias/NoticiasService'
import { ListaAdm } from './ListaAdm'

interface FormDataProps {
  nomeNoticia: string
  imgNoticia: string
}

const FormValidationSchema: yup.Schema<FormDataProps> = yup.object().shape({
  nomeNoticia: yup.string().required().min(3),
  imgNoticia: yup.string().required(),
})

export const DetalheNoticiasAdm: React.FC = () => {
  const navigate = useNavigate()
  const { id = 'nova' } = useParams<'id'>()
  const { formRef, IsSaveAndClose, save, saveAndClose } = useVForm()
  const [nome, setNome] = useState('')

  const handleSave = (dados: FormDataProps) => {
    FormValidationSchema.validate(dados, { abortEarly: false })
      .then(dadosValidados => {
        if (id === 'nova') {
          NoticiaServices.create(dadosValidados).then(result => {
            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/noticias/')
              } else {
                navigate(`/adm-page/noticias/${result}`)
              }
            }
          })
        } else {
          //console.log(dadosValidados)
          NoticiaServices.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then(result => {
            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/noticias/')
              }
            }
          })
        }
      })
      .catch((errors: yup.ValidationError) => {
        const ValidationErrors: { [key: string]: string } = {}
        errors.inner.forEach(error => {
          if (!error.path) return

          ValidationErrors[error.path] = error.message
        })

        formRef.current?.setErrors(ValidationErrors)
      })
  }

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      NoticiaServices.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message)
        } else {
          alert('Registro Apagado com sucesso')
          navigate('/adm-page/noticias')
        }
      })
    }
  }

  useEffect(() => {
    if (id !== 'nova') {
      NoticiaServices.getById(Number(id)).then(result => {
        if (result instanceof Error) {
          alert(result.message)
          navigate('/adm-page/noticias')
        } else {
          console.log(result)
          setNome(result.nomeNoticia)
          formRef.current?.setData(result)
        }
      })
    } else {
      formRef.current?.setData({})
    }
  }, [id])

  return (
    <ListaAdm>
      <LayoutBaseDePagina
        barraDeFerramentas={
          <FerramentasDeDetalhe
            mostarBotaoSalvarEFechar
            mostarBotaoApagar={id !== 'nova'}
            mostarBotaoNovo={id !== 'nova'}
            TextoBotaoNovo="Novo"
            aoClicarEmApagar={() => handleDelete(Number(id))}
            aoClicarEmNovo={() => navigate('/adm-page/noticias/nova')}
            aoClicarEmVoltar={() => navigate('/adm-page/noticias')}
            aoClicarEmSalvar={save}
            aoClicarEmSalvrEFechar={saveAndClose}
          />
        }
      >
        <Box
          py={3}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems="center"
          flexDirection={'column'}
          sx={{ backgroundColor: ' #EBF5FB  ' }}
        >
          <VForm style={{ width: '100%' }} ref={formRef} onSubmit={handleSave}>
            <Box display="flex" flexDirection="column" px={2}>
              <Box textAlign={'center'}>
                <Typography fontSize={30} fontWeight="bold">
                  {id === 'nova'
                    ? 'Criando nova Noticias'
                    : `Editando: ${nome}`}
                </Typography>
              </Box>
              <Grid container direction="column" spacing={5}>
                <Grid item xs={12} width={'100%'}>
                  <VTextField
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: 2,
                      width: '100%',
                    }}
                    label="Nome"
                    name="nomeNoticia"
                    onChange={e => setNome(e.target.value)}
                  />
                </Grid>

                <Grid
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  gap={2}
                  item
                  xs={12}
                >
                  <VImageField name="imgNoticia" />
                </Grid>
              </Grid>
            </Box>
          </VForm>
        </Box>
      </LayoutBaseDePagina>
    </ListaAdm>
  )
}
