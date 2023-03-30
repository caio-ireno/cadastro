import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface SorveteProps {
  id: number;
  tipo: string;
  sabores: {
    id: number;
    nome: string;
    imagem: string;
    descricao: string;
    sorvete_id: number;
  };
}

export interface SorveteTypeProps {
  id: number;
  tipo: string;
}

export interface ListaSorveteProps {
  id: number;
  nome: string;
  imagem: string;
  descricao: string;
  sorvete_id: number;
}

type SorveteComTotalCount = {
  data: SorveteProps[];
  totalCount: number;
};

type SaboresComTotalCount = {
  data: {
    data: ListaSorveteProps[];
  };
};

const getAll = async (page = 1): Promise<SorveteComTotalCount | Error> => {
  try {
    const urlRelativa = `/sorvetes?&_page=${page}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_LINHAS,
        ),
      };
    }

    return new Error("Erro ao listar os Registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao Carregar",
    );
  }
};

const getAllSabores = async (
  page = 1,
): Promise<SaboresComTotalCount | Error> => {
  try {
    const urlRelativa = `/sabores?page=${page}`;
    const { data } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
      };
    }

    return new Error("Erro ao listar os Registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao Carregar",
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<ListaSorveteProps>(`/sabores/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar",
    );
  }
};

const getById = async (id: number): Promise<ListaSorveteProps | Error> => {
  try {
    const { data } = await Api.get(`/sabores/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o Registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar",
    );
  }
};

const create = async (
  dados: Omit<ListaSorveteProps, "id">,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ListaSorveteProps>("/sabores", dados); //Dessa forma eu consigo dizer qqual dado esta retornando

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o Registro");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao criar");
  }
};

const updateById = async (
  id: number,
  dados: ListaSorveteProps,
): Promise<void | Error> => {
  try {
    await Api.put(`/sabores/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar",
    );
  }
};

/////////////////// TIPOS SORVETE /////////////////

const deleteTypeById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<SorveteTypeProps>(`/sorvetes/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar",
    );
  }
};

const getTypeById = async (id: number): Promise<SorveteTypeProps | Error> => {
  try {
    const { data } = await Api.get(`/sorvetes/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o Registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar",
    );
  }
};

const createType = async (
  dados: Omit<SorveteTypeProps, "id">,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<SorveteTypeProps>("/sorvetes", dados); //Dessa forma eu consigo dizer qqual dado esta retornando

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o Registro");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao criar");
  }
};

const updateTypeById = async (
  id: number,
  dados: SorveteTypeProps,
): Promise<void | Error> => {
  try {
    await Api.put(`/sorvetes/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar",
    );
  }
};

export const AllTypes = {
  getAll,
  deleteById,
  deleteTypeById,
  getAllSabores,
  getById,
  create,
  updateById,
  getTypeById,
  createType,
  updateTypeById,
};
