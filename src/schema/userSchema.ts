import { z } from "zod";

/**
 * STEP 1 — Personal Information
 */
export const PersonalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  other_name: z.string().optional(),

  email: z.email("Invalid email").optional().or(z.literal("")),

  phone: z.string().min(1, "Phone number is required"),
  whatsapp: z.string().optional(),

  dob: z.coerce
    .date()
    .min(new Date("1900-01-01"), "Date of birth cannot be before 1900")
    .max(new Date(), "Date of birth cannot be in the future")
    .optional(),
});

/**
 * STEP 2 — Educational Background
 * - Require programme_name if programme_id is empty
 */
export const EducationSchema = z
  .object({
    programme_id: z.string().optional().nullable(),
    programme_name: z.string().optional().nullable(),
    institution_id: z.string().optional().nullable(), // Made optional to allow manual entry
    institution_name: z.string().optional().nullable(),
    residence: z.string().optional(),
    high_school: z.string().min(1, "High school is required"),
  })
  .superRefine((data, ctx) => {
    // Programme validation: if no programme_id, programme_name is required
    if (
      !data.programme_id &&
      (!data.programme_name || data.programme_name.trim() === "")
    ) {
      ctx.addIssue({
        path: ["programme_name"],
        code: "custom",
        message: "Please enter a programme name if no programme is selected",
      });
    }

    // Institution validation: if no institution_id, institution_name is required
    if (
      !data.institution_id &&
      (!data.institution_name || data.institution_name.trim() === "")
    ) {
      ctx.addIssue({
        path: ["institution_name"],
        code: "custom",
        message:
          "Please enter an institution name if no institution is selected",
      });
    }
  });
/**
 * STEP 3 — Church & Family Details
 */
export const ChurchSchema = z.object({
  congregation: z.string().min(1, "Congregation is required"),
  region_id: z.string().min(1, "Region is required"),
  district_church: z.string().min(1, "Church district is required"),
  presbytery_id: z.string().min(1, "Presbytery is required"),
  guardian_name: z.string().min(1, "Guardian name is required"),
  guardian_contact: z.string().min(1, "Guardian contact is required"),
});

/**
 * Combined schema for the entire multi-step form
 */
export const MultiStepUserSchema = PersonalInfoSchema.extend(
  EducationSchema.shape
).extend(ChurchSchema.shape);

/**
 * TYPES
 * - MultiStepUserFormInput → what React Hook Form receives (strings)
 * - MultiStepUserInput → what your backend receives (Date objects)
 */
export type MultiStepUserFormInput = {
  [K in keyof z.input<typeof MultiStepUserSchema>]: z.input<
    typeof MultiStepUserSchema
  >[K];
};

export type MultiStepUserInput = z.infer<typeof MultiStepUserSchema>;
export type UserType = z.infer<typeof MultiStepUserSchema> & {
  id: number;
  programme_name: string;
  institution_name: string;
  region_name: string;
  presbytery_name: string;
};

export type UserTableProps = {
  users: UserType[];
  isLoading?: boolean;
  serverSide?: boolean;
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearchChange?: (search: string) => void;
  onInstitutionChange?: (institutionId?: string) => void;
  onPresbyteryChange?: (presbyteryId?: string) => void;
  allInstitutions?: Array<{ id: string; name: string }>;
  allPresbyteries?: Array<{ id: string; name: string }>;
  onExport?: (format: "csv" | "xlsx") => Promise<void>;
  onInstitutionSearch?: (search: string) => void;
  onPresbyterySearch?: (search: string) => void;
  isLoadingInstitutions?: boolean;
  isLoadingPresbyteries?: boolean;
};
