// Acest fișier se ocupă de încărcarea datelor din baza de date
import { supabase } from './supabase';

// Interfețe pentru datele din baza de date
export interface AppSetting {
  id: string;
  key: string;
  value: string;
  description: string;
  is_protected: boolean;
  created_at: string;
  updated_at: string;
}

export interface MotorcycleBrand {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MotorcycleFeature {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MotorcycleCategory {
  id: string;
  name: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Cache pentru datele încărcate
let cachedSettings: AppSetting[] | null = null;
let cachedBrands: MotorcycleBrand[] | null = null;
let cachedFeatures: MotorcycleFeature[] | null = null;
let cachedCategories: MotorcycleCategory[] | null = null;

// Funcție pentru a încărca setările aplicației
export const loadAppSettings = async (): Promise<AppSetting[]> => {
  if (cachedSettings) {
    return cachedSettings;
  }

  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*');

    if (error) {
      console.error('Eroare la încărcarea setărilor:', error);
      return [];
    }

    cachedSettings = data || [];
    return cachedSettings;
  } catch (error) {
    console.error('Eroare la încărcarea setărilor:', error);
    return [];
  }
};

// Funcție pentru a obține o setare specifică
export const getAppSetting = async (key: string): Promise<string | null> => {
  const settings = await loadAppSettings();
  const setting = settings.find(s => s.key === key);
  return setting ? setting.value : null;
};

// Funcție pentru a încărca mărcile de motociclete
export const loadMotorcycleBrands = async (): Promise<MotorcycleBrand[]> => {
  if (cachedBrands) {
    return cachedBrands;
  }

  try {
    const { data, error } = await supabase
      .from('motorcycle_brands')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Eroare la încărcarea mărcilor:', error);
      return [];
    }

    cachedBrands = data || [];
    return cachedBrands;
  } catch (error) {
    console.error('Eroare la încărcarea mărcilor:', error);
    return [];
  }
};

// Funcție pentru a încărca dotările pentru motociclete
export const loadMotorcycleFeatures = async (): Promise<MotorcycleFeature[]> => {
  if (cachedFeatures) {
    return cachedFeatures;
  }

  try {
    const { data, error } = await supabase
      .from('motorcycle_features')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Eroare la încărcarea dotărilor:', error);
      return [];
    }

    cachedFeatures = data || [];
    return cachedFeatures;
  } catch (error) {
    console.error('Eroare la încărcarea dotărilor:', error);
    return [];
  }
};

// Funcție pentru a încărca categoriile de motociclete
export const loadMotorcycleCategories = async (): Promise<MotorcycleCategory[]> => {
  if (cachedCategories) {
    return cachedCategories;
  }

  try {
    const { data, error } = await supabase
      .from('motorcycle_categories')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Eroare la încărcarea categoriilor:', error);
      return [];
    }

    cachedCategories = data || [];
    return cachedCategories;
  } catch (error) {
    console.error('Eroare la încărcarea categoriilor:', error);
    return [];
  }
};

// Funcție pentru a obține numele mărcilor
export const getMotorcycleBrandNames = async (): Promise<string[]> => {
  const brands = await loadMotorcycleBrands();
  return brands.map(brand => brand.name);
};

// Funcție pentru a obține numele dotărilor
export const getMotorcycleFeatureNames = async (): Promise<string[]> => {
  const features = await loadMotorcycleFeatures();
  return features.map(feature => feature.name);
};

// Funcție pentru a obține categoriile formatate pentru UI
export const getMotorcycleCategories = async (): Promise<{ name: string, image: string }[]> => {
  const categories = await loadMotorcycleCategories();
  return categories.map(category => ({
    name: category.name,
    image: category.image_url
  }));
};

// Funcție pentru a verifica dacă o marcă este validă
export const isValidBrand = async (brand: string): Promise<boolean> => {
  const brands = await loadMotorcycleBrands();
  return brands.some(b => b.name === brand);
};

// Funcție pentru a verifica dacă o dotare este validă
export const isValidFeature = async (feature: string): Promise<boolean> => {
  const features = await loadMotorcycleFeatures();
  return features.some(f => f.name === feature);
};

// Funcție pentru a verifica dacă o categorie este validă
export const isValidCategory = async (category: string): Promise<boolean> => {
  const categories = await loadMotorcycleCategories();
  return categories.some(c => c.name === category);
};

// Funcție pentru a verifica dacă toate dotările sunt valide
export const areValidFeatures = async (features: string[]): Promise<boolean> => {
  const validFeatures = await getMotorcycleFeatureNames();
  return features.every(feature => validFeatures.includes(feature));
};

// Funcție pentru a obține setările pentru footer
export const getFooterSettings = async (): Promise<{ developerText: string, developerName: string, logoUrl: string }> => {
  const settings = await loadAppSettings();
  
  return {
    developerText: settings.find(s => s.key === 'footer_text_key')?.value || 'Termeni',
    developerName: settings.find(s => s.key === 'footer_name_key')?.value || 'NEXT SOFT',
    logoUrl: settings.find(s => s.key === 'footer_logo_url')?.value || 'https://i.ibb.co/Qf9Vf3F/Next-Soft-Logo-ALB.png'
  };
};

// Funcție pentru a reîncărca toate datele (invalidează cache-ul)
export const reloadAllData = (): void => {
  cachedSettings = null;
  cachedBrands = null;
  cachedFeatures = null;
  cachedCategories = null;
};