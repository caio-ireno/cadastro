/* eslint-disable no-constant-condition */
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';
import { useVForm } from '../../shared/components/form/useVForm';
import { VForm } from '../../shared/components/form/VForm';
import { VTextField } from '../../shared/components/form/VTextField';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { AllTypes } from '../../shared/services/api/sorvete/AllTypes';
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
  const { formRef, IsSaveAndClose, save, saveAndClose } = useVForm();
  const [isLoading, setIsLoading] = useState(false);
  const { id = 'nova' } = useParams<'id'>();
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  const handleSave = (dados: FormDataProps) => {
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
      <Box py={2} sx={{ backgroundColor: '#EAEDED' }}>
        <Box textAlign={'center'}>
          <Typography fontSize={30} fontWeight="bold">
            {id === 'nova' ? 'Criando novo Sorvete' : `Editando: ${nome}`}
          </Typography>
        </Box>

        <Box
          mt={4}
          display={'flex'}
          flexDirection="row"
          alignItems="center"
          justifyContent={'center'}
          gap={4}
        >
          <Typography
            fontSize={15}
            sx={{
              backgroundColor: '#fff',
              py: 1,
              px: 2,
              border: '1px solid #1e88e5 ',
              borderRadius: 2,
            }}
          >
            Gourmet = 1
          </Typography>
          <Typography
            fontSize={15}
            sx={{
              backgroundColor: '#fff',
              py: 1,
              px: 2,
              border: '1px solid #1e88e5 ',
              borderRadius: 2,
            }}
          >
            Standart = 2
          </Typography>
          <Typography
            fontSize={15}
            sx={{
              backgroundColor: '#fff',
              py: 1,
              px: 2,
              border: '1px solid #1e88e5 ',
              borderRadius: 2,
            }}
          >
            Especial = 3
          </Typography>
          <Typography
            fontSize={15}
            sx={{
              backgroundColor: '#fff',
              py: 1,
              px: 2,
              border: '1px solid #1e88e5 ',
              borderRadius: 2,
            }}
          >
            Açai = 4
          </Typography>
          <Typography
            fontSize={15}
            sx={{
              backgroundColor: '#fff',
              py: 1,
              px: 2,
              border: '1px solid #1e88e5 ',
              borderRadius: 2,
            }}
          >
            Copão = 5
          </Typography>
          <Typography
            fontSize={15}
            sx={{
              backgroundColor: '#fff',
              py: 1,
              px: 2,
              border: '1px solid #1e88e5 ',
              borderRadius: 2,
            }}
          >
            Picolé = 6
          </Typography>
          <Typography
            fontSize={15}
            sx={{
              backgroundColor: '#fff',
              py: 1,
              px: 2,
              border: '1px solid #1e88e5 ',
              borderRadius: 2,
            }}
          >
            Linha Zero = 7
          </Typography>
        </Box>

        <VForm ref={formRef} onSubmit={handleSave}>
          <Box
            width={'auto'}
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            justifyContent={'center'}
            gap={3}
            p={5}
          >
            <VTextField
              sx={{ backgroundColor: '#fff', borderRadius: 2 }}
              label="Nome"
              name="nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <VTextField
              sx={{ backgroundColor: '#fff', borderRadius: 2 }}
              label="Descrição"
              name="descricao"
            />
            <VTextField
              sx={{ backgroundColor: '#fff', borderRadius: 2 }}
              label="Imagem"
              name="imagem"
            />
            <AutoComplet />
          </Box>
        </VForm>
      </Box>
    </LayoutBaseDePagina>
  );
};
