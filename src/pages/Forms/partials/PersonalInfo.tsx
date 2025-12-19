import { Controller, type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/shared/date_of_birth";
import type { MultiStepUserFormInput } from "@/schema/userSchema";

interface PersonalInfoStepProps {
  formMethods: UseFormReturn<MultiStepUserFormInput>;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formMethods }) => {
  const {
    register,
    control,
    formState: { errors },
  } = formMethods;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
      <Input
        label="First Name"
        register={register("first_name", {
          required: "First name is required",
        })}
        error={errors.first_name}
        placeholder="Enter first name"
        className="h-10"
      />

      <Input
        label="Last Name"
        register={register("last_name", { required: "Last name is required" })}
        error={errors.last_name}
        placeholder="Enter last name"
        className="h-10"
      />

      <Input
        label="Other Name(s)"
        register={register("other_name")}
        error={errors.other_name}
        placeholder="Enter other names"
        className="h-10"
      />

      <Input
        label="Phone Number"
        register={register("phone", { required: "Phone number is required" })}
        error={errors.phone}
        placeholder="Enter phone number"
        className="h-10"
      />

      <Controller
        control={control}
        name="dob"
        render={({ field }) => (
          <DatePicker
            label="Date of Birth"
            placeholder="Select your date of birth"
            value={field.value as Date | null}
            onChange={field.onChange}
            error={errors.dob}
          />
        )}
      />

      <Input
        label="WhatsApp Number(Optional)"
        register={register("whatsapp")}
        error={errors.whatsapp}
        placeholder="Enter whatsapp number"
        className="h-10"
      />

      <div className="col-span-full">
        <Input
          label="Email Address (optional)"
          register={register("email")}
          error={errors.email}
          placeholder="Enter email address"
          className="h-10"
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
