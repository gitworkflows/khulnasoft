import Image from 'next/image';

const khulnasoftLoader = ({ src, width, quality }) => {
  return `${src}?width=${width}&quality=${quality || 75}`;
};

const KhulnasoftImage = props => {
  return <Image loader={khulnasoftLoader} {...props} />;
};

export default KhulnasoftImage;
