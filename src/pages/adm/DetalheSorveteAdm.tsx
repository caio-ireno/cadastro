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
      <Box width="100%" textAlign={'center'}>
        <Typography fontSize={30} fontWeight="bold">
          {id === 'nova' ? 'Criando novo Sorvete' : `Editando: ${nome}`}
        </Typography>
      </Box>

      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome" name="nome" />
        <VTextField placeholder="Descrição" name="descricao" />
        <VTextField placeholder="Imagem" name="imagem" />
        <VTextField placeholder="Tipo do Sorvete" name="sorveteId" />
      </Form>
    </LayoutBaseDePagina>
  );
};
