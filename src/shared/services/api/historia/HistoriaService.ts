import { Api } from '../axios-config'

export interface TextoProps {
  id: number
  texto: string
}

type TextoComTotalCount = {
  data: TextoProps[]
}

const getAll = async (filter = ''): Promise<TextoComTotalCount | Error> => {
  try {
    const urlRelativa = `/image-base?&nomeNoticia_like=${filter}`
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

const updateById = async (
  id: number,
  dados: TextoProps,
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
    await Api.delete<TextoProps>(`/noticias/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

export const ImageService = {
  getAll,
  updateById,
  deleteById,
}
