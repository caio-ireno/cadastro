/* eslint-disable no-constant-condition */
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';
import { VTextField } from '../../shared/components/form/VTextField';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { AllTypes } from '../../shared/services/api/sorvete/AllTypes';

interface FormDataProps {
  nome: string;
  descricao: string;
  imagem: string;
  sorveteId: number;
}

export const DetalheSorveteAdm: React.FC = () => {
  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const [nome, setNome] = useState('');

  const handleSave = (dados: FormDataProps) => {
    setIsLoading(true);
    if (id === 'nova') {
      AllTypes.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/adm-page/sorvetes/${result}`);
        }
      });
    } else {
      AllTypes.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          }
        },
      );
    }
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
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvrEFechar={() => formRef.current?.submitForm()}
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
            sx={{
              backgroundColor: '#fff',
              py: 1,
              px: 2,
              border: '1px solid #1e88e5 ',
              borderRadius: 2,
            }}
          >
            Gournet = 1
          </Typography>
          <Typography
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

        <Form ref={formRef} onSubmit={handleSave}>
          <Box
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            justifyContent={'center'}
            gap={3}
            p={5}
          >
            <Box width={'100%'} display={'flex'} flexDirection="column">
              <Typography fontWeight={'bold'}>Nome</Typography>
              <VTextField
                sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                placeholder="Nome"
                name="nome"
              />
            </Box>
            <Box width={'100%'} display={'flex'} flexDirection="column">
              <Typography fontWeight={'bold'}>Descrição</Typography>
              <VTextField
                sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                placeholder="Descrição"
                name="descricao"
              />
            </Box>
            <Box width={'100%'} display={'flex'} flexDirection="column">
              <Typography fontWeight={'bold'}>Imagem</Typography>
              <VTextField
                sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                placeholder="Imagem"
                name="imagem"
              />
            </Box>
            <Box width={'100%'} display={'flex'} flexDirection="column">
              <Typography fontWeight={'bold'}>Sorvete ID</Typography>
              <VTextField
                sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                placeholder="Tipo do Sorvete"
                name="sorveteId"
              />
            </Box>
          </Box>
        </Form>
      </Box>
    </LayoutBaseDePagina>
  );
};
