export async function getProducts() {
  const response = await fetch('./data/products.json');
  if (!response.ok) {
    throw new Error(`No se pudo cargar el catálogo (HTTP ${response.status}).`);
  }
  return response.json();
}