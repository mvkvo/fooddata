import axios from 'axios';

const API_KEY = process.env.GATSBY_GOOGLE_TRANSLATE_API_KEY;
const API_URL = process.env.GATSBY_GOOGLE_TRANSLATE_API_URL;

const translateText = async (text, lang) => {
  const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
    q: text,
    target: lang,
  });
  const translated = response.data.data.translations[0]
    .translatedText as string;

  return translated;
};

export default translateText;
