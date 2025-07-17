/*
# Creare tabele pentru setări și date de aplicație

1. Tabele Noi
  - `app_settings` - Stochează setări generale ale aplicației
  - `motorcycle_brands` - Stochează mărcile de motociclete permise
  - `motorcycle_features` - Stochează dotările permise pentru motociclete
  - `motorcycle_categories` - Stochează categoriile de motociclete cu imaginile lor

2. Date Inițiale
  - Inserare setări pentru footer (text și logo)
  - Inserare mărci de motociclete
  - Inserare dotări pentru motociclete
  - Inserare categorii de motociclete
*/

-- Creăm tabelul pentru setări aplicație
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  is_protected BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Creăm tabelul pentru mărcile de motociclete
CREATE TABLE IF NOT EXISTS motorcycle_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Creăm tabelul pentru dotările motocicletelor
CREATE TABLE IF NOT EXISTS motorcycle_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Creăm tabelul pentru categoriile de motociclete
CREATE TABLE IF NOT EXISTS motorcycle_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Adăugăm trigger pentru updated_at
CREATE TRIGGER update_app_settings_updated_at
BEFORE UPDATE ON app_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_motorcycle_brands_updated_at
BEFORE UPDATE ON motorcycle_brands
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_motorcycle_features_updated_at
BEFORE UPDATE ON motorcycle_features
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_motorcycle_categories_updated_at
BEFORE UPDATE ON motorcycle_categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Activăm RLS pentru toate tabelele
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycle_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycle_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycle_categories ENABLE ROW LEVEL SECURITY;

-- Politici RLS pentru app_settings
CREATE POLICY "app_settings_select_all" ON app_settings
FOR SELECT USING (true);

CREATE POLICY "app_settings_insert_admin" ON app_settings
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "app_settings_update_admin" ON app_settings
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "app_settings_delete_admin" ON app_settings
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Politici RLS pentru motorcycle_brands
CREATE POLICY "motorcycle_brands_select_all" ON motorcycle_brands
FOR SELECT USING (true);

CREATE POLICY "motorcycle_brands_insert_admin" ON motorcycle_brands
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "motorcycle_brands_update_admin" ON motorcycle_brands
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "motorcycle_brands_delete_admin" ON motorcycle_brands
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Politici RLS pentru motorcycle_features
CREATE POLICY "motorcycle_features_select_all" ON motorcycle_features
FOR SELECT USING (true);

CREATE POLICY "motorcycle_features_insert_admin" ON motorcycle_features
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "motorcycle_features_update_admin" ON motorcycle_features
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "motorcycle_features_delete_admin" ON motorcycle_features
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Politici RLS pentru motorcycle_categories
CREATE POLICY "motorcycle_categories_select_all" ON motorcycle_categories
FOR SELECT USING (true);

CREATE POLICY "motorcycle_categories_insert_admin" ON motorcycle_categories
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "motorcycle_categories_update_admin" ON motorcycle_categories
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "motorcycle_categories_delete_admin" ON motorcycle_categories
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Inserăm setările pentru footer (obfuscat)
INSERT INTO app_settings (key, value, description, is_protected)
VALUES 
('footer_developer_text', 'Termeni', 'Textul pentru dezvoltatorul din footer', true),
('footer_developer_name', 'NEXT SOFT', 'Numele dezvoltatorului din footer', true),
('footer_logo_url', '/Next Soft Logo - ALB.png', 'URL-ul logo-ului din footer', true);

-- Inserăm mărcile de motociclete
INSERT INTO motorcycle_brands (name)
VALUES 
('Yamaha'),
('Honda'),
('Suzuki'),
('Kawasaki'),
('BMW'),
('Ducati'),
('KTM'),
('Aprilia'),
('Triumph'),
('Harley-Davidson'),
('MV Agusta'),
('Benelli'),
('Moto Guzzi'),
('Indian'),
('Zero'),
('Energica'),
('Husqvarna'),
('Beta'),
('Sherco'),
('GasGas'),
('CFMOTO'),
('Kymco');

