import { useState } from 'react';
import CharacterCreator from '../components/CharacterCreator';
import JsonPanel from '../components/JsonPanel';
import { CharacterData } from '../types/character';

const Index = () => {
  const [activeTab, setActiveTab] = useState('basico');
  
  const [characterData, setCharacterData] = useState<CharacterData>({
    // Datos básicos
    id: Math.floor(Math.random() * 10000),
    nombre: "Mi Personaje",
    fecha_creacion: new Date().toISOString(),
    version: 1.0,
    
    // Información personal
    informacion_personal: {
      genero: "indefinido",
      edad: null,
      rasgos_personalidad: [],
      actividades_favoritas: [],
      frase_caracteristica: "",
      es_estudiante: true,
      grado_escolar: 4
    },

    // Apariencia física
    apariencia: {
      // Cabello
      cabello: {
        estilo: "basico",
        color: "#8B4513",
        longitud: "corto",
        tiene_accesorios: false,
        accesorios: []
      },
      
      // Rostro
      rostro: {
        forma: "redondo",
        color_piel: "#FFDBAC",
        
        // Ojos
        ojos: {
          color: "#000000",
          forma: "normal",
          tamaño: "mediano",
          tiene_lentes: false,
          tipo_lentes: null
        },
        
        // Boca
        boca: {
          forma: "normal",
          color: "#FF69B4",
          expresion: "sonrisa",
          tiene_frenos: false
        },
        
        // Nariz
        nariz: {
          tamaño: "pequena",
          forma: "normal"
        },
        
        // Extras faciales
        caracteristicas_faciales: {
          tiene_pecas: false,
          tiene_hoyuelos: false,
          tiene_cicatrices: false,
          cantidad_cicatrices: 0,
          tiene_maquillaje: false
        }
      },
      
      // Cuerpo
      cuerpo: {
        altura: 120,
        contextura: "normal",
        tono_piel: "#FFDBAC"
      }
    },

    // Vestimenta
    vestimenta: {
      // Parte superior
      parte_superior: {
        tipo: "camiseta",
        color: "#FF0000",
        patron: "solido",
        tiene_logo: false,
        texto_logo: "",
        longitud_manga: "corta",
        material: "algodon"
      },
      
      // Parte inferior
      parte_inferior: {
        tipo: "pantalones",
        color: "#0000FF",
        patron: "solido",
        longitud: "largo",
        tiene_cinturon: false,
        material: "mezclilla"
      },
      
      // Calzado
      zapatos: {
        tipo: "tenis",
        color: "#FFFFFF",
        marca: "genericos",
        tiene_cordones: true,
        color_cordones: "#000000"
      },
      
      // Ropa interior/base
      ropa_interior: {
        visible: true,
        color: "#FFFFFF",
        tipo: "calzones"
      }
    },

    // Accesorios
    accesorios: {
      // Cabeza
      accesorios_cabeza: {
        sombrero: {
          tiene_sombrero: false,
          tipo: null,
          color: null,
          tiene_logo: false
        },
        
        lentes: {
          tiene_lentes: false,
          tipo: null,
          color: null,
          con_receta: false
        },
        
        aretes: {
          tiene_aretes: false,
          tipo: null,
          cantidad: 0
        }
      },
      
      // Cuerpo
      accesorios_cuerpo: {
        collar: {
          tiene_collar: false,
          tipo: null,
          material: null
        },
        
        reloj: {
          tiene_reloj: false,
          tipo: null,
          color: null
        },
        
        pulsera: {
          tiene_pulsera: false,
          tipo: null,
          cantidad: 0
        }
      },
      
      // Cintura
      accesorios_cintura: {
        cinturon: {
          tiene_cinturon: false,
          color: null,
          material: null,
          tipo_hebilla: null
        }
      },
      
      // Objetos que lleva
      objetos_que_lleva: []
    },

    // Configuraciones especiales
    caracteristicas_especiales: {
      es_superheroe: false,
      nombre_superheroe: null,
      tiene_poderes: false,
      lista_poderes: [],
      es_alienigena: false,
      es_robot: false,
      nivel_transparencia: 1.0
    },

    // Estadísticas del juego
    estadisticas_juego: {
      nivel: 1,
      puntos_experiencia: 0,
      salud: 100,
      energia: 100,
      felicidad: 75,
      popularidad: 50,
      caracteristicas_desbloqueadas: ["ropa_basica", "cabello_basico"],
      logros: []
    }
  });

  return (
    <div className="min-h-screen south-park-bg">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-orange-600 mb-2 drop-shadow-lg">
            🎮 Creador de Personajes South Park
          </h1>
          <p className="text-xl text-blue-800 font-medium">
            ¡Crea tu personaje y aprende JSON de forma divertida! 📝
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Character Creator Panel */}
          <div className="bg-white/90 backdrop-blur rounded-xl shadow-2xl p-6 border-4 border-orange-400">
            <CharacterCreator 
              characterData={characterData} 
              setCharacterData={setCharacterData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* JSON Panel */}
          <div className="bg-gray-900 rounded-xl shadow-2xl border-4 border-blue-400">
            <JsonPanel 
              characterData={characterData} 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 bg-white/80 backdrop-blur rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-gray-700 font-medium">
            🎯 <strong>¡Aprende JSON jugando!</strong> Cada cambio que hagas se refleja en el código JSON de la derecha.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Tipos de datos: String 📝 | Number 🔢 | Boolean ✅ | Null ❌ | Array 📋 | Object 🏗️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
