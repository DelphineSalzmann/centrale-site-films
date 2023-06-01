import { useCallback, useEffect, useRef, useState } from 'react';

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const SliderStyle = {
    height: '100%',
    position: 'relative',
  };
  const leftArrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0,-50%)',
    left: '32px',
    fontSize: '45px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
  };
  const rightArrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0,-50%)',
    right: '32px',
    fontSize: '45px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
  };
  const SlideStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${slides[currentIndex].url})`,
  };
  const goToPrevious = () => {
    let newIndex;
    console.log(slides.length - 1);
    if (currentIndex === 0) {
      newIndex = 2;
    } else {
      newIndex = currentIndex - 1;
    }
    setCurrentIndex(newIndex);
  };
  const goToNext = useCallback(() => {
    console.log("SLIDER :" ,currentIndex);
    let newIndex;
    if (currentIndex === 2) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]); //on définit les dépendances

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 4000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div style={SliderStyle}>
      <div style={leftArrowStyles} onClick={goToPrevious}>
        ❰
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        ❱
      </div>
      <div style={SlideStyle}></div>
    </div>
  );
};

export default ImageSlider;

//❰    &#10096     &#x2770
//❱    &#10097     &#x2771