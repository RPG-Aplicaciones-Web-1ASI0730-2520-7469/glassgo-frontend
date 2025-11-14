// ReportEntity - Analytics BC
export default class ReportEntity {
  constructor({ reportId, title, period, metrics, generatedBy, generatedAt, userId, role }) {
    this.reportId = reportId;
    this.title = title;
    this.period = period;
    this.metrics = metrics; // Array of MetricEntity
    this.generatedBy = generatedBy;
    this.generatedAt = generatedAt;
    this.userId = userId;
    this.role = role;
  }

  summarize() {
    return `${this.title} (${this.period}) - ${this.metrics.length} métricas`;
  }

  export(format = 'json') {
    if (format === 'json') {
      return JSON.stringify(this);
    }
    // Otros formatos pueden implementarse
    return null;
  }
}
