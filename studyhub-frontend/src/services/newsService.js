/**
 * services/newsService.js
 */
import api from "./api";
import { API_ENDPOINTS } from "../constants";
import { MOCK_NEWS } from "../mock/news.mock";

export async function getNews() {
  // TODO: return (await api.get(API_ENDPOINTS.NEWS)).data;
  return MOCK_NEWS;
}
