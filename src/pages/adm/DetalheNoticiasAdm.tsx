/* eslint-disable no-constant-condition */
import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';
import { NoticiaServices } from '../../shared/services/api/noticias/NoticiasService';
import { VTextField } from '../../shared/components/form/VTextField';
import { useVForm } from '../../shared/components/form/useVForm';
import { VForm } from '../../shared/components/form/VForm';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as yup from 'yup';

interface FormDataProps {
  nomeNoticia: string;
  imgNoticia: string;
}

const FormValidationSchema: yup.Schema<FormDataProps> = yup.object().shape({
  nomeNoticia: yup.string().required().min(3),
  imgNoticia: yup.string().required(),
});

export const DetalheNoticiasAdm: React.FC = () => {
  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [isLoading, setIsLoading] = useState(false);
  const { formRef, IsSaveAndClose, save, saveAndClose } = useVForm();
  const [nome, setNome] = useState('');

  const handleSave = (dados: FormDataProps) => {
    FormValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        console.log('save apos then');
        setIsLoading(true);
        if (id === 'nova') {
          NoticiaServices.create(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/noticias/');
              } else {
                navigate(`/adm-page/noticias/${result}`);
              }
            }
          });
        } else {
          NoticiaServices.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (IsSaveAndClose()) {
                navigate('/adm-page/noticias/');
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
    } else {
      formRef.current?.setData({
        nomeNoticia: '',
        imgNoticia: '',
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
          aoClicarEmSalvar={save}
          aoClicarEmSalvrEFechar={saveAndClose}
        />
      }
    >
      <Box py={2} sx={{ backgroundColor: '#EAEDED' }}>
        <Box textAlign={'center'}>
          <Typography fontSize={30} fontWeight="bold">
            {id === 'nova' ? 'Criando nova Noticias' : `Editando: ${nome}`}
          </Typography>
        </Box>

        <VForm ref={formRef} onSubmit={handleSave}>
          <Box
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
              name="nomeNoticia"
              onChange={(e) => setNome(e.target.value)}
            />

            <VTextField
              sx={{ backgroundColor: '#fff', borderRadius: 2 }}
              label="Imagem"
              name="imgNoticia"
            />
          </Box>
        </VForm>
      </Box>
    </LayoutBaseDePagina>
  );
};
