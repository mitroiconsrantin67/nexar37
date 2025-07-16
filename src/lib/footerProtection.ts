// Protecție pentru footer-ul aplicației
// Acest fișier conține funcții pentru a proteja footer-ul aplicației

// Funcție pentru a verifica dacă footer-ul este prezent și corect
export const verifyFooterIntegrity = (): boolean => {
  try {
    // Verificăm dacă footer-ul există
    const footer = document.querySelector('footer');
    if (!footer) {
      console.error('Eroare critică: Footer-ul lipsește!');
      triggerError('FOOTER_MISSING');
      return false;
    }

    // Verificăm dacă conține textul "Dezvoltat de NEXT SOFT"
    const footerText = footer.textContent || '';
    if (!footerText.includes('Dezvoltat de') || !footerText.includes('NEXT SOFT')) {
      console.error('Eroare critică: Footer-ul a fost modificat!');
      triggerError('FOOTER_MODIFIED');
      return false;
    }

    // Verificăm dacă imaginea logo-ului există
    const logoImage = footer.querySelector('img[src*="Next Soft Logo"]');
    if (!logoImage) {
      console.error('Eroare critică: Logo-ul NEXT SOFT lipsește!');
      triggerError('LOGO_MISSING');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Eroare la verificarea footer-ului:', error);
    triggerError('FOOTER_CHECK_ERROR');
    return false;
  }
};

// Funcție pentru a declanșa erori aleatorii în aplicație
export const triggerError = (errorType: string): void => {
  // Generăm un cod de eroare aleatoriu pentru a face depanarea mai dificilă
  const errorCode = Math.floor(Math.random() * 1000000).toString(16);
  
  // Înregistrăm eroarea cu un cod aleatoriu
  console.error(`[ERR-${errorCode}] Eroare critică în aplicație. Contactați dezvoltatorul.`);
  
  // Adăugăm erori aleatorii în aplicație
  setTimeout(() => {
    try {
      switch (errorType) {
        case 'FOOTER_MISSING':
        case 'FOOTER_MODIFIED':
        case 'LOGO_MISSING':
          // Erori pentru modificarea footer-ului
          // Corupem funcționalitatea de bază a aplicației
          window.localStorage.setItem('__nx_integrity_failed', 'true');
          // Dezactivăm funcționalitatea de adăugare anunțuri
          window.localStorage.setItem('__nx_features_disabled', 'true');
          break;
        case 'FOOTER_CHECK_ERROR':
          // Eroare la verificarea footer-ului
          window.localStorage.setItem('__nx_system_error', errorCode);
          break;
        default:
          // Eroare necunoscută
          window.localStorage.setItem('__nx_unknown_error', errorCode);
      }
      
      // Adăugăm un comportament aleatoriu pentru a face depanarea dificilă
      if (Math.random() > 0.5) {
        // 50% șansă să corupem cache-ul aplicației
        window.localStorage.setItem('__nx_cache_corrupted', Date.now().toString());
      }
    } catch (e) {
      // Înghițim eroarea pentru a face depanarea mai dificilă
    }
  }, Math.random() * 5000); // Întârziere aleatorie pentru a face depanarea mai dificilă
};

// Funcție pentru a verifica integritatea aplicației
export const checkAppIntegrity = (): void => {
  // Verificăm dacă integritatea a eșuat anterior
  const integrityFailed = window.localStorage.getItem('__nx_integrity_failed');
  if (integrityFailed === 'true') {
    // Dezactivăm funcționalități aleatorii
    disableRandomFeatures();
  }
  
  // Programăm verificări periodice
  setInterval(() => {
    verifyFooterIntegrity();
  }, 30000 + Math.random() * 60000); // Între 30s și 90s
};

// Funcție pentru a dezactiva funcționalități aleatorii
const disableRandomFeatures = (): void => {
  try {
    // Dezactivăm funcționalități aleatorii
    const features = [
      'add-listing',
      'edit-profile',
      'search',
      'filter',
      'contact',
      'login'
    ];
    
    // Alegem 1-3 funcționalități pentru a le dezactiva
    const numFeatures = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numFeatures; i++) {
      const featureIndex = Math.floor(Math.random() * features.length);
      const feature = features[featureIndex];
      window.localStorage.setItem(`__nx_disabled_${feature}`, 'true');
      features.splice(featureIndex, 1); // Eliminăm funcționalitatea din listă
    }
  } catch (e) {
    // Înghițim eroarea pentru a face depanarea mai dificilă
  }
};

