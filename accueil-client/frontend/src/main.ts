import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { worker } from './mocks/browser';

async function startApp(): Promise<void> {
  if (globalThis.window !== undefined) {
    await worker.start({
      onUnhandledRequest: 'bypass'
    });
  }

  await bootstrapApplication(App, appConfig);
}

startApp().catch((err) => console.error(err));
