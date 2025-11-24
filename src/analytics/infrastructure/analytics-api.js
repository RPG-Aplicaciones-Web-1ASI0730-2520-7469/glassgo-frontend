// analytics-api.js - Llamadas a endpoints de reportes y métricas

// Endpoints reales usando json-server
export async function fetchReports() {
  const res = await fetch('/api/analyticsReports');
  if (!res.ok) throw new Error('Error al cargar reportes');
  const data = await res.json();
  // Adaptar a la estructura del entity
  return data.map(r => ({
    reportId: r.id,
    role: r.role,
    userId: r.userId,
    title: r.title,
    period: r.period || '',
    metrics: r.metrics || [],
    generatedBy: r.generatedBy,
    generatedAt: r.generatedAt
  }));
}

export async function fetchMetrics() {
  const res = await fetch('/analytics/metrics');
  if (!res.ok) throw new Error('Error al cargar métricas');
  return await res.json();
}
