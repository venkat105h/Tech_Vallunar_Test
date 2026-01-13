import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
   timeout: 120000,
  use: {
    trace: 'off',
    video: 'off',
    screenshot: 'only-on-failure',
    headless: false,
    
  },
  globalSetup: "src/lib/globalSetup.ts",

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] ,
      launchOptions:{args:['--deny-permission-prompts','--start-fullscreen']},
    },  
    },
  ],
});
