import logoImg from '../assets/logo.png';

type LogoProps = {
  /**
   * Optional source of the logo SVG or image to render
   */
  src?: string;
  /**
   * Accessible alt text for the logo
   */
  alt?: string;
};

/**
 * Generic Logo component that renders a single image variant.
 */
export default function Logo({ src = logoImg, alt = 'Logo' }: LogoProps) {
  return (
    <a href="/" className="flex items-center">
      <img
        src={src}
        alt={alt}
        draggable="false"
        className="h-8 w-auto" // adjust sizing as needed
      />
    </a>
  );
}