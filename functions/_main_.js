const axios = require('axios');
const lib = require('lib')({ token: process.env.STDLIB_LIBRARY_TOKEN });
/**
* Send the Astronomy Picture of the Day (APoD) to [number]
* @param {string} number
*/
module.exports = async (number) => {
  const { url: imageUrl } = (await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`)).data;
  const { title, content } = (await axios.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')).data[0];
  const quote = `"${content.replace(/<\W?\w{1,}\W?>/g, '').replace(/(&#8217;)/, `'`).trim()}" \n\n - ${title}`;
  return lib.utils.mms({ to: number, mediaUrl: imageUrl });
};