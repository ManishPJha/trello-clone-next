import axios from "axios";
import { checkEnvironment } from "@/utils/checkEnvironment";

export const API = axios.create({
  baseURL: checkEnvironment(),
});
