import axios from 'axios';
const PIXABAY_KEY = '21694115-487a2c793b7208539d5182bab'

export const fetchCountries = async ( imgName ,pageNum ) => {

    const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${imgName}&image_type=photo&page=${pageNum}&per_page=$12&image_type=photo&orientation=horizontal&`);
    return response.data.hits;
}
