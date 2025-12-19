interface FormNavigationProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  onBack,
  onNext,
  isSubmitting,
}) => {
  return (
    <div className="mt-8 flex justify-between">
      {step > 0 && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-sm hover:bg-blue-50 transition cursor-pointer"
        >
          Back
        </button>
      )}

      {step < totalSteps - 1 ? (
        <button
          type="button"
          onClick={onNext}
          className="ml-auto inline-flex items-center px-8 py-2 cursor-pointer tracking-wide bg-[#1354BE] text-white font-medium rounded-sm hover:bg-blue-700 transition"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto inline-flex items-center justify-center gap-2 px-8 py-2 tracking-wide bg-[#1354BE] text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          {isSubmitting && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {isSubmitting ? "Submitting..." : "Finish"}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
