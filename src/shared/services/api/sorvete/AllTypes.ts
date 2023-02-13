import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface SorveteProps{
  tipo:string;
  sabores: SaboresProps[];
 
}

export interface SaboresProps{
  nome:string;
  imagem: string;
  descricao:string;
  
 }

type SorveteComTotalCount = {
  data: SorveteProps[];
  totalCount: number;
}

const getAll = async (): Promise<SorveteComTotalCount | Error> => {
  try{
    const urlRelativa='/sorvetes';
    const {data, headers} = await Api.get(urlRelativa);

    if(data){
      return {
        data,
        totalCount:Number(headers['x-total-count'] || Environment.LIMITE_LINHAS),
      };
    }

    return new Error('Erro ao listar os Registros');
  } catch (error){
    console.error(error);
    return new Error((error as {message:string}).message || 'Erro ao Carregar');
  }
};



export const AllTypes ={
  getAll,
};