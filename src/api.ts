import { ApiResponse, PlanetsResponse } from "./interfaces";

const BASE_URL = import.meta.env.VITE_API_URL;

async function fetchApi<Data>(
  url: string,
  {
    method = "GET",
    body,
    ...params
  }: { method?: string; body?: any; [key: string]: any } = {}
): Promise<ApiResponse<Data>> {
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(
    `${BASE_URL}${url}${queryParams ? `?${queryParams}` : ""}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  return response.json();
}

export async function getPlanets(
  searchString: string
): Promise<ApiResponse<PlanetsResponse>> {
  return fetchApi(`character/?name=${searchString}`);
}
