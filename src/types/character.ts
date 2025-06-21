
export interface CharacterData {
  // Datos básicos
  id: number;
  name: string;
  created_at: string;
  version: number;
  
  // Información personal
  personal_info: {
    gender: "hombre" | "mujer" | "indefinido";
    age: number | null;
    personality_traits: string[];
    favorite_activities: string[];
    catchphrase: string;
    is_student: boolean;
    grade_level: number;
  };

  // Apariencia física
  appearance: {
    hair: {
      style: string;
      color: string;
      length: string;
      has_accessories: boolean;
      accessories: string[];
    };
    
    face: {
      shape: string;
      skin_color: string;
      
      eyes: {
        color: string;
        shape: string;
        size: string;
        has_glasses: boolean;
        glasses_type: string | null;
      };
      
      mouth: {
        shape: string;
        color: string;
        expression: string;
        has_braces: boolean;
      };
      
      nose: {
        size: string;
        shape: string;
      };
      
      facial_features: {
        has_freckles: boolean;
        has_dimples: boolean;
        has_scars: boolean;
        scars_count: number;
        has_makeup: boolean;
      };
    };
    
    body: {
      height: number;
      build: string;
      skin_tone: string;
    };
  };

  // Vestimenta
  clothing: {
    top: {
      type: string;
      color: string;
      pattern: string;
      has_logo: boolean;
      logo_text: string;
      sleeve_length: string;
      material: string;
    };
    
    bottom: {
      type: string;
      color: string;
      pattern: string;
      length: string;
      has_belt: boolean;
      material: string;
    };
    
    shoes: {
      type: string;
      color: string;
      brand: string;
      has_laces: boolean;
      lace_color: string;
    };
    
    underwear: {
      visible: boolean;
      color: string;
      type: string;
    };
  };

  // Accesorios
  accessories: {
    head_accessories: {
      hat: {
        has_hat: boolean;
        type: string | null;
        color: string | null;
        has_logo: boolean;
      };
      
      glasses: {
        has_glasses: boolean;
        type: string | null;
        color: string | null;
        prescription: boolean;
      };
      
      earrings: {
        has_earrings: boolean;
        type: string | null;
        count: number;
      };
    };
    
    body_accessories: {
      necklace: {
        has_necklace: boolean;
        type: string | null;
        material: string | null;
      };
      
      watch: {
        has_watch: boolean;
        type: string | null;
        color: string | null;
      };
      
      bracelet: {
        has_bracelet: boolean;
        type: string | null;
        count: number;
      };
    };
    
    waist_accessories: {
      belt: {
        has_belt: boolean;
        color: string | null;
        material: string | null;
        buckle_type: string | null;
      };
    };
    
    carried_items: string[];
  };

  // Configuraciones especiales
  special_features: {
    is_superhero: boolean;
    superhero_name: string | null;
    has_powers: boolean;
    powers_list: string[];
    is_alien: boolean;
    is_robot: boolean;
    transparency_level: number;
  };

  // Estadísticas del juego
  game_stats: {
    level: number;
    experience_points: number;
    health: number;
    energy: number;
    happiness: number;
    popularity: number;
    unlocked_features: string[];
    achievements: string[];
  };
}
