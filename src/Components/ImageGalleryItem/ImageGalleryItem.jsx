import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import defaultImg from '../imagesDef/default-img.jpg';

const ImageGalleryItem = ({ imgItem, onSelect}) => {
    return (
    <li className={s.imageGalleryItem} key={imgItem.id} onClick={() => onSelect(imgItem)} > 
        <img src={imgItem.webformatURL} alt={imgItem.tags} className={s.ImageGalleryItemimage} />
    </li>
    )
}
ImageGalleryItem.defaultProps = {
    tags: " Тут би мали бути фотка...",
    webformatURL: defaultImg,
     largeImageURL: defaultImg
}

ImageGalleryItem.prototype = {
    imgItem: PropTypes.objectOf({
        largeImageURL:PropTypes.string,
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
        id: PropTypes.string.isRequired,
    }),
}
export default ImageGalleryItem;