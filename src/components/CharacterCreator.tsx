
import { CharacterData } from '../types/character';
import CharacterDisplay from './CharacterDisplay';
import CharacterControls from './CharacterControls';

interface CharacterCreatorProps {
  characterData: CharacterData;
  setCharacterData: (data: CharacterData) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CharacterCreator = ({ characterData, setCharacterData, activeTab, setActiveTab }: CharacterCreatorProps) => {
  return (
    <div className="space-y-6">
      {/* Character Display */}
      <div className="character-canvas rounded-xl p-6 border-2 border-orange-300">
        <CharacterDisplay characterData={characterData} />
      </div>

      {/* Character Controls */}
      <div className="space-y-4">
        <CharacterControls 
          characterData={characterData} 
          setCharacterData={setCharacterData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default CharacterCreator;
