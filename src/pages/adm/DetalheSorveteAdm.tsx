import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { AllTypes } from '../../shared/services/api/sorvete/AllTypes';

interface DetalheSorveteAdmProps {
  nome?: string;
}

export const DetalheSorveteAdm: React.FC<DetalheSorveteAdmProps> = () => {
  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

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
          console.log(result);
        }
      });
    }
  }, [id]);

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
          // aoClicarEmSalvar={() => {}}
          //aoClicarEmSalvrEFechar={() => navigate('/adm-page/sorvete')}
        />
      }
    >
      <Box width="100%" textAlign={'center'}>
        <Typography fontSize={30} fontWeight="bold">
          {id === 'nova' ? 'Criando novo Sorvete' : `Editando: ${nome}`}
        </Typography>
      </Box>
    </LayoutBaseDePagina>
  );
};
