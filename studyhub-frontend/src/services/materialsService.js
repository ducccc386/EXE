/**
 * services/materialsService.js
 */
import api from "./api";
import { API_ENDPOINTS } from "../constants";
import { MOCK_MATERIALS } from "../mock/materials.mock";

export async function getMaterials(filters = {}) {
  // TODO: return (await api.get(API_ENDPOINTS.MATERIALS, { params: filters })).data;
  return MOCK_MATERIALS;
}

export async function purchaseMaterial(materialId) {
  // TODO: return (await api.post(`${API_ENDPOINTS.MATERIALS}/${materialId}/purchase`)).data;
  console.log("[mock] purchaseMaterial", materialId);
}

export async function downloadMaterial(materialId) {
  // TODO: return (await api.get(`${API_ENDPOINTS.MATERIALS}/${materialId}/download`)).data;
  console.log("[mock] downloadMaterial", materialId);
}
