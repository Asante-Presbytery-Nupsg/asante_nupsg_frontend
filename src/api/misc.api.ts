import type {
  GetInstitutionsParams,
  GetProgrammesParams,
  PaginatedInstitutionsResponse,
  PaginatedProgrammesResponse,
  PaginatedRegionsResponse,
  Programme,
} from "../schema/academicInfoSchema";
import { BASE_API } from "./base";

export const getProgrammes = async ({
  pageIndex,
  pageSize,
  globalFilter = "",
}: GetProgrammesParams): Promise<PaginatedProgrammesResponse> => {
  try {
    const page = pageIndex + 1;

    // Assuming the raw response type from Axios is { status: string, programmes: Programme[], meta: { ... } }
    interface ServerProgrammesResponse {
      status: string;
      programmes: PaginatedProgrammesResponse["programmes"];
      meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
      };
    }

    const response = await BASE_API.get<ServerProgrammesResponse>(
      "/programmes",
      {
        params: {
          search: globalFilter || undefined,
          page,
          limit: pageSize,
        },
      }
    );

    const data = response.data;

    return {
      programmes: data.programmes ?? [],
      totalItems: data.meta.totalItems ?? 0,
      totalPages: data.meta.totalPages ?? 0,
      currentPage: data.meta.currentPage ?? page,
      pageSize: data.meta.pageSize ?? pageSize,
    };
  } catch (error) {
    console.error("Failed to fetch programmes:", error);
    throw error;
  }
};

export const addProgramme = async (
  programme: Programme
): Promise<Programme> => {
  try {
    const response = await BASE_API.post<Programme>("/programmes", programme);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to add Programme:", error.message);
    } else {
      console.error("Unexpected error while adding Programme:", error);
    }
    throw error;
  }
};

export const getRegions = async ({
  pageIndex,
  pageSize,
  globalFilter = "",
}: GetProgrammesParams): Promise<PaginatedRegionsResponse> => {
  try {
    const page = pageIndex + 1;

    const response = await BASE_API.get<PaginatedRegionsResponse>("/regions", {
      params: {
        search: globalFilter || undefined,
        page,
        limit: pageSize,
      },
    });

    // Safety: ensure we always return expected shape
    const data = response.data;

    return {
      regions: data.regions ?? [],
      totalItems: data.totalItems ?? 0,
      totalPages: data.totalPages ?? 0,
      currentPage: data.currentPage ?? page,
      pageSize: data.pageSize ?? pageSize,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch regions:", error.message);
    } else {
      console.error("Unexpected error while fetching regions:", error);
    }
    throw error;
  }
};

export const getInstitutions = async ({
  pageIndex,
  pageSize,
  globalFilter = "",
}: GetInstitutionsParams): Promise<PaginatedInstitutionsResponse> => {
  try {
    const page = pageIndex + 1;

    const response = await BASE_API.get<PaginatedInstitutionsResponse>(
      "/institutions",
      {
        params: {
          search: globalFilter || undefined,
          page,
          limit: pageSize,
        },
      }
    );

    // Safety: ensure we always return expected shape
    const data = response.data;

    return {
      institutions: data.institutions ?? [],
      totalItems: data.totalItems ?? 0,
      totalPages: data.totalPages ?? 0,
      currentPage: data.currentPage ?? page,
      pageSize: data.pageSize ?? pageSize,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch regions:", error.message);
    } else {
      console.error("Unexpected error while fetching regions:", error);
    }
    throw error;
  }
};