-- Inserăm dotările pentru motociclete
INSERT INTO motorcycle_features (name)
VALUES 
('ABS (sistem antiblocare frâne)'),
('Mansoane încălzite'),
('Parbriz'),
('Șa încălzită'),
('Pilot automat'),
('Priză USB/12V'),
('Genți laterale'),
('Topcase'),
('Crash bar'),
('Suport telefon'),
('Navigație'),
('Bluetooth'),
('Sistem audio'),
('Keyless start'),
('Quickshifter/blipper'),
('TPMS'),
('Antifurt'),
('Imobilizator'),
('Evacuare sport'),
('Kit LED / DRL-uri personalizate'),
('Handguards (apărători mâini)'),
('Crash pads / frame sliders'),
('Bare protecție motor'),
('Scărițe reglabile');

-- Inserăm categoriile de motociclete
INSERT INTO motorcycle_categories (name, image_url)
VALUES 
('Sport', 'https://images.pexels.com/photos/595807/pexels-photo-595807.jpeg'),
('Touring', 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg'),
('Cruiser', 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg'),
('Adventure', 'https://www.advpulse.com/wp-content/uploads/2016/04/Honda-XRE-300-a-561x373.jpg'),
('Naked', 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg'),
('Enduro', 'https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg'),
('Scooter', 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg'),
('Chopper', 'https://images.pexels.com/photos/2393821/pexels-photo-2393821.jpeg');

-- Funcție pentru a verifica dacă o marcă este validă
CREATE OR REPLACE FUNCTION is_valid_motorcycle_brand(brand_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM motorcycle_brands
    WHERE name = brand_name AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcție pentru a verifica dacă o dotare este validă
CREATE OR REPLACE FUNCTION is_valid_motorcycle_feature(feature_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM motorcycle_features
    WHERE name = feature_name AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcție pentru a verifica dacă o categorie este validă
CREATE OR REPLACE FUNCTION is_valid_motorcycle_category(category_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM motorcycle_categories
    WHERE name = category_name AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcție pentru a verifica dacă toate dotările sunt valide
CREATE OR REPLACE FUNCTION are_valid_motorcycle_features(features TEXT[])
RETURNS BOOLEAN AS $$
DECLARE
  feature TEXT;
BEGIN
  IF features IS NULL THEN
    RETURN TRUE;
  END IF;
  
  FOREACH feature IN ARRAY features LOOP
    IF NOT is_valid_motorcycle_feature(feature) THEN
      RETURN FALSE;
    END IF;
  END LOOP;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pentru a valida marca, categoria și dotările la inserare/actualizare
CREATE OR REPLACE FUNCTION validate_listing_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validăm marca
  IF NOT is_valid_motorcycle_brand(NEW.brand) THEN
    RAISE EXCEPTION 'Marca % nu este validă', NEW.brand;
  END IF;
  
  -- Validăm categoria
  IF NOT is_valid_motorcycle_category(NEW.category) THEN
    RAISE EXCEPTION 'Categoria % nu este validă', NEW.category;
  END IF;
  
  -- Validăm dotările
  IF NOT are_valid_motorcycle_features(NEW.features) THEN
    RAISE EXCEPTION 'Una sau mai multe dotări nu sunt valide';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_listing_data_trigger
BEFORE INSERT OR UPDATE ON listings
FOR EACH ROW
EXECUTE FUNCTION validate_listing_data();

-- Funcție pentru a obține setarea aplicației
CREATE OR REPLACE FUNCTION get_app_setting(setting_key TEXT)
RETURNS TEXT AS $$
DECLARE
  setting_value TEXT;
BEGIN
  SELECT value INTO setting_value
  FROM app_settings
  WHERE key = setting_key;
  
  RETURN setting_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcție pentru a obține toate mărcile active
CREATE OR REPLACE FUNCTION get_active_motorcycle_brands()
RETURNS SETOF motorcycle_brands AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM motorcycle_brands
  WHERE is_active = true
  ORDER BY name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcție pentru a obține toate dotările active
CREATE OR REPLACE FUNCTION get_active_motorcycle_features()
RETURNS SETOF motorcycle_features AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM motorcycle_features
  WHERE is_active = true
  ORDER BY name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcție pentru a obține toate categoriile active
CREATE OR REPLACE FUNCTION get_active_motorcycle_categories()
RETURNS SETOF motorcycle_categories AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM motorcycle_categories
  WHERE is_active = true
  ORDER BY name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;