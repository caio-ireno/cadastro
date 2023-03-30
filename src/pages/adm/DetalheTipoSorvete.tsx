import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';
import { NoticiaServices } from '../../shared/services/api/noticias/NoticiasService';
import { VTextField } from '../../shared/components/form/VTextField';
import { useVForm } from '../../shared/components/form/useVForm';
import { VForm } from '../../shared/components/form/VForm';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as yup from 'yup';
import { VImageField } from '../../shared/components/form/VImageField';
import { AllTypes } from '../../shared/services/api/sorvete/AllTypes';

interface FormDataProps {
  tipo: string;
}

const FormValidationSchema: yup.Schema<FormDataProps> = yup.object().shape({
  tipo: yup.string().required().min(3),
});

export const DetalheTipoSorvete: React.FC = () => {
  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [isLoading, setIsLoading] = useState(false);
  const { formRef, IsSaveAndClose, save, saveAndClose } = useVForm();
  const [nome, setNome] = useState('');

  const handleSave = (dados: FormDataProps) => {
    FormValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === 'nova') {
          AllTypes.createType(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/tipo-sorvete/');
              } else {
                navigate(`/adm-page/tipo-sorvete/${result}`);
              }
            }
          });
        } else {
          AllTypes.updateTypeById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/tipo-sorvete/');
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const ValidationErrors: { [key: string]: string } = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;

          ValidationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(ValidationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      AllTypes.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro Apagado com sucesso');
          navigate('/adm-page/tipo-sorvete');
        }
      });
    }
  };

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      AllTypes.getTypeById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/adm-page/tipo-sorvete');
        } else {
          setNome(result.tipo);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nomeNoticia: '',
      });
    }
  }, [id]);

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostarBotaoSalvarEFechar
          mostarBotaoApagar={id !== 'nova'}
          mostarBotaoNovo={id !== 'nova'}
          TextoBotaoNovo="Novo"
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/adm-page/tipo-sorvete/nova')}
          aoClicarEmVoltar={() => navigate('/adm-page/tipo-sorvete')}
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
                {id === 'nova'
                  ? 'Criando novo tipo de Sorvete'
                  : `Editando: ${nome}`}
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
                  name="tipo"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </VForm>
      </Box>
    </LayoutBaseDePagina>
  );
};
