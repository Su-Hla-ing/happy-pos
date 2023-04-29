interface Config {
  apiUrl: string;
}

export const config: Config = {
  apiUrl: process.env.REACT_APP_API_URL || "",
};