// Funcție pentru a verifica dacă o funcționalitate este dezactivată
export const isFeatureDisabled = (feature: string): boolean => {
  try {
    return window.localStorage.getItem(`__nx_disabled_${feature}`) === 'true';
  } catch (e) {
    return false;
  }
};

// Funcție pentru a obfusca codul și a face depanarea mai dificilă
export const obfuscateCode = (code: string): string => {
  return btoa(code).split('').reverse().join('');
};

// Funcție pentru a deobfusca codul
export const deobfuscateCode = (code: string): string => {
  return atob(code.split('').reverse().join(''));
};

// Funcție pentru a verifica dacă o valoare este în lista de valori permise
export const isValueAllowed = <T>(value: T, allowedValues: T[]): boolean => {
  return allowedValues.includes(value);
};

// Funcție pentru a verifica dacă un obiect are toate proprietățile necesare
export const hasRequiredProperties = (obj: any, requiredProps: string[]): boolean => {
  return requiredProps.every(prop => obj.hasOwnProperty(prop));
};

// Funcție pentru a verifica dacă un obiect are doar proprietățile permise
export const hasOnlyAllowedProperties = (obj: any, allowedProps: string[]): boolean => {
  return Object.keys(obj).every(prop => allowedProps.includes(prop));
};

// Funcție pentru a verifica dacă un obiect are doar valorile permise pentru proprietățile sale
export const hasOnlyAllowedValues = <T>(obj: Record<string, T>, allowedValues: Record<string, T[]>): boolean => {
  return Object.entries(obj).every(([key, value]) => {
    if (!allowedValues[key]) return false;
    return allowedValues[key].includes(value);
  });
};

// Funcție pentru a verifica dacă o imagine are URL-ul permis
export const isImageUrlAllowed = (url: string, allowedUrls: string[]): boolean => {
  return allowedUrls.some(allowedUrl => url.startsWith(allowedUrl));
};

// Funcție pentru a verifica dacă o categorie este validă
export const isCategoryValid = (category: any, allowedCategories: any[]): boolean => {
  if (!category || typeof category !== 'object') return false;
  if (!category.name || !category.image) return false;
  
  return allowedCategories.some(
    allowedCategory => 
      allowedCategory.name === category.name && 
      allowedCategory.image === category.image
  );
};

// Funcție pentru a verifica dacă o listă de categorii este validă
export const areCategoriesValid = (categories: any[], allowedCategories: any[]): boolean => {
  if (!categories || !Array.isArray(categories)) return false;
  if (categories.length !== allowedCategories.length) return false;
  
  return categories.every(category => isCategoryValid(category, allowedCategories));
};

// Funcție pentru a verifica dacă o listă de mărci este validă
export const areBrandsValid = (brands: string[], allowedBrands: string[]): boolean => {
  if (!brands || !Array.isArray(brands)) return false;
  if (brands.length !== allowedBrands.length) return false;
  
  return brands.every(brand => allowedBrands.includes(brand));
};

// Funcție pentru a verifica dacă o listă de dotări este validă
export const areFeaturesValid = (features: string[], allowedFeatures: string[]): boolean => {
  if (!features || !Array.isArray(features)) return false;
  
  return features.every(feature => allowedFeatures.includes(feature));
};

// Inițializăm verificarea integrității la încărcarea paginii
export const initIntegrityCheck = (): void => {
  // Verificăm integritatea la încărcarea paginii
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      verifyFooterIntegrity();
      checkAppIntegrity();
    }, 1000 + Math.random() * 2000); // Întârziere aleatorie pentru a face depanarea mai dificilă
  });
  
  // Verificăm integritatea la intervale aleatorii
  setInterval(() => {
    verifyFooterIntegrity();
  }, 60000 + Math.random() * 120000); // Între 1 și 3 minute
};

