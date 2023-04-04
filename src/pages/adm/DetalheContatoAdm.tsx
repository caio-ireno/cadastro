/* eslint-disable no-constant-condition */
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe'
import { useVForm } from '../../shared/components/form/useVForm'
import { VForm } from '../../shared/components/form/VForm'
import { VTextField } from '../../shared/components/form/VTextField'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { ContatoServices } from '../../shared/services/api/contato/ContatoService'

interface FormDataProps {
  celular: string
  email: string
  facebook: string
  instagram: string
}

const FormValidationSchema: yup.Schema<FormDataProps> = yup.object().shape({
  celular: yup.string().required(),
  email: yup.string().required(),
  facebook: yup.string().required(),
  instagram: yup.string().required(),
})

export const DetalheContatoAdm: React.FC = () => {
  const { formRef, IsSaveAndClose, save, saveAndClose } = useVForm()
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()

  const handleSave = (dados: FormDataProps) => {
    FormValidationSchema.validate(dados, { abortEarly: false })
      .then(dadosValidados => {
        ContatoServices.updateById(Number(id), {
          id: Number(id),
          ...dadosValidados,
        }).then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            if (IsSaveAndClose()) {
              navigate('/adm-page/contato/')
            }
          }
        })
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

  useEffect(() => {
    if (id !== 'nova') {
      ContatoServices.getById(Number(id)).then(result => {
        console.log(result)
        if (result instanceof Error) {
          alert(result.message)
          navigate('/adm-page/contato')
        } else {
          formRef.current?.setData(result)
        }
      })
    }
  }, [id])

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostarBotaoNovo={false}
          mostarBotaoSalvarEFechar
          mostarBotaoApagar={false}
          aoClicarEmVoltar={() => navigate('/adm-page')}
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
            <VTextField
              multiline
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                width: '100%',
              }}
              label="Calular"
              name="celular"
            />
          </Box>
          <Box margin={1} display="flex" flexDirection="column">
            <VTextField
              multiline
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                width: '100%',
              }}
              label="Email"
              name="email"
            />
          </Box>
          <Box margin={1} display="flex" flexDirection="column">
            <VTextField
              multiline
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                width: '100%',
              }}
              label="Facebook "
              name="facebook"
            />
          </Box>
          <Box margin={1} display="flex" flexDirection="column">
            <VTextField
              multiline
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                width: '100%',
              }}
              label="Instagram"
              name="instagram"
            />
          </Box>
        </VForm>
      </Box>
    </LayoutBaseDePagina>
  )
}
