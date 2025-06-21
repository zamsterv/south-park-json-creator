
import { CharacterData } from '../types/character';

interface CharacterDisplayProps {
  characterData: CharacterData;
}

const CharacterDisplay = ({ characterData }: CharacterDisplayProps) => {
  const { appearance, clothing, accessories, personal_info } = characterData;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] relative">
      {/* Character Name */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full border-2 border-orange-400 bounce-in">
        <h3 className="font-bold text-orange-600">{characterData.name}</h3>
        <p className="text-xs text-gray-600 text-center">
          {personal_info.gender} | Nivel {characterData.game_stats.level}
        </p>
      </div>

      {/* Character Body */}
      <div className="relative mt-16 bounce-in">
        {/* Head */}
        <div 
          className="w-32 h-32 rounded-full border-4 border-black relative mx-auto"
          style={{ backgroundColor: appearance.face.skin_color }}
        >
          {/* Hair */}
          <div 
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-36 h-20 rounded-t-full"
            style={{ backgroundColor: appearance.hair.color }}
          />
          
          {/* Eyes */}
          <div className="absolute top-8 left-6 w-4 h-4 bg-white rounded-full border-2 border-black">
            <div 
              className="w-2 h-2 rounded-full absolute top-1 left-1"
              style={{ backgroundColor: appearance.face.eyes.color }}
            />
          </div>
          <div className="absolute top-8 right-6 w-4 h-4 bg-white rounded-full border-2 border-black">
            <div 
              className="w-2 h-2 rounded-full absolute top-1 left-1"
              style={{ backgroundColor: appearance.face.eyes.color }}
            />
          </div>

          {/* Glasses */}
          {accessories.head_accessories.glasses.has_glasses && (
            <div className="absolute top-6 left-3 w-26 h-12 border-4 border-gray-800 rounded-lg bg-transparent">
              <div className="absolute left-6 top-1/2 w-2 h-1 bg-gray-800" />
            </div>
          )}

          {/* Nose */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-300 rounded-full" />

          {/* Mouth */}
          <div 
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-6 h-3 rounded-full border-2 border-black"
            style={{ backgroundColor: appearance.face.mouth.color }}
          />

          {/* Hat */}
          {accessories.head_accessories.hat.has_hat && (
            <div 
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-8 rounded-t-lg border-2 border-black"
              style={{ backgroundColor: accessories.head_accessories.hat.color }}
            />
          )}
        </div>

        {/* Body */}
        <div className="relative mt-4">
          {/* Torso */}
          <div 
            className="w-28 h-32 mx-auto border-4 border-black rounded-lg"
            style={{ backgroundColor: clothing.top.color }}
          >
            {/* Logo or Pattern */}
            {clothing.top.has_logo && (
              <div className="text-center pt-8 text-xs font-bold text-white">
                {clothing.top.logo_text}
              </div>
            )}
          </div>

          {/* Arms */}
          <div 
            className="absolute top-2 -left-6 w-6 h-20 border-4 border-black rounded-full"
            style={{ backgroundColor: clothing.top.color }}
          />
          <div 
            className="absolute top-2 -right-6 w-6 h-20 border-4 border-black rounded-full"
            style={{ backgroundColor: clothing.top.color }}
          />
          
          {/* Hands */}
          <div 
            className="absolute top-16 -left-8 w-4 h-4 border-2 border-black rounded-full"
            style={{ backgroundColor: appearance.face.skin_color }}
          />
          <div 
            className="absolute top-16 -right-8 w-4 h-4 border-2 border-black rounded-full"
            style={{ backgroundColor: appearance.face.skin_color }}
          />
        </div>

        {/* Legs */}
        <div className="relative mt-2">
          <div 
            className="w-28 h-24 mx-auto border-4 border-black rounded-lg"
            style={{ backgroundColor: clothing.bottom.color }}
          />
          
          {/* Belt */}
          {clothing.bottom.has_belt && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-brown-600 border border-black" />
          )}
        </div>

        {/* Feet */}
        <div className="relative mt-2 flex justify-center gap-4">
          <div 
            className="w-8 h-6 border-2 border-black rounded"
            style={{ backgroundColor: clothing.shoes.color }}
          />
          <div 
            className="w-8 h-6 border-2 border-black rounded"
            style={{ backgroundColor: clothing.shoes.color }}
          />
        </div>

        {/* Accessories */}
        {accessories.body_accessories.necklace.has_necklace && (
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gold-400 rounded-full" />
        )}
      </div>

      {/* Character Stats */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full border-2 border-blue-400 text-xs">
        <div className="flex gap-4">
          <span>❤️ {characterData.game_stats.health}</span>
          <span>😊 {characterData.game_stats.happiness}</span>
          <span>⭐ {characterData.game_stats.popularity}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;
