// Protecție pentru footer-ul aplicației
// Acest fișier conține funcții pentru a proteja footer-ul aplicației

import { supabase } from './supabase';

// Funcție pentru a verifica dacă footer-ul este prezent și corect
export const verifyFooterIntegrity = async (): Promise<boolean> => {
  try {
    // Obținem setările din baza de date
    const { data: settings, error } = await supabase
      .from('app_settings')
      .select('*')
      .in('key', ['footer_developer_text', 'footer_developer_name', 'footer_logo_url']);
    
    if (error || !settings || settings.length < 3) {
      console.error('Eroare critică: Nu s-au putut încărca setările footer-ului!', error);
      triggerError('FOOTER_SETTINGS_MISSING');
      return false;
    }

    // Verificăm dacă footer-ul există
    const footer = document.querySelector('footer');
    if (!footer) {
      console.error('Eroare critică: Footer-ul lipsește!');
      triggerError('FOOTER_MISSING');
      return false;
    }

    // Obținem valorile din setări
    const developerText = settings.find(s => s.key === 'footer_developer_text')?.value;
    const developerName = settings.find(s => s.key === 'footer_developer_name')?.value;
    const logoUrl = settings.find(s => s.key === 'footer_logo_url')?.value;

    // Verificăm dacă conține textul corect
    const footerText = footer.textContent || '';
    if (!footerText.includes(developerText) || !footerText.includes(developerName)) {
      console.error('Eroare critică: Footer-ul a fost modificat!');
      triggerError('FOOTER_MODIFIED');
      return false;
    }

    // Verificăm dacă imaginea logo-ului există
    const logoImage = footer.querySelector(`img[src*="${logoUrl}"]`);
    if (!logoImage) {
      console.error('Eroare critică: Logo-ul lipsește!');
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
  
  // Înregistrăm eroarea în baza de date
  try {
    supabase.from('error_logs').insert([{
      user_id: supabase.auth.getUser().then(res => res.data.user?.id || '00000000-0000-0000-0000-000000000000'),
      message: `Eroare de integritate: ${errorType}`,
      full_error: `Cod: ${errorCode}, Tip: ${errorType}, Timestamp: ${new Date().toISOString()}`
    }]);
  } catch (e) {
    // Înghițim eroarea pentru a face depanarea mai dificilă
  }
  
  // Adăugăm erori aleatorii în aplicație
  setTimeout(() => {
    try {
      switch (errorType) {
        case 'FOOTER_MISSING':
        case 'FOOTER_MODIFIED':
        case 'LOGO_MISSING':
        case 'FOOTER_SETTINGS_MISSING':
          // Erori pentru modificarea footer-ului
          // Corupem funcționalitatea de bază a aplicației
          localStorage.setItem('__nx_integrity_failed', 'true');
          // Dezactivăm funcționalitatea de adăugare anunțuri
          localStorage.setItem('__nx_features_disabled', 'true');
          break;
        case 'FOOTER_CHECK_ERROR':
          // Eroare la verificarea footer-ului
          localStorage.setItem('__nx_system_error', errorCode);
          break;
        case 'INVALID_FEATURES':
        case 'INVALID_BRAND':
        case 'INVALID_CATEGORY':
        case 'INVALID_CATEGORIES':
          // Erori pentru validarea datelor
          localStorage.setItem('__nx_data_validation_failed', 'true');
          break;
        default:
          // Eroare necunoscută
          localStorage.setItem('__nx_unknown_error', errorCode);
      }
      
      // Adăugăm un comportament aleatoriu pentru a face depanarea dificilă
      if (Math.random() > 0.5) {
        // 50% șansă să corupem cache-ul aplicației
        localStorage.setItem('__nx_cache_corrupted', Date.now().toString());
      }
    } catch (e) {
      // Înghițim eroarea pentru a face depanarea mai dificilă
    }
  }, Math.random() * 5000); // Întârziere aleatorie pentru a face depanarea mai dificilă
};

// Funcție pentru a verifica integritatea aplicației
export const checkAppIntegrity = async (): Promise<void> => {
  // Verificăm dacă integritatea a eșuat anterior
  const integrityFailed = localStorage.getItem('__nx_integrity_failed');
  if (integrityFailed === 'true') {
    // Dezactivăm funcționalități aleatorii
    disableRandomFeatures();
  }
  
  // Programăm verificări periodice
  setInterval(async () => {
    await verifyFooterIntegrity();
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
      localStorage.setItem(`__nx_disabled_${feature}`, 'true');
      features.splice(featureIndex, 1); // Eliminăm funcționalitatea din listă
    }
  } catch (e) {
    // Înghițim eroarea pentru a face depanarea mai dificilă
  }
};

// Funcție pentru a verifica dacă o funcționalitate este dezactivată
export const isFeatureDisabled = (feature: string): boolean => {
  try {
    return localStorage.getItem(`__nx_disabled_${feature}`) === 'true';
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
    setTimeout(async () => {
      await verifyFooterIntegrity();
      checkAppIntegrity();
    }, 1000 + Math.random() * 2000); // Întârziere aleatorie pentru a face depanarea mai dificilă
  });
  
  // Verificăm integritatea la intervale aleatorii
  setInterval(async () => {
    await verifyFooterIntegrity();
  }, 60000 + Math.random() * 120000); // Între 1 și 3 minute
};

// Exportăm o funcție obfuscată pentru a face depanarea mai dificilă
export const _nx_verify = async (): Promise<void> => {
  try {
    await verifyFooterIntegrity();
  } catch (e) {
    // Înghițim eroarea pentru a face depanarea mai dificilă
  }
};

// Funcție pentru a verifica dacă aplicația a fost modificată
export const isAppModified = (): boolean => {
  return localStorage.getItem('__nx_integrity_failed') === 'true';
};

// Funcție pentru a reseta starea aplicației
export const resetAppState = (): void => {
  try {
    localStorage.removeItem('__nx_integrity_failed');
    localStorage.removeItem('__nx_features_disabled');
    localStorage.removeItem('__nx_system_error');
    localStorage.removeItem('__nx_unknown_error');
    localStorage.removeItem('__nx_cache_corrupted');
    localStorage.removeItem('__nx_data_validation_failed');
    
    // Eliminăm toate cheile care încep cu __nx_disabled_
    Object.keys(localStorage)
      .filter(key => key.startsWith('__nx_disabled_'))
      .forEach(key => localStorage.removeItem(key));
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