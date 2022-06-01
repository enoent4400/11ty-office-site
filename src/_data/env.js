const environment = process.env.ELEVENTY_ENV;
const PROD_ENV = 'prod';
const prodUrl = 'https://kplaw.rs';
const devUrl = 'http://localhost:8080';
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl;
const isProd = environment === PROD_ENV;

const folder = {
  assets: 'assets',
};

const dir = {
  img: `/${folder.assets}/images/`,
}



module.exports = {
  environment,
  isProd,
  folder,
  base: {
    site: baseUrl,
    img: `${baseUrl}${dir.img}`,
  },
	tracking: {
    gtag: 'G-X19FYFPHTY',
  },
};