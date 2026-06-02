import { ConnaissanceClient } from './connaissance-client.model';

export type ClientAsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ClientCreateState {
  status: ClientAsyncStatus;
  isSubmitting: boolean;
  createdClientId?: string;
  errorMessage?: string;
}

export interface ClientDetailState {
  status: ClientAsyncStatus;
  client: ConnaissanceClient | null;
  isRefreshing: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  deletedClientId?: string;
  errorMessage?: string;
}