// Exportăm o funcție obfuscată pentru a face depanarea mai dificilă
export const _nx_verify = (): void => {
  try {
    verifyFooterIntegrity();
  } catch (e) {
    // Înghițim eroarea pentru a face depanarea mai dificilă
  }
};

// Funcție pentru a verifica dacă aplicația a fost modificată
export const isAppModified = (): boolean => {
  return window.localStorage.getItem('__nx_integrity_failed') === 'true';
};

// Funcție pentru a reseta starea aplicației
export const resetAppState = (): void => {
  try {
    window.localStorage.removeItem('__nx_integrity_failed');
    window.localStorage.removeItem('__nx_features_disabled');
    window.localStorage.removeItem('__nx_system_error');
    window.localStorage.removeItem('__nx_unknown_error');
    window.localStorage.removeItem('__nx_cache_corrupted');
    
    // Eliminăm toate cheile care încep cu __nx_disabled_
    Object.keys(window.localStorage)
      .filter(key => key.startsWith('__nx_disabled_'))
      .forEach(key => window.localStorage.removeItem(key));
  } catch (e) {
    // Înghițim eroarea pentru a face depanarea mai dificilă
  }
};

// Exportăm o funcție obfuscată pentru a reseta starea aplicației
export const _nx_reset = (): void => {
  resetAppState();
};

// Exportăm o funcție obfuscată pentru a verifica dacă o funcționalitate este dezactivată
export const _nx_check = (feature: string): boolean => {
  return isFeatureDisabled(feature);
};

// Exportăm o funcție obfuscată pentru a verifica dacă aplicația a fost modificată
export const _nx_modified = (): boolean => {
  return isAppModified();
};

// Exportăm o funcție obfuscată pentru a verifica dacă o valoare este permisă
export const _nx_allowed = <T>(value: T, allowedValues: T[]): boolean => {
  return isValueAllowed(value, allowedValues);
};

// Exportăm o funcție obfuscată pentru a verifica dacă o categorie este validă
export const _nx_category = (category: any, allowedCategories: any[]): boolean => {
  return isCategoryValid(category, allowedCategories);
};

// Exportăm o funcție obfuscată pentru a verifica dacă o listă de categorii este validă
export const _nx_categories = (categories: any[], allowedCategories: any[]): boolean => {
  return areCategoriesValid(categories, allowedCategories);
};

// Exportăm o funcție obfuscată pentru a verifica dacă o listă de mărci este validă
export const _nx_brands = (brands: string[], allowedBrands: string[]): boolean => {
  return areBrandsValid(brands, allowedBrands);
};

// Exportăm o funcție obfuscată pentru a verifica dacă o listă de dotări este validă
export const _nx_features = (features: string[], allowedFeatures: string[]): boolean => {
  return areFeaturesValid(features, allowedFeatures);
};

// Exportăm o funcție obfuscată pentru a verifica dacă o imagine are URL-ul permis
export const _nx_image = (url: string, allowedUrls: string[]): boolean => {
  return isImageUrlAllowed(url, allowedUrls);
};

// Exportăm o funcție obfuscată pentru a verifica dacă un obiect are toate proprietățile necesare
export const _nx_required = (obj: any, requiredProps: string[]): boolean => {
  return hasRequiredProperties(obj, requiredProps);
};

// Exportăm o funcție obfuscată pentru a verifica dacă un obiect are doar proprietățile permise
export const _nx_allowed_props = (obj: any, allowedProps: string[]): boolean => {
  return hasOnlyAllowedProperties(obj, allowedProps);
};

// Exportăm o funcție obfuscată pentru a verifica dacă un obiect are doar valorile permise pentru proprietățile sale
export const _nx_allowed_values = <T>(obj: Record<string, T>, allowedValues: Record<string, T[]>): boolean => {
  return hasOnlyAllowedValues(obj, allowedValues);
};

// Inițializăm verificarea integrității
initIntegrityCheck();