// analytics.store.js - Pinia store para reportes y métricas
import { defineStore } from 'pinia';
import ReportEntity from '../domain/model/report.entity.js';
import MetricEntity from '../domain/model/metric.entity.js';
import { fetchReports, fetchMetrics } from '../infrastructure/analytics-api.js';

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    reports: [],
    metrics: [],
    loading: false,
    error: null,
  }),
  actions: {
    async loadReports() {
      this.loading = true;
      try {
        const data = await fetchReports();
        this.reports = data.map(r => new ReportEntity(r));
        this.error = null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async loadMetrics() {
      this.loading = true;
      try {
        const data = await fetchMetrics();
        this.metrics = data.map(m => new MetricEntity(m));
        this.error = null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  },
});
