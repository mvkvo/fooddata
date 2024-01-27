import axios from 'axios';

const API_KEY = process.env.GATSBY_GOOGLE_TRANSLATE_API_KEY;
const API_URL = process.env.GATSBY_GOOGLE_TRANSLATE_API_URL;

const translateText = async (text, lang) => {
  return axios
    .post(`${API_URL}?key=${API_KEY}`, {
      q: text,
      target: lang,
    })
    .then((res) => res.data.data.translations[0].translatedText);
};

export default translateText;
