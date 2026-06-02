import { setupWorker } from 'msw/browser';
import { connaissanceClientHandlers } from './handlers/connaissance-client.handlers';
import { connaissanceClientManagementHandlers } from './handlers/connaissance-client-management.handlers';

export const worker = setupWorker(...connaissanceClientHandlers, ...connaissanceClientManagementHandlers);
