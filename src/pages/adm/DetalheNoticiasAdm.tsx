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
import { NoticiaServices } from '../../shared/services/api/noticias/NoticiasService';
import { AllTypes } from '../../shared/services/api/sorvete/AllTypes';

interface FormDataProps {
  nomeNoticia: string;
  imgNoticia: string;
}

export const DetalheNoticiasAdm: React.FC = () => {
  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const [nome, setNome] = useState('');

  const handleSave = (dados: FormDataProps) => {
    setIsLoading(true);
    if (id === 'nova') {
      NoticiaServices.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/adm-page/noticias/${result}`);
        }
      });
    } else {
      NoticiaServices.updateById(Number(id), { id: Number(id), ...dados }).then(
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
      NoticiaServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro Apagado com sucesso');
          navigate('/adm-page/noticias');
        }
      });
    }
  };

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      NoticiaServices.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/adm-page/noticias');
        } else {
          setNome(result.nomeNoticia);
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
          aoClicarEmNovo={() => navigate('/adm-page/noticias/nova')}
          aoClicarEmVoltar={() => navigate('/adm-page/noticias')}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvrEFechar={() => formRef.current?.submitForm()}
        />
      }
    >
      <Box py={2} sx={{ backgroundColor: '#EAEDED' }}>
        <Box textAlign={'center'}>
          <Typography fontSize={30} fontWeight="bold">
            {id === 'nova' ? 'Criando nova Noticias' : `Editando: ${nome}`}
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
                name="nomeNoticia"
              />
            </Box>

            <Box width={'100%'} display={'flex'} flexDirection="column">
              <Typography fontWeight={'bold'}>Imagem</Typography>
              <VTextField
                sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                placeholder="Imagem"
                name="imgNoticia"
              />
            </Box>
          </Box>
        </Form>
      </Box>
    </LayoutBaseDePagina>
  );
};
