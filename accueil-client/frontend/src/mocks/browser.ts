import { setupWorker } from 'msw/browser';
import { connaissanceClientHandlers } from './handlers/connaissance-client.handlers';

export const worker = setupWorker(...connaissanceClientHandlers);
