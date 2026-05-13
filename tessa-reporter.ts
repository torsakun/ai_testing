import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class TessaReporter implements Reporter {
  private apiUrl = process.env.TESSA_API_URL || '';
  private runId = process.env.TESSA_RUN_ID;

  async onTestEnd(test: TestCase, result: TestResult) {
    if (!this.runId || !this.apiUrl) return;

    // Extract Case ID from test title, assuming format: "TESSA-15: Login works"
    const match = test.title.match(/([A-Z0-9]+-[A-Za-z0-9]{4})/i);
    const caseId = match ? match[1] : null;

    if (caseId) {
      const status = result.status === 'passed' ? 'PASSED' : 
                     result.status === 'skipped' ? 'SKIPPED' : 'FAILED';
      
      const logs = result.errors.map(e => e.message).join('\n') || 'Test completed successfully.';

      try {
        await fetch(`${this.apiUrl}/api/webhooks/playwright/reporter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ runId: this.runId, caseId, status, logs })
        });
      } catch (err) {
        console.error('Failed to report to TESSA:', err);
      }
    }
  }
}
export default TessaReporter;
