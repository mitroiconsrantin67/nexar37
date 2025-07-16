@@ .. @@
 import { Bike, Upload, X, AlertTriangle, Check, MapPin, Calendar, Gauge, Fuel, Settings, FileText, Euro, Camera, Plus, Minus } from 'lucide-react';
 import { listings, auth, romanianCities, supabase } from '../lib/supabase';
 import SuccessModal from '../components/SuccessModal';
+import { validateFeatures, validateBrand } from '../lib/dataValidation';
+import { ALLOWED_FEATURES, ALLOWED_BRANDS } from '../lib/validations';
 
 // Lista de mărci de motociclete
-const motorcycleBrands = [
-	"Yamaha",
-	"Honda",
-	"Suzuki",
-	"Kawasaki",
-	"BMW",
-	"Ducati",
-	"KTM",
-	"Aprilia",
-	"Triumph",
-	"Harley-Davidson",
-	"MV Agusta",
-	"Benelli",
-	"Moto Guzzi",
-	"Indian",
-	"Zero",
-	"Energica",
-	"Husqvarna",
-	"Beta",
-	"Sherco",
-	"GasGas",
-	"CFMOTO",
-	"Kymco"
-	
-];
+const motorcycleBrands = ALLOWED_BRANDS;
@@ .. @@
 	const handleFeatureToggle = (feature: string) => {
 		setFormData(prev => {
 			const newFeatures = prev.features.includes(feature)
 				? prev.features.filter(f => f !== feature)
 				: [...prev.features, feature];
+			
+			// Validăm noile dotări
+			validateFeatures(newFeatures);
+			
 			return { ...prev, features: newFeatures };
 		});
 	};
@@ .. @@
 		try {
 			setIsLoading(true);
 
+			// Validăm marca
+			if (!validateBrand(formData.brand)) {
+				setErrors(prev => ({ ...prev, brand: 'Marca nu este permisă' }));
+				setIsLoading(false);
+				return;
+			}
+
+			// Validăm dotările
+			if (formData.features.length > 0 && !validateFeatures(formData.features)) {
+				setErrors(prev => ({ ...prev, features: 'Una sau mai multe dotări nu sunt permise' }));
+				setIsLoading(false);
+				return;
+			}
+
 			const listingData = {
 				...formData,
 				price: Number(formData.price),
@@ .. @@
 							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
-								{features.map(feature => (
+								{ALLOWED_FEATURES.map(feature => (
 									<div key={feature} className="flex items-center space-x-2">
 										<input
 											type="checkbox"