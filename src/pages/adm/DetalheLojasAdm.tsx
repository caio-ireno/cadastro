/* eslint-disable no-constant-condition */
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
import { LojasServices } from '../../shared/services/api/lojas/LojasService'

interface FormDataProps {
  telefone: number
  nomeLoja: string
  endereço: string
  imgLoja: File
  rota: string
}

const FormValidationSchema: yup.Schema<FormDataProps> = yup.object().shape({
  telefone: yup.number().required(),
  nomeLoja: yup.string().required().min(3),
  endereço: yup.string().required().min(5),
  imgLoja: yup.mixed<File>().required(),
  rota: yup.string().required(),
})

export const DetalheLojasAdm: React.FC = () => {
  const { formRef, IsSaveAndClose, save, saveAndClose } = useVForm()
  const { id = 'nova' } = useParams<'id'>()
  const [nome, setNome] = useState('')
  const navigate = useNavigate()

  const handleSave = (dados: FormDataProps) => {
    FormValidationSchema.validate(dados, { abortEarly: false })
      .then(dadosValidados => {
        if (id === 'nova') {
          LojasServices.create(dadosValidados).then(result => {
            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/lojas/')
              } else {
                navigate(`/adm-page/lojas/${result}`)
              }
            }
          })
        } else {
          LojasServices.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then(result => {
            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/lojas/')
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
      LojasServices.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message)
        } else {
          alert('Registro Apagado com sucesso')
          navigate('/adm-page/lojas')
        }
      })
    }
  }

  useEffect(() => {
    if (id !== 'nova') {
      LojasServices.getById(Number(id)).then(result => {
        if (result instanceof Error) {
          alert(result.message)
          navigate('/adm-page/lojas')
        } else {
          setNome(result.nomeLoja)
          formRef.current?.setData(result)
        }
      })
    } else {
      formRef.current?.setData({
        telefone: '',
        nomeLoja: '',
        endereço: '',
        rota: '',
      })
    }
  }, [id])

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostarBotaoSalvarEFechar
          mostarBotaoApagar={id !== 'nova'}
          mostarBotaoNovo={id !== 'nova'}
          TextoBotaoNovo="Novo"
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/adm-page/lojas/nova')}
          aoClicarEmVoltar={() => navigate('/adm-page/lojas')}
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
          <Box margin={1} display="flex" flexDirection="column">
            <Box textAlign={'center'}>
              <Typography fontSize={30} fontWeight="bold">
                {id === 'nova' ? 'Criando novo Lojas' : `Editando: ${nome}`}
              </Typography>
            </Box>
            <Grid container direction="column" padding={2} spacing={5}>
              <Grid item xs={12}>
                <VTextField
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    width: '100%',
                  }}
                  label="Nome"
                  name="nomeLoja"
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <VTextField
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    width: '100%',
                  }}
                  label="endereço"
                  name="endereço"
                />
              </Grid>

              <Grid item xs={12}>
                <VTextField
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    width: '100%',
                  }}
                  label="telefone"
                  name="telefone"
                />
              </Grid>
              <Grid item xs={12}>
                <VTextField
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    width: '100%',
                  }}
                  label="rota"
                  name="rota"
                />
              </Grid>
              <Grid item xs={12}>
                <VImageField name="imgLoja" />
              </Grid>
            </Grid>
          </Box>
        </VForm>
      </Box>
    </LayoutBaseDePagina>
  )
}
