import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface HistoriaProps{
  id:number
  p1: string;
  p2:string;
  img1:string;
  img2:string;
  img3:string;
  img4:string;
  img5:string;
}

export interface ListaHistoriaProps{
  id:number
  p1: string;
  p2:string;
  img1:string;
  img2:string;
  img3:string;
  img4:string;
  img5:string;
}

type HistoriaComTotalCount = {
  data: HistoriaProps[];
  totalCount: number;
}

const getAll = async ( filter=''): Promise<HistoriaComTotalCount | Error> => {
  try{
    const urlRelativa=`/historia?&nomeNoticia_like=${filter}`;
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

const getById = async (id:number): Promise<ListaHistoriaProps | Error> => {
  try{
    const {data} = await Api.get(`/noticias/${id}`);

    if(data){
      return data;
    }

    return new Error('Erro ao consultar o Registro');
  } catch (error){
    console.error(error);
    return new Error((error as {message:string}).message || 'Erro ao consultar');
  }
};

const create = async (dados:Omit<ListaHistoriaProps, 'id'>): Promise<number | Error> => {
  try{
    const {data} = await Api.post<ListaHistoriaProps>('/noticias', dados); //Dessa forma eu consigo dizer qqual dado esta retornando

    if(data){
      return data.id;
    }

    return new Error('Erro ao criar o Registro');
  } catch (error){
    console.error(error);
    return new Error((error as {message:string}).message || 'Erro ao criar');
  }
};

const updateById = async (id:number, dados:ListaHistoriaProps): Promise<void | Error> => {
  try{
    await Api.put(`/noticias/${id}`, dados); 

  } catch (error){
    console.error(error);
    return new Error((error as {message:string}).message || 'Erro ao atualizar');
  }
};

const deleteById = async (id:number): Promise<void | Error> => {
  try{
    await Api.delete<ListaHistoriaProps>(`/noticias/${id}`); 

  } catch (error){
    console.error(error);
    return new Error((error as {message:string}).message || 'Erro ao apagar');
  }
};

export const HistoriaService ={
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};