/* eslint-disable no-constant-condition */
import {
  Grid,
  LinearProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';
import { useVForm } from '../../shared/components/form/useVForm';
import { VForm } from '../../shared/components/form/VForm';
import { VTextField } from '../../shared/components/form/VTextField';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  AllTypes,
  ListaSorveteProps,
} from '../../shared/services/api/sorvete/AllTypes';
import * as yup from 'yup';
import { AutoComplet } from './components/AutoComplet';

interface FormDataProps {
  nome: string;
  descricao: string;
  imagem: string;
  sorveteId: number;
}

const FormValidationSchema: yup.Schema<FormDataProps> = yup.object().shape({
  nome: yup.string().required().min(3),
  descricao: yup.string().required().min(10),
  imagem: yup.string().required(),
  sorveteId: yup.number().required().positive().integer().max(7),
});

export const DetalheSorveteAdm: React.FC = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { formRef, IsSaveAndClose, save, saveAndClose } = useVForm();
  const [isLoading, setIsLoading] = useState(false);
  const { id = 'nova' } = useParams<'id'>();
  const [nome, setNome] = useState('');
  const [dados, setDados] = useState<ListaSorveteProps>();
  const navigate = useNavigate();

  const handleSave = (dados: FormDataProps) => {
    console.log(dados);
    FormValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === 'nova') {
          AllTypes.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/sorvetes/');
              } else {
                navigate(`/adm-page/sorvetes/${result}`);
              }
            }
          });
        } else {
          AllTypes.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/sorvetes/');
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
          navigate('/adm-page/sorvetes');
        }
      });
    }
  };

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      AllTypes.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/adm-page/sorvetes');
        } else {
          setDados(result);
          setNome(result.nome);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: '',
        descricao: '',
        imagem: '',
        sorveteId: '',
      });
    }
  }, [id]);

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
                    onChange={(e) => setNome(e.target.value)}
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
                  <VTextField
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: 2,
                      width: '100%',
                    }}
                    label="Imagem"
                    name="imagem"
                  />
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
  );
};
