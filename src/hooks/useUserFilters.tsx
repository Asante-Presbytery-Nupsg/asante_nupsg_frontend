import { useEffect, useState } from "react";

type UseUserFiltersProps = {
  serverSide: boolean;

  onSearchChange?: (search: string) => void;
  onInstitutionChange?: (institutionId?: string) => void;
  onPresbyteryChange?: (presbyteryId?: string) => void;

  debounceMs?: number;
};

export function useUserFilters({
  serverSide,
  onSearchChange,
  onInstitutionChange,
  onPresbyteryChange,
  debounceMs = 500,
}: UseUserFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [institution, setInstitution] = useState<string | undefined>();
  const [presbytery, setPresbytery] = useState<string | undefined>();

  /**
   * Debounced search (server-side only)
   */
  useEffect(() => {
    if (!serverSide || !onSearchChange) return;

    const timer = setTimeout(() => {
      onSearchChange(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, serverSide, onSearchChange, debounceMs]);

  /**
   * Institution filter sync (server-side only)
   */
  useEffect(() => {
    if (!serverSide || !onInstitutionChange) return;
    onInstitutionChange(institution);
  }, [institution, serverSide, onInstitutionChange]);

  /**
   * Presbytery filter sync (server-side only)
   */
  useEffect(() => {
    if (!serverSide || !onPresbyteryChange) return;
    onPresbyteryChange(presbytery);
  }, [presbytery, serverSide, onPresbyteryChange]);

  return {
    // values
    searchQuery,
    institution,
    presbytery,

    // setters (explicit, no ambiguity)
    setSearchQuery,
    setInstitution,
    setPresbytery,
  };
}
