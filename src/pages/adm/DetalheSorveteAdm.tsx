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
import { AllTypes } from '../../shared/services/api/sorvete/AllTypes'
import { AutoComplet } from './components/AutoComplet'

interface FormDataProps {
  nome: string
  descricao: string
  imagem: File
  sorvete_id: number
}

const FormValidationSchema: yup.Schema<FormDataProps> = yup.object().shape({
  nome: yup.string().required().min(3),
  descricao: yup.string().required().min(10),
  imagem: yup.mixed<File>().required(),
  sorvete_id: yup.number().required().positive().integer(),
})

export const DetalheSorveteAdm: React.FC = () => {
  const { formRef, IsSaveAndClose, save, saveAndClose } = useVForm()
  const { id = 'nova' } = useParams<'id'>()
  const [nome, setNome] = useState('')
  //const [dados, setDados] = useState<ListaSorveteProps>();
  const navigate = useNavigate()

  const handleSave = (dados: FormDataProps) => {
    FormValidationSchema.validate(dados, { abortEarly: false })
      .then(dadosValidados => {
        if (id === 'nova') {
          AllTypes.create(dadosValidados).then(result => {
            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/sorvetes/')
              } else {
                navigate(`/adm-page/sorvetes/${result}`)
              }
            }
          })
        } else {
          AllTypes.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then(result => {
            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/sorvetes/')
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
      AllTypes.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message)
        } else {
          alert('Registro Apagado com sucesso')
          navigate('/adm-page/sorvetes')
        }
      })
    }
  }

  useEffect(() => {
    if (id !== 'nova') {
      AllTypes.getById(Number(id)).then(result => {
        if (result instanceof Error) {
          alert(result.message)
          navigate('/adm-page/sorvetes')
        } else {
          //setDados(result);
          setNome(result.nome)
          formRef.current?.setData(result)
        }
      })
    } else {
      formRef.current?.setData({
        nome: '',
        descricao: '',
        imagem: '',
        sorvete_id: '',
      })
    }
  }, [id])

  return (
    <Box>
      <LayoutBaseDePagina
        barraDeFerramentas={
          <FerramentasDeDetalhe
            mostarBotaoSalvarEFechar
            mostarBotaoApagar={id !== 'nova'}
            mostarBotaoNovo={id !== 'nova'}
            TextoBotaoNovo="Novo"
            aoClicarEmApagar={() => handleDelete(Number(id))}
            aoClicarEmNovo={() => navigate('/adm-page/sorvetes/nova')}
            aoClicarEmVoltar={() => navigate('/adm-page/sorvetes')}
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
                  {id === 'nova' ? 'Criando novo Sorvete' : `Editando: ${nome}`}
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
                    name="nome"
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
                    label="Descrição"
                    name="descricao"
                  />
                </Grid>

                <Grid item xs={12}>
                  <VImageField name="Imagem" />
                </Grid>
                <Grid item xs={12}>
                  <AutoComplet />
                </Grid>
              </Grid>
            </Box>
          </VForm>
        </Box>
      </LayoutBaseDePagina>
    </Box>
  )
}
