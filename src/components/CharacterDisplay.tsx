
import { CharacterData } from '../types/character';

interface CharacterDisplayProps {
  characterData: CharacterData;
}

const CharacterDisplay = ({ characterData }: CharacterDisplayProps) => {
  const { appearance, clothing, accessories, personal_info } = characterData;

  // Estilos de cabello
  const getHairStyle = () => {
    const style = appearance.hair.style;
    const baseClass = "absolute -top-2 left-1/2 transform -translate-x-1/2 border-2 border-black";
    
    switch(style) {
      case 'afro':
        return `${baseClass} w-40 h-24 rounded-full`;
      case 'coletas':
        return `${baseClass} w-36 h-20 rounded-t-full`;
      case 'mohawk':
        return `${baseClass} w-8 h-24 rounded-t-full`;
      case 'calvo':
        return 'hidden';
      case 'rizado':
        return `${baseClass} w-38 h-22 rounded-full`;
      case 'largo':
        return `${baseClass} w-40 h-32 rounded-t-full`;
      case 'trenzas':
        return `${baseClass} w-36 h-20 rounded-t-full`;
      case 'punk':
        return `${baseClass} w-36 h-28 rounded-t-full transform rotate-12`;
      default:
        return `${baseClass} w-36 h-20 rounded-t-full`;
    }
  };

  // Forma de cara
  const getFaceShape = () => {
    const shape = appearance.face.shape;
    const baseClass = "border-4 border-black relative mx-auto";
    
    switch(shape) {
      case 'cuadrado':
        return `${baseClass} w-32 h-32 rounded-lg`;
      case 'ovalado':
        return `${baseClass} w-28 h-36 rounded-full`;
      case 'triangular':
        return `${baseClass} w-32 h-32 rounded-b-full`;
      default:
        return `${baseClass} w-32 h-32 rounded-full`;
    }
  };

  // Forma de ojos
  const getEyeStyle = (side: 'left' | 'right') => {
    const eyeShape = appearance.face.eyes.shape;
    const eyeSize = appearance.face.eyes.size;
    const position = side === 'left' ? 'left-6' : 'right-6';
    
    let sizeClass = 'w-4 h-4';
    if (eyeSize === 'pequeno') sizeClass = 'w-3 h-3';
    if (eyeSize === 'grande') sizeClass = 'w-5 h-5';
    
    let shapeClass = 'rounded-full';
    if (eyeShape === 'rasgados') shapeClass = 'rounded-lg transform rotate-12';
    if (eyeShape === 'grandes') shapeClass = 'rounded-full scale-110';
    
    return `absolute top-8 ${position} ${sizeClass} bg-white ${shapeClass} border-2 border-black`;
  };

  // Tipo de ropa superior
  const getTopStyle = () => {
    const type = clothing.top.type;
    const baseClass = "mx-auto border-4 border-black";
    
    switch(type) {
      case 'sudadera':
        return `${baseClass} w-32 h-36 rounded-lg`;
      case 'chaqueta':
        return `${baseClass} w-34 h-32 rounded-lg`;
      case 'camisa':
        return `${baseClass} w-28 h-32 rounded-lg`;
      case 'hoodie':
        return `${baseClass} w-32 h-36 rounded-lg`;
      case 'vestido':
        return `${baseClass} w-32 h-48 rounded-lg`;
      default:
        return `${baseClass} w-28 h-32 rounded-lg`;
    }
  };

  // Tipo de ropa inferior
  const getBottomStyle = () => {
    const type = clothing.bottom.type;
    const baseClass = "mx-auto border-4 border-black";
    
    switch(type) {
      case 'shorts':
        return `${baseClass} w-28 h-16 rounded-lg`;
      case 'falda':
        return `${baseClass} w-32 h-20 rounded-b-full`;
      case 'jeans':
        return `${baseClass} w-28 h-24 rounded-lg`;
      case 'leggings':
        return `${baseClass} w-26 h-24 rounded-lg`;
      default:
        return `${baseClass} w-28 h-24 rounded-lg`;
    }
  };

  // Tipo de zapatos
  const getShoeStyle = () => {
    const type = clothing.shoes.type;
    const baseClass = "border-2 border-black";
    
    switch(type) {
      case 'botas':
        return `${baseClass} w-10 h-8 rounded-sm`;
      case 'sandalias':
        return `${baseClass} w-8 h-4 rounded-full`;
      case 'converse':
        return `${baseClass} w-9 h-7 rounded`;
      case 'deportivos':
        return `${baseClass} w-10 h-6 rounded-lg`;
      default:
        return `${baseClass} w-8 h-6 rounded`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] relative">
      {/* Character Name */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full border-2 border-orange-400 bounce-in">
        <h3 className="font-bold text-orange-600">{characterData.name}</h3>
        <p className="text-xs text-gray-600 text-center">
          {personal_info.genero} | Nivel {characterData.estadisticas_juego.nivel}
        </p>
      </div>

      {/* Character Body */}
      <div className="relative mt-16 bounce-in">
        {/* Head */}
        <div 
          className={getFaceShape()}
          style={{ backgroundColor: appearance.rostro.color_piel }}
        >
          {/* Hair */}
          {appearance.cabello.estilo !== 'calvo' && (
            <div 
              className={getHairStyle()}
              style={{ backgroundColor: appearance.cabello.color }}
            />
          )}
          
          {/* Eyes */}
          <div className={getEyeStyle('left')}>
            <div 
              className="w-2 h-2 rounded-full absolute top-1 left-1"
              style={{ backgroundColor: appearance.rostro.ojos.color }}
            />
          </div>
          <div className={getEyeStyle('right')}>
            <div 
              className="w-2 h-2 rounded-full absolute top-1 left-1"
              style={{ backgroundColor: appearance.rostro.ojos.color }}
            />
          </div>

          {/* Glasses */}
          {accesorios.accesorios_cabeza.lentes.tiene_lentes && (
            <div className="absolute top-6 left-3 w-26 h-12 border-4 border-gray-800 rounded-lg bg-transparent">
              <div className="absolute left-6 top-1/2 w-2 h-1 bg-gray-800" />
            </div>
          )}

          {/* Nose */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-300 rounded-full" />

          {/* Mouth */}
          <div 
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-6 h-3 rounded-full border-2 border-black"
            style={{ backgroundColor: appearance.rostro.boca.color }}
          />
          
          {/* Braces */}
          {appearance.rostro.boca.tiene_frenos && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-silver border border-gray-600" />
          )}

          {/* Freckles */}
          {appearance.rostro.caracteristicas_faciales.tiene_pecas && (
            <>
              <div className="absolute top-10 left-8 w-1 h-1 bg-orange-400 rounded-full" />
              <div className="absolute top-11 left-10 w-1 h-1 bg-orange-400 rounded-full" />
              <div className="absolute top-10 right-8 w-1 h-1 bg-orange-400 rounded-full" />
              <div className="absolute top-11 right-10 w-1 h-1 bg-orange-400 rounded-full" />
            </>
          )}

          {/* Hat */}
          {accesorios.accesorios_cabeza.sombrero.tiene_sombrero && (
            <div 
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-40 h-10 rounded-t-lg border-2 border-black"
              style={{ backgroundColor: accesorios.accesorios_cabeza.sombrero.color }}
            />
          )}
        </div>

        {/* Body */}
        <div className="relative mt-4">
          {/* Torso */}
          <div 
            className={getTopStyle()}
            style={{ backgroundColor: clothing.parte_superior.color }}
          >
            {/* Logo or Pattern */}
            {clothing.parte_superior.tiene_logo && (
              <div className="text-center pt-8 text-xs font-bold text-white">
                {clothing.parte_superior.texto_logo}
              </div>
            )}
            
            {/* Pattern overlay */}
            {clothing.parte_superior.patron !== 'solido' && (
              <div className="absolute inset-0 opacity-30">
                {clothing.parte_superior.patron === 'rayas' && (
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent bg-repeat" 
                       style={{backgroundSize: '4px 100%'}} />
                )}
                {clothing.parte_superior.patron === 'puntos' && (
                  <div className="h-full w-full" 
                       style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '8px 8px'}} />
                )}
              </div>
            )}
          </div>

          {/* Arms */}
          <div 
            className="absolute top-2 -left-6 w-6 h-20 border-4 border-black rounded-full"
            style={{ backgroundColor: clothing.parte_superior.color }}
          />
          <div 
            className="absolute top-2 -right-6 w-6 h-20 border-4 border-black rounded-full"
            style={{ backgroundColor: clothing.parte_superior.color }}
          />
          
          {/* Hands */}
          <div 
            className="absolute top-16 -left-8 w-4 h-4 border-2 border-black rounded-full"
            style={{ backgroundColor: appearance.rostro.color_piel }}
          />
          <div 
            className="absolute top-16 -right-8 w-4 h-4 border-2 border-black rounded-full"
            style={{ backgroundColor: appearance.rostro.color_piel }}
          />
        </div>

        {/* Legs */}
        <div className="relative mt-2">
          <div 
            className={getBottomStyle()}
            style={{ backgroundColor: clothing.parte_inferior.color }}
          />
          
          {/* Belt */}
          {clothing.parte_inferior.tiene_cinturon && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-brown-600 border border-black" />
          )}
        </div>

        {/* Feet */}
        <div className="relative mt-2 flex justify-center gap-4">
          <div 
            className={getShoeStyle()}
            style={{ backgroundColor: clothing.zapatos.color }}
          />
          <div 
            className={getShoeStyle()}
            style={{ backgroundColor: clothing.zapatos.color }}
          />
        </div>

        {/* Accessories */}
        {accesorios.accesorios_cuerpo.collar.tiene_collar && (
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-yellow-400 rounded-full" />
        )}
        
        {accesorios.accesorios_cuerpo.reloj.tiene_reloj && (
          <div className="absolute top-20 -left-10 w-3 h-3 bg-black rounded border border-gray-600" />
        )}
      </div>

      {/* Character Stats */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full border-2 border-blue-400 text-xs">
        <div className="flex gap-4">
          <span>❤️ {characterData.estadisticas_juego.salud}</span>
          <span>😊 {characterData.estadisticas_juego.felicidad}</span>
          <span>⭐ {characterData.estadisticas_juego.popularidad}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;
