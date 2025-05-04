/**
 * siteSchema.ts - Datos estructurados para SEO
 * Este archivo contiene esquemas JSON-LD para mejorar el SEO del sitio
 */

// Información básica del sitio
export const SITE_NAME = "MenteSana";
export const SITE_DESCRIPTION = "Equipo de psicólogos especializados comprometidos con tu salud mental. Ofrecemos terapias personalizadas en un entorno seguro y confidencial.";
export const SITE_URL = "https://mentesana.com";
export const SITE_LOGO = "/img/logo.svg";
export const SITE_IMAGE = "/img/social-image.svg";

// Datos de contacto
export const CONTACT_DATA = {
  phone: "+34600000000", // Cambiar por número real
  email: "contacto@mentesana.com", // Cambiar por email real
  address: {
    street: "Calle Principal, 123",
    city: "Madrid",
    postalCode: "28001",
    country: "ES"
  },
  social: {
    facebook: "https://facebook.com/mentesana",
    twitter: "https://twitter.com/mentesana",
    instagram: "https://instagram.com/mentesana"
  },
  geo: {
    latitude: 40.416775,
    longitude: -3.703790
  },
  hours: {
    weekdays: "09:00-20:00",
    saturday: "10:00-14:00",
    sunday: "Cerrado"
  }
};

// Esquema para servicios de psicología
export const getPsychologyServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${SITE_NAME} - Servicio de Psicología Profesional`,
    "description": SITE_DESCRIPTION,
    "image": `${SITE_URL}${SITE_IMAGE}`,
    "priceRange": "$$",
    "telephone": CONTACT_DATA.phone,
    "email": CONTACT_DATA.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONTACT_DATA.address.street,
      "addressLocality": CONTACT_DATA.address.city,
      "postalCode": CONTACT_DATA.address.postalCode,
      "addressCountry": CONTACT_DATA.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": CONTACT_DATA.geo.latitude,
      "longitude": CONTACT_DATA.geo.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      CONTACT_DATA.social.facebook,
      CONTACT_DATA.social.twitter,
      CONTACT_DATA.social.instagram
    ]
  };
};

// Esquema para tratamientos psicológicos
export const getPsychologicalTreatmentSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "PsychologicalTreatment",
    "name": `Servicios de Psicología en ${SITE_NAME}`,
    "treatmentIndication": [
      "Ansiedad",
      "Depresión",
      "Estrés",
      "Problemas de pareja",
      "Trastornos de la conducta alimentaria",
      "Fobias",
      "Trauma"
    ],
    "recognizingAuthority": "Colegio Oficial de Psicólogos",
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Psicología Clínica"
    },
    "status": "ActiveNotRecruiting",
    "study": {
      "@type": "MedicalStudy",
      "studyLocation": {
        "@type": "Place",
        "name": `${SITE_NAME} Centro de Psicología`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": CONTACT_DATA.address.street,
          "addressLocality": CONTACT_DATA.address.city,
          "postalCode": CONTACT_DATA.address.postalCode,
          "addressCountry": CONTACT_DATA.address.country
        }
      }
    }
  };
};

// Esquema para preguntas frecuentes
export const getFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo dura una terapia psicológica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La duración de la terapia depende de cada caso particular. Algunas personas pueden notar mejorías en pocas sesiones, mientras que otras pueden requerir un tratamiento más prolongado. En la primera consulta evaluaremos tu caso y te proporcionaremos una estimación del tiempo de tratamiento."
        }
      },
      {
        "@type": "Question",
        "name": "¿Las sesiones son presenciales u online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ofrecemos ambas modalidades. Puedes elegir entre sesiones presenciales en nuestra clínica o sesiones online a través de videollamada, según tu preferencia y disponibilidad."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo puedo solicitar una cita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puedes solicitar una cita de varias formas: llamando directamente a nuestro teléfono, enviando un correo electrónico, completando el formulario en nuestra página web o usando nuestro chat en línea."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué métodos de pago aceptan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aceptamos pagos con tarjeta de crédito/débito, transferencia bancaria y efectivo para las consultas presenciales. Para las consultas online, requerimos pago previo por tarjeta o transferencia."
        }
      },
      {
        "@type": "Question",
        "name": "¿La primera consulta es gratuita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, ofrecemos una primera sesión de evaluación gratuita de 20-30 minutos para conocer tu caso y explicarte cómo podemos ayudarte. Esta sesión puede ser presencial u online."
        }
      }
    ]
  };
};

// Esquema para artículos de blog
export const getBlogPostSchema = (
  title: string,
  description: string,
  url: string,
  imageUrl: string,
  datePublished: string,
  dateModified: string,
  authorName: string = "Equipo de MenteSana"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "name": title,
    "description": description,
    "image": imageUrl,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}${SITE_LOGO}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}; 