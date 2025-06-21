
import { useState } from 'react';
import { CharacterData } from '../types/character';
import { Button } from '@/components/ui/button';
import { Copy, Download, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JsonPanelProps {
  characterData: CharacterData;
}

const JsonPanel = ({ characterData }: JsonPanelProps) => {
  const [isFormatted, setIsFormatted] = useState(true);
  const [showTypes, setShowTypes] = useState(true);
  const { toast } = useToast();

  const jsonString = isFormatted 
    ? JSON.stringify(characterData, null, 2)
    : JSON.stringify(characterData);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    toast({
      title: "¡Copiado! 📋",
      description: "El JSON se ha copiado al portapapeles",
    });
  };

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personaje-${characterData.nombre.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "¡Descargado! 💾",
      description: "El archivo JSON se ha descargado",
    });
  };

  const getJsonWithTypes = () => {
    const lines = jsonString.split('\n');
    return lines.map((line, index) => {
      let typeIndicator = '';
      
      if (line.includes(': "') && !line.includes('": "')) {
        typeIndicator = ' // String 📝';
      } else if (line.includes(': ') && /: \d+[,\s]*$/.test(line)) {
        typeIndicator = ' // Number 🔢';
      } else if (line.includes(': true') || line.includes(': false')) {
        typeIndicator = ' // Boolean ✅';
      } else if (line.includes(': null')) {
        typeIndicator = ' // Null ❌';
      } else if (line.includes('[')) {
        typeIndicator = ' // Array 📋';
      } else if (line.includes('{') && !line.includes('":')) {
        typeIndicator = ' // Object 🏗️';
      }

      return (
        <div key={index} className="flex">
          <span className="text-gray-300">{line}</span>
          {showTypes && typeIndicator && (
            <span className="text-green-400 text-xs ml-2 opacity-75">
              {typeIndicator}
            </span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">🔍 Panel JSON Interactivo</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowTypes(!showTypes)}
              className="text-xs"
            >
              {showTypes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              Tipos
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={copyToClipboard}
              className="text-xs"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={downloadJson}
              className="text-xs"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={isFormatted ? "default" : "outline"}
            onClick={() => setIsFormatted(true)}
            className="text-xs"
          >
            Formateado
          </Button>
          <Button
            size="sm"
            variant={!isFormatted ? "default" : "outline"}
            onClick={() => setIsFormatted(false)}
            className="text-xs"
          >
            Comprimido
          </Button>
        </div>
      </div>

      {/* JSON Content */}
      <div className="flex-1 json-panel p-4 overflow-auto rounded-b-xl">
        <div className="bg-gray-800 rounded p-4 h-full overflow-auto">
          <pre className="text-sm font-mono leading-relaxed">
            {showTypes && isFormatted ? getJsonWithTypes() : (
              <code className="text-gray-300">{jsonString}</code>
            )}
          </pre>
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-gray-100 p-3 rounded-b-xl border-t-2 border-blue-400">
        <div className="text-xs text-gray-600 grid grid-cols-2 gap-2">
          <div>📊 <strong>Propiedades:</strong> {Object.keys(JSON.parse(jsonString)).length}</div>
          <div>💾 <strong>Tamaño:</strong> {new Blob([jsonString]).size} bytes</div>
          <div>🔧 <strong>Formato:</strong> {isFormatted ? 'Legible' : 'Compacto'}</div>
          <div>👁️ <strong>Tipos:</strong> {showTypes ? 'Visible' : 'Oculto'}</div>
        </div>
      </div>
    </div>
  );
};

export default JsonPanel;
