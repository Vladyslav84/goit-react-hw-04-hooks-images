import React, { useState, useEffect } from 'react';
import Container from './Components/Container/Container';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery'
// import ImageGalleryItem from './Components/ImageGalleryItem/ImageGalleryItem'
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
import Loader from "react-loader-spinner";
import s from './App.module.css';
import { fetchCountries } from './Components/Api/api'

function App() {


  const [imgGallery, setImgGallery] = useState([]);
  const [imgName, setImgName] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [selectedObg, setSelectedObg] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);


  // console.log(imgGallery.length);
  //           if (imgGallery.length === 0 && status === 'resolved') {
  //     // alert(`Sorry, we did not find such pictures ${imgName}`)
  //     // setStatus('idle')
  //             console.log('eeeeeeeeeeee')

  //   };

  useEffect(() => {
    if (status === 'pending')
    {
      try
      {
        const getImg = async () => {
          const response = await fetchCountries(imgName, pageNum);

          if (response.length === 0)
          {
            setStatus('reject')
            alert(`Sorry, we did not find such pictures ${ imgName }`)

          } else
          {
            setStatus('resolved')
          };
          return response;
        }
        getImg()
          .then(NewImgGallery =>
            setImgGallery(prevState =>
              [...prevState, ...NewImgGallery])
          )
      } catch {
        alert(`Pixabay is dead`)
        setStatus('error');
        setError('error')
      }
    }

  }, [pageNum, imgName]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  })

  function searchBarInputValueHandler(InputValue) {
    if (InputValue.trim() !== '')
    {
      setImgName(InputValue);
      setStatus("pending");

    }
    if (imgName !== InputValue)
    {
      setImgGallery([]);
      setPageNum(1);
    }
  };

  function loadMoreBtnHandler() {
    setPageNum(prevPagenum => prevPagenum + 1);
    setStatus("pending")
  };

  function handleSelectObg(obg) {
    setSelectedObg(obg);
    setStatus("resolved")
  }

  function toggleMdl(evt) {
    setSelectedObg(null);

  };
  return (
    <Container>
      <SearchBar onSubmit={searchBarInputValueHandler} />
      <ImageGallery
        imgArr={imgGallery}
        onSelect={handleSelectObg}
      >
      </ImageGallery>
      {status === 'resolved' && <Button onLoadMore={loadMoreBtnHandler} />}

      {selectedObg && <Modal onClose={toggleMdl} >
        <img src={selectedObg.largeImageURL} alt={selectedObg.largeImageURL} />
        <button
          type='button'
          onClick={toggleMdl}
        >Close</button>
      </Modal>}

      {status === 'pending' &&
        <div className={s.loader}>
          <Loader
            type="Puff"
            color="#a2cce3"
            height={400}
            width={400}
          />
          <p className={s.p}>Loading...</p>
        </div>
      }

    </Container>

  );

}

export default App;

