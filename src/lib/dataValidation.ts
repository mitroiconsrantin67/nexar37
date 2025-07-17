// Validări pentru datele din aplicație
import { ALLOWED_FEATURES, ALLOWED_BRANDS, ALLOWED_CATEGORIES } from './validations';
import { triggerError } from './footerProtection';

// Funcție pentru a valida dotările motocicletelor
export const validateFeatures = (features: string[]): boolean => {
  if (!features || !Array.isArray(features)) {
    console.error('Eroare: features nu este un array valid');
    return false;
  }

  // Verificăm dacă toate dotările sunt în lista de dotări permise
  const isValid = features.every(feature => ALLOWED_FEATURES.includes(feature));
  
  if (!isValid) {
    console.error('Eroare: Una sau mai multe dotări nu sunt permise');
    triggerError('INVALID_FEATURES');
  }
  
  return isValid;
};

// Funcție pentru a valida marca motocicletei
export const validateBrand = (brand: string): boolean => {
  if (!brand || typeof brand !== 'string') {
    console.error('Eroare: brand nu este un string valid');
    return false;
  }

  // Verificăm dacă marca este în lista de mărci permise
  const isValid = ALLOWED_BRANDS.includes(brand);
  
  if (!isValid) {
    console.error('Eroare: Marca nu este permisă');
    triggerError('INVALID_BRAND');
  }
  
  return isValid;
};

// Funcție pentru a valida categoriile
export const validateCategory = (category: { name: string, image: string }): boolean => {
  if (!category || typeof category !== 'object') {
    console.error('Eroare: category nu este un obiect valid');
    return false;
  }

  if (!category.name || !category.image) {
    console.error('Eroare: category nu are proprietățile name și image');
    return false;
  }

  // Verificăm dacă categoria este în lista de categorii permise
  const isValid = ALLOWED_CATEGORIES.some(
    allowedCategory => 
      allowedCategory.name === category.name && 
      allowedCategory.image === category.image
  );
  
  if (!isValid) {
    console.error('Eroare: Categoria nu este permisă');
    triggerError('INVALID_CATEGORY');
  }
  
  return isValid;
};

// Funcție pentru a valida categoriile
export const validateCategories = (categories: { name: string, image: string }[]): boolean => {
  if (!categories || !Array.isArray(categories)) {
    console.error('Eroare: categories nu este un array valid');
    return false;
  }

  // Verificăm dacă toate categoriile sunt valide
  const isValid = categories.every(category => validateCategory(category));
  
  if (!isValid) {
    console.error('Eroare: Una sau mai multe categorii nu sunt permise');
    triggerError('INVALID_CATEGORIES');
  }
  
  return isValid;
};

// Funcție pentru a valida datele unui anunț
export const validateListing = (listing: any): boolean => {
  if (!listing || typeof listing !== 'object') {
    console.error('Eroare: listing nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['title', 'price', 'year', 'mileage', 'location', 'category', 'brand', 'model', 'engine_capacity'];
  const hasRequiredProps = requiredProps.every(prop => listing.hasOwnProperty(prop) && listing[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Anunțul nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_PROPS');
    return false;
  }

  // Validăm marca
  if (!validateBrand(listing.brand)) {
    return false;
  }

  // Validăm dotările dacă există
  if (listing.features && !validateFeatures(listing.features)) {
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui profil
export const validateProfile = (profile: any): boolean => {
  if (!profile || typeof profile !== 'object') {
    console.error('Eroare: profile nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'email'];
  const hasRequiredProps = requiredProps.every(prop => profile.hasOwnProperty(prop) && profile[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Profilul nu are toate proprietățile obligatorii');
    triggerError('INVALID_PROFILE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui utilizator
export const validateUser = (user: any): boolean => {
  if (!user || typeof user !== 'object') {
    console.error('Eroare: user nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['id', 'email'];
  const hasRequiredProps = requiredProps.every(prop => user.hasOwnProperty(prop) && user[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Utilizatorul nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_PROPS');
    return false;
  }

  return true;
};