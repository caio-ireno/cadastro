import { Environment } from '../../../environment'
import { Api } from '../axios-config'

export interface ImageProps {
  id: number
  imgbase: string
}

export interface ListaImageProps {
  id: number
  imgbase: string
}

type ImageComTotalCount = {
  data: ImageProps[]
  totalCount: number
}

const getAll = async (filter = ''): Promise<ImageComTotalCount | Error> => {
  try {
    const urlRelativa = `/image-base?&nomeNoticia_like=${filter}`
    const { data, headers } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMITE_LINHAS,
        ),
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

const getById = async (id: number): Promise<ListaImageProps | Error> => {
  try {
    const { data } = await Api.get(`/noticias/${id}`)

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

const create = async (
  dados: Omit<ListaImageProps, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ListaImageProps>('/noticias', dados) //Dessa forma eu consigo dizer qqual dado esta retornando

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar o Registro')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao criar')
  }
}

const updateById = async (
  id: number,
  dados: ListaImageProps,
): Promise<void | Error> => {
  try {
    await Api.put(`/noticias/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar',
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<ListaImageProps>(`/noticias/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

export const ImageService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
