
export interface CharacterData {
  // Datos básicos
  id: number;
  nombre: string;
  fecha_creacion: string;
  version: number;
  
  // Información personal
  informacion_personal: {
    genero: "hombre" | "mujer" | "indefinido";
    edad: number | null;
    rasgos_personalidad: string[];
    actividades_favoritas: string[];
    frase_caracteristica: string;
    es_estudiante: boolean;
    grado_escolar: number;
  };

  // Apariencia física
  apariencia: {
    cabello: {
      estilo: string;
      color: string;
      longitud: string;
      tiene_accesorios: boolean;
      accesorios: string[];
    };
    
    rostro: {
      forma: string;
      color_piel: string;
      
      ojos: {
        color: string;
        forma: string;
        tamaño: string;
        tiene_lentes: boolean;
        tipo_lentes: string | null;
      };
      
      boca: {
        forma: string;
        color: string;
        expresion: string;
        tiene_frenos: boolean;
      };
      
      nariz: {
        tamaño: string;
        forma: string;
      };
      
      caracteristicas_faciales: {
        tiene_pecas: boolean;
        tiene_hoyuelos: boolean;
        tiene_cicatrices: boolean;
        cantidad_cicatrices: number;
        tiene_maquillaje: boolean;
      };
    };
    
    cuerpo: {
      altura: number;
      contextura: string;
      tono_piel: string;
    };
  };

  // Vestimenta
  vestimenta: {
    parte_superior: {
      tipo: string;
      color: string;
      patron: string;
      tiene_logo: boolean;
      texto_logo: string;
      longitud_manga: string;
      material: string;
    };
    
    parte_inferior: {
      tipo: string;
      color: string;
      patron: string;
      longitud: string;
      tiene_cinturon: boolean;
      material: string;
    };
    
    zapatos: {
      tipo: string;
      color: string;
      marca: string;
      tiene_cordones: boolean;
      color_cordones: string;
    };
    
    ropa_interior: {
      visible: boolean;
      color: string;
      tipo: string;
    };
  };

  // Accesorios
  accesorios: {
    accesorios_cabeza: {
      sombrero: {
        tiene_sombrero: boolean;
        tipo: string | null;
        color: string | null;
        tiene_logo: boolean;
      };
      
      lentes: {
        tiene_lentes: boolean;
        tipo: string | null;
        color: string | null;
        con_receta: boolean;
      };
      
      aretes: {
        tiene_aretes: boolean;
        tipo: string | null;
        cantidad: number;
      };
    };
    
    accesorios_cuerpo: {
      collar: {
        tiene_collar: boolean;
        tipo: string | null;
        material: string | null;
      };
      
      reloj: {
        tiene_reloj: boolean;
        tipo: string | null;
        color: string | null;
      };
      
      pulsera: {
        tiene_pulsera: boolean;
        tipo: string | null;
        cantidad: number;
      };
    };
    
    accesorios_cintura: {
      cinturon: {
        tiene_cinturon: boolean;
        color: string | null;
        material: string | null;
        tipo_hebilla: string | null;
      };
    };
    
    objetos_que_lleva: string[];
  };

  // Configuraciones especiales
  caracteristicas_especiales: {
    es_superheroe: boolean;
    nombre_superheroe: string | null;
    tiene_poderes: boolean;
    lista_poderes: string[];
    es_alienigena: boolean;
    es_robot: boolean;
    nivel_transparencia: number;
  };

  // Estadísticas del juego
  estadisticas_juego: {
    nivel: number;
    puntos_experiencia: number;
    salud: number;
    energia: number;
    felicidad: number;
    popularidad: number;
    caracteristicas_desbloqueadas: string[];
    logros: string[];
  };
}
