
import { useState } from 'react';
import CharacterCreator from '../components/CharacterCreator';
import JsonPanel from '../components/JsonPanel';
import { CharacterData } from '../types/character';

const Index = () => {
  const [characterData, setCharacterData] = useState<CharacterData>({
    // Datos básicos
    id: Math.floor(Math.random() * 10000),
    name: "Mi Personaje",
    created_at: new Date().toISOString(),
    version: 1.0,
    
    // Información personal
    personal_info: {
      gender: "indefinido",
      age: null,
      personality_traits: [],
      favorite_activities: [],
      catchphrase: "",
      is_student: true,
      grade_level: 4
    },

    // Apariencia física
    appearance: {
      // Cabello
      hair: {
        style: "basico",
        color: "#8B4513",
        length: "corto",
        has_accessories: false,
        accessories: []
      },
      
      // Rostro
      face: {
        shape: "redondo",
        skin_color: "#FFDBAC",
        
        // Ojos
        eyes: {
          color: "#000000",
          shape: "normal",
          size: "mediano",
          has_glasses: false,
          glasses_type: null
        },
        
        // Boca
        mouth: {
          shape: "normal",
          color: "#FF69B4",
          expression: "sonrisa",
          has_braces: false
        },
        
        // Nariz
        nose: {
          size: "pequena",
          shape: "normal"
        },
        
        // Extras faciales
        facial_features: {
          has_freckles: false,
          has_dimples: false,
          has_scars: false,
          scars_count: 0,
          has_makeup: false
        }
      },
      
      // Cuerpo
      body: {
        height: 120,
        build: "normal",
        skin_tone: "#FFDBAC"
      }
    },

    // Vestimenta
    clothing: {
      // Parte superior
      top: {
        type: "camiseta",
        color: "#FF0000",
        pattern: "solido",
        has_logo: false,
        logo_text: "",
        sleeve_length: "corta",
        material: "algodon"
      },
      
      // Parte inferior
      bottom: {
        type: "pantalones",
        color: "#0000FF",
        pattern: "solido",
        length: "largo",
        has_belt: false,
        material: "mezclilla"
      },
      
      // Calzado
      shoes: {
        type: "tenis",
        color: "#FFFFFF",
        brand: "genericos",
        has_laces: true,
        lace_color: "#000000"
      },
      
      // Ropa interior/base
      underwear: {
        visible: true,
        color: "#FFFFFF",
        type: "calzones"
      }
    },

    // Accesorios
    accessories: {
      // Cabeza
      head_accessories: {
        hat: {
          has_hat: false,
          type: null,
          color: null,
          has_logo: false
        },
        
        glasses: {
          has_glasses: false,
          type: null,
          color: null,
          prescription: false
        },
        
        earrings: {
          has_earrings: false,
          type: null,
          count: 0
        }
      },
      
      // Cuerpo
      body_accessories: {
        necklace: {
          has_necklace: false,
          type: null,
          material: null
        },
        
        watch: {
          has_watch: false,
          type: null,
          color: null
        },
        
        bracelet: {
          has_bracelet: false,
          type: null,
          count: 0
        }
      },
      
      // Cintura
      waist_accessories: {
        belt: {
          has_belt: false,
          color: null,
          material: null,
          buckle_type: null
        }
      },
      
      // Objetos que lleva
      carried_items: []
    },

    // Configuraciones especiales
    special_features: {
      is_superhero: false,
      superhero_name: null,
      has_powers: false,
      powers_list: [],
      is_alien: false,
      is_robot: false,
      transparency_level: 1.0
    },

    // Estadísticas del juego
    game_stats: {
      level: 1,
      experience_points: 0,
      health: 100,
      energy: 100,
      happiness: 75,
      popularity: 50,
      unlocked_features: ["basic_clothing", "basic_hair"],
      achievements: []
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
            />
          </div>

          {/* JSON Panel */}
          <div className="bg-gray-900 rounded-xl shadow-2xl border-4 border-blue-400">
            <JsonPanel characterData={characterData} />
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
