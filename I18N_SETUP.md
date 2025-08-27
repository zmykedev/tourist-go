# 🌍 Configuración de i18n (Internacionalización)

## Instalación de Dependencias

Antes de usar la funcionalidad de internacionalización, necesitas instalar las dependencias necesarias:

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

## Características Implementadas

### ✅ **Idiomas Soportados**
- 🇪🇸 **Español** (es) - Idioma por defecto
- 🇺🇸 **Inglés** (en)
- 🇩🇪 **Alemán** (de)

### ✅ **Funcionalidades**
- **Detección automática** del idioma del navegador
- **Persistencia** del idioma seleccionado en localStorage
- **Selector de idioma** visual con banderas
- **Traducciones completas** para toda la aplicación
- **Contexto global** para manejo de idiomas

### ✅ **Archivos Creados**
```
src/
├── i18n/
│   ├── index.ts                 # Configuración principal
│   └── locales/
│       ├── es.json             # Traducciones en español
│       ├── en.json             # Traducciones en inglés
│       └── de.json             # Traducciones en alemán
├── components/
│   └── LanguageSelector.tsx    # Selector de idioma
├── contexts/
│   └── LanguageContext.tsx     # Contexto global de idioma
└── hooks/
    └── useTranslations.ts      # Hook personalizado
```

## Uso

### 1. **En Componentes**
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <h1>{t('dashboard.hero.title')}</h1>
  );
};
```

### 2. **Selector de Idioma**
```tsx
import LanguageSelector from './components/LanguageSelector';

// El selector se muestra automáticamente en el Dashboard
// También puedes agregarlo a cualquier componente
```

### 3. **Hook Personalizado**
```tsx
import { useTranslations } from './hooks/useTranslations';

const MyComponent = () => {
  const { t, changeLanguage, currentLanguage } = useTranslations();
  
  return (
    <button onClick={() => changeLanguage('en')}>
      Cambiar a Inglés
    </button>
  );
};
```

## Estructura de Traducciones

Las traducciones están organizadas por secciones:

```json
{
  "dashboard": {
    "hero": { "title": "..." },
    "destinations": { "title": "..." },
    "experiences": { "title": "..." }
  },
  "common": {
    "buttons": { "save": "..." },
    "navigation": { "previous": "..." }
  },
  "auth": {
    "login": { "title": "..." },
    "register": { "title": "..." }
  }
}
```

## Agregar Nuevas Traducciones

1. **Agregar la clave** en todos los archivos de idioma (`es.json`, `en.json`, `de.json`)
2. **Usar en el componente** con `t('nueva.clave')`
3. **Mantener consistencia** en la estructura de claves

## Características Avanzadas

- **Detección automática** del idioma del navegador
- **Fallback** al español si no se encuentra la traducción
- **Persistencia** en localStorage
- **Interpolación** de variables en traducciones
- **Pluralización** automática

## Ejemplo de Uso Completo

```tsx
import { useTranslation } from 'react-i18next';

const WelcomeComponent = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.hero.title')}</h1>
      <p>{t('dashboard.hero.subtitle')}</p>
      <button>{t('common.buttons.reserve')}</button>
      
      {/* Cambiar idioma */}
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
};
```

## Notas Importantes

- ✅ **Responsive**: El selector de idioma se adapta a todos los dispositivos
- ✅ **Accesibilidad**: Incluye aria-labels y navegación por teclado
- ✅ **Performance**: Las traducciones se cargan de forma eficiente
- ✅ **Mantenible**: Estructura clara y fácil de expandir

¡La internacionalización está lista para usar! 🌍
