import { baseUrl } from "@/config";
import { ApiConfig } from "@/interface";

export const DEFAULT_API_CONFIG: ApiConfig = {
    url: baseUrl || ""
}