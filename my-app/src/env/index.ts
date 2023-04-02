const REMOTE_HOST_NAME: string = process.env.REACT_APP_BASE_URL as string;
console.log("3223 ", REMOTE_HOST_NAME);

const APP_ENV = {
  REMOTE_HOST_NAME: REMOTE_HOST_NAME,
};

export { APP_ENV };
