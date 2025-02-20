interface globalConstantInterface {
  readonly baseURL: string;
  readonly serverURL: string;
  readonly production: boolean;
  readonly baseHost?: string;
  readonly prodHost?: string;
}
export const globalConstant: globalConstantInterface = {
  // baseURL: 'https://www.yourschoolsoftware.com',
  // serverURL: 'https://www.api.yourschoolsoftware.com',

  serverURL: 'http://localhost:5000',
  baseURL: 'http://localhost:3000',

  production: false,
};

export const toastConfig = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};
