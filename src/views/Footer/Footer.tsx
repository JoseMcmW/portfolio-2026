import { FooterContent } from '@/features/footer';

export const Footer = () => {
  return (
    <footer className={'h-[30vh] md:h-[45vh] xl:h-[70vh] relative bg-bg-primary overflow-hidden'}>
      <FooterContent />
    </footer>
  );
};
