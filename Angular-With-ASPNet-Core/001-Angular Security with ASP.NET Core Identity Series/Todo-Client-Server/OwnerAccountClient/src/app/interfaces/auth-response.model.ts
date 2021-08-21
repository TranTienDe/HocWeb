export interface AuthResponse {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
  is2StepVerificationRequired: boolean;
  provider: string;
}
