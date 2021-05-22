import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 
const LazyImage = ({image}: any) => (
  <div style={image.container}>
    <LazyLoadImage
      alt={image.alt}
      effect="blur"
      height={'100%'}
      src={image.src} // use normal <img> attributes as props
      width={'100%'} /> 
  </div>
);
 
export default LazyImage;