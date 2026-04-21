export const scrollToContact = () => {
  const el = document.getElementById('contact-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  
};
