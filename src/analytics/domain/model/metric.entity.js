// MetricEntity - Analytics BC
export default class MetricEntity {
  constructor({ metricId, name, value, unit, recordedAt }) {
    this.metricId = metricId;
    this.name = name;
    this.value = value;
    this.unit = unit;
    this.recordedAt = recordedAt;
  }
}
