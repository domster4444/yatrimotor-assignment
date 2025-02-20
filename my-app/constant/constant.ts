interface GblI {
  readonly baseURL: string;
  readonly serverURL: string;
}
export const globalConstant: GblI = {
  // serverURL: "http://localhost:5000",
  serverURL: 'https://api.yourschoolsoftware.com',
  baseURL: 'http://localhost:3000',
};
