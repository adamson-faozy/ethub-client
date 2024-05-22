import React, { useState } from 'react';
import './ImageSlider.css'; // Import CSS file for styling
import { Box } from '@chakra-ui/react';
import { Image } from '../../../types/messagetypes';


type ImageSliderProps = {
  images: Image[]
}
const ImageSlider = ({ images }: ImageSliderProps) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box className="slider-container" width="80%" margin="0 auto" overflow="hidden" position="relative">
      <button className="slide-btn prev" onClick={prevSlide}>&lt;</button>
      <Box className="slides" transform={`translateX(-${currentIndex * 100}%)`} display="flex" transition="transform 0.5s ease-in-out">
        {images.map((image, index) => (
          <Box className="slide" key={index} flex="0 0 auto" width="100%">
            <img src={image.image_url} alt={`Slide ${index}`} />
          </Box>
        ))}
      </Box>
      <button className="slide-btn next" onClick={nextSlide}>&gt;</button>
    </Box>
  );
};

export default ImageSlider;