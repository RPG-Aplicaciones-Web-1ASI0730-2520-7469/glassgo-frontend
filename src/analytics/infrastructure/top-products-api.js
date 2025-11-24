// analytics-api.js (extensión)
// Obtener productos más pedidos para un distribuidor y mes
export async function fetchTopProducts({ userId, month, year, top = 3 }) {
  // Obtener historial de pedidos del distribuidor
  const res = await fetch('/api/v1/history');
  if (!res.ok) throw new Error('Error al cargar historial');
  const data = await res.json();

  // Filtrar por userId y mes/año
  const filtered = data.filter(h => 
    String(h.userId) === String(userId) &&
    new Date(h.createdAt).getMonth() + 1 === month &&
    new Date(h.createdAt).getFullYear() === year
  );

  // Agrupar por producto
  const productMap = {};
  filtered.forEach(h => {
    if (!productMap[h.product]) {
      productMap[h.product] = 0;
    }
    productMap[h.product] += h.quantity;
  });

  // Convertir a array y ordenar
  const ranked = Object.entries(productMap)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, top);

  return ranked;
}
