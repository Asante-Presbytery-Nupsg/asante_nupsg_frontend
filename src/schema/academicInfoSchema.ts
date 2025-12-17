import { z } from "zod";

// Schemas for Academic Info entities
export const ProgrammeSchema = z.object({
  id: z.number(),
  duration: z.number(),
  college_id: z.number(),
  name: z.string(),
});

export const RegionsSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const InstitutionsSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const PresbyteriesSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// --- Paginated Response Schemas ---

export const PaginatedProgrammesResponseSchema = z.object({
  programmes: z.array(ProgrammeSchema),
  totalItems: z.number().int(),
  totalPages: z.number().int(),
  currentPage: z.number().int(),
  pageSize: z.number().int(),
});

export const PaginatedRegionsResponseSchema = z.object({
  regions: z.array(RegionsSchema),
  totalItems: z.number().int(),
  totalPages: z.number().int(),
  currentPage: z.number().int(),
  pageSize: z.number().int(),
});

export const PaginatedInstitutionsResponseSchema = z.object({
  institutions: z.array(InstitutionsSchema),
  totalItems: z.number().int(),
  totalPages: z.number().int(),
  currentPage: z.number().int(),
  pageSize: z.number().int(),
});

export const PaginatedPresbyteriesResponseSchema = z.object({
  presbyteries: z.array(PresbyteriesSchema),
  totalItems: z.number().int(),
  totalPages: z.number().int(),
  currentPage: z.number().int(),
  pageSize: z.number().int(),
});
// --- Get Params Schemas ---

export const GetProgrammesParamsSchema = z.object({
  pageIndex: z.number().int().min(0),
  pageSize: z.number().int().min(1),
  globalFilter: z.string().optional(),
});

export const GetPresbyteriesParamsSchema = z.object({
  pageIndex: z.number().int().min(0),
  pageSize: z.number().int().min(1),
  globalFilter: z.string().optional(),
});

export const GetInstitutionsParamsSchema = z.object({
  pageIndex: z.number().int().min(0),
  pageSize: z.number().int().min(1),
  globalFilter: z.string().optional(),
});

// --- Types ---

export type Programme = z.infer<typeof ProgrammeSchema>;
export type Regions = z.infer<typeof RegionsSchema>;
export type Institutions = z.infer<typeof InstitutionsSchema>;
export type Presbyteries = z.infer<typeof PresbyteriesSchema>;

export type PaginatedProgrammesResponse = z.infer<
  typeof PaginatedProgrammesResponseSchema
>;
export type GetProgrammesParams = z.infer<typeof GetProgrammesParamsSchema>;
export type GetInstitutionsParams = z.infer<typeof GetInstitutionsParamsSchema>;
export type GetPresbyteriesParams = z.infer<typeof GetPresbyteriesParamsSchema>;

export type PaginatedInstitutionsResponse = z.infer<
  typeof PaginatedInstitutionsResponseSchema
>;
export type PaginatedPresbyteriesResponse = z.infer<
  typeof PaginatedPresbyteriesResponseSchema
>;
export type PaginatedRegionsResponse = z.infer<
  typeof PaginatedRegionsResponseSchema
>;
