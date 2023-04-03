import { Api } from '../axios-config'

export interface InfoProps {
  id: number
  imagemSorvetePage: string
  imagemHistoriaPage: string
  imagemLojaPage: string
  imagemSorvete1: string
  imagemSorvete2: string
  imagemSorvete3: string
  imagemHistoria: string
  imagemUnidades: string
  textoSorvete1: string
  textoSorvete2: string
  textoSorvete3: string
  toSorvete1: string
  toSorvete2: string
  toSorvete3: string
  textoHistoria: string
}

export interface ListaInfoProps {
  id: number
  imagemSorvete1: File
  imagemSorvete2: File
  imagemSorvete3: File
  imagemHistoria: File
  imagemUnidades: File
  imagemSorvetePage: File
  imagemHistoriaPage: File
  imagemLojaPage: File
  textoSorvete1: string
  textoSorvete2: string
  textoSorvete3: string
  toSorvete1: string
  toSorvete2: string
  toSorvete3: string
  textoHistoria: string
}

type InfoComTotalCount = {
  data: InfoProps[]
}

const getAll = async (): Promise<InfoComTotalCount | Error> => {
  try {
    const urlRelativa = '/info'
    const { data } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
      }
    }

    return new Error('Erro ao listar os Registros')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao Carregar',
    )
  }
}

const getById = async (id: number): Promise<ListaInfoProps | Error> => {
  try {
    const { data } = await Api.get(`/info/${id}`)

    if (data) {
      return data
    }

    return new Error('Erro ao consultar o Registro')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar',
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<ListaInfoProps>(`/info/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

export const InfoServices = {
  getAll,
  getById,
  deleteById,
}
