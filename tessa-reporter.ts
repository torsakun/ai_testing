import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class TessaReporter implements Reporter {
  private apiUrl = process.env.TESSA_API_URL || '';
  private runId = process.env.TESSA_RUN_ID;

  async onTestEnd(test: TestCase, result: TestResult) {
    if (!this.runId || !this.apiUrl) return;

    // Extract Case ID from test title or file name
    const filename = test.location.file.split(/[\\/]/).pop() || '';
    const match = test.title.match(/([A-Z0-9]+-[A-Za-z0-9]{4})/i) || 
                  filename.match(/([A-Z0-9]+-[A-Za-z0-9]{4})/i);
    const caseId = match ? match[1] : null;

    if (caseId) {
      const status = result.status === 'passed' ? 'PASSED' : 
                     result.status === 'skipped' ? 'SKIPPED' : 'FAILED';
      
      const logs = result.errors.map(e => e.message).join('\n') || 'Test completed successfully.';

      console.log(`[TessaReporter] Reporting ${caseId} as ${status} to ${this.apiUrl}...`);
      try {
        const res = await fetch(`${this.apiUrl}/api/webhooks/playwright/reporter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ runId: this.runId, caseId, status, logs })
        });
        const resBody = await res.text();
        if (!res.ok) {
          console.error(`[TessaReporter] Error ${res.status}: ${resBody}`);
        } else {
          console.log(`[TessaReporter] Success: ${resBody}`);
        }
      } catch (err) {
        console.error(`[TessaReporter] Failed to report to TESSA:`, err);
      }
    } else {
      console.log(`[TessaReporter] Could not find caseId in title: "${test.title}" or file: "${test.location.file}"`);
    }
  }
}
export default TessaReporter;
