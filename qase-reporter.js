// qase-reporter.js
const fetch = require('node-fetch'); // ถ้าใช้ Node รุ่นเก่า ต้องรัน npm install node-fetch ด้วยครับ

class QaseReporter {
  constructor(options) {
    this.runId = process.env.QASE_RUN_ID;
    this.webhookUrl = process.env.QASE_WEBHOOK_URL;
  }

  async onTestEnd(test, result) {
    if (!this.runId || !this.webhookUrl) return;

    // อ่าน Case ID จากชื่อไฟล์ (เช่น QA-065c-xxx.spec.ts)
    const match = test.location.file.match(/([A-Z0-9]+-[a-f0-9]{4})-/i);
    if (!match) return; // ถ้าชื่อไฟล์ไม่มี ID แปลว่าไม่ใช่เทสที่สั่งจากระบบเรา ให้ข้ามไปเลย
    
    const caseId = match[1];
    
    const payload = {
      runId: this.runId,
      caseId: caseId,
      status: result.status === 'passed' ? 'PASSED' : 'FAILED',
      logs: result.error ? result.error.message + '\n\n' + result.error.stack : 'Test passed successfully.'
    };

    try {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log(`✅ Reported status for Case ${caseId} to Qase.`);
    } catch (error) {
      console.error(`❌ Failed to report to Qase:`, error);
    }
  }
}

module.exports = QaseReporter;
