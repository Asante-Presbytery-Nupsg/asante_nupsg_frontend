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
 */
export const EducationSchema = z.object({
  programme_id: z.string().min(1, "Program is required"),
  institution_id: z.string().min(1, "Institution is required"),
  district_institution: z.string().min(1, "District is required"),
  high_school: z.string().min(1, "High school is required"),
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

// This is what RHF receives (before coercion)
export type MultiStepUserFormInput = {
  [K in keyof z.input<typeof MultiStepUserSchema>]: z.input<
    typeof MultiStepUserSchema
  >[K];
};

// This is after Zod validation (converted types, Date for dob)
export type MultiStepUserInput = z.infer<typeof MultiStepUserSchema>;
