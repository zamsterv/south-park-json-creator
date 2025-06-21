import { useState } from 'react';
import { CharacterData } from '../types/character';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JsonPanelProps {
  characterData: CharacterData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const JsonPanel = ({ characterData, activeTab, setActiveTab }: JsonPanelProps) => {
  const [isFormatted, setIsFormatted] = useState(true);
  const [showTypes, setShowTypes] = useState(true);
  const { toast } = useToast();

  const getJsonSection = (section: string) => {
    let sectionData;
    
    switch(section) {
      case 'basico':
        sectionData = {
          id: characterData.id,
          nombre: characterData.nombre,
          fecha_creacion: characterData.fecha_creacion,
          version: characterData.version,
          informacion_personal: characterData.informacion_personal
        };
        break;
      case 'apariencia':
        sectionData = {
          apariencia: characterData.apariencia
        };
        break;
      case 'vestimenta':
        sectionData = {
          vestimenta: characterData.vestimenta
        };
        break;
      case 'accesorios':
        sectionData = {
          accesorios: characterData.accesorios
        };
        break;
      case 'especial':
        sectionData = {
          caracteristicas_especiales: characterData.caracteristicas_especiales,
          estadisticas_juego: characterData.estadisticas_juego
        };
        break;
      case 'resumen':
      default:
        sectionData = characterData;
        break;
    }

    return isFormatted 
      ? JSON.stringify(sectionData, null, 2)
      : JSON.stringify(sectionData);
  };

  const jsonString = getJsonSection(activeTab);

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
    const fileName = activeTab === 'resumen' 
      ? `personaje-${characterData.nombre.replace(/\s+/g, '-')}-completo.json`
      : `personaje-${characterData.nombre.replace(/\s+/g, '-')}-${activeTab}.json`;
    a.download = fileName;
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
              className="text-xs text-black bg-white hover:bg-gray-100"
            >
              {showTypes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              Tipos
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={copyToClipboard}
              className="text-xs text-black bg-white hover:bg-gray-100"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={downloadJson}
              className="text-xs text-black bg-white hover:bg-gray-100"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 mb-3">
          <Button
            size="sm"
            variant={isFormatted ? "default" : "outline"}
            onClick={() => setIsFormatted(true)}
            className={`text-xs ${isFormatted ? 'bg-white text-black hover:bg-gray-100' : 'bg-transparent text-white border-white hover:bg-white hover:text-black'}`}
          >
            Formateado
          </Button>
          <Button
            size="sm"
            variant={!isFormatted ? "default" : "outline"}
            onClick={() => setIsFormatted(false)}
            className={`text-xs ${!isFormatted ? 'bg-white text-black hover:bg-gray-100' : 'bg-transparent text-white border-white hover:bg-white hover:text-black'}`}
          >
            Comprimido
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-6 bg-blue-500">
          <TabsTrigger value="basico" className="text-xs text-white data-[state=active]:bg-blue-300 data-[state=active]:text-black">📋 Básico</TabsTrigger>
          <TabsTrigger value="apariencia" className="text-xs text-white data-[state=active]:bg-blue-300 data-[state=active]:text-black">👤 Apariencia</TabsTrigger>
          <TabsTrigger value="vestimenta" className="text-xs text-white data-[state=active]:bg-blue-300 data-[state=active]:text-black">👕 Vestimenta</TabsTrigger>
          <TabsTrigger value="accesorios" className="text-xs text-white data-[state=active]:bg-blue-300 data-[state=active]:text-black">💍 Accesorios</TabsTrigger>
          <TabsTrigger value="especial" className="text-xs text-white data-[state=active]:bg-blue-300 data-[state=active]:text-black">⭐ Especial</TabsTrigger>
          <TabsTrigger value="resumen" className="text-xs text-white data-[state=active]:bg-blue-300 data-[state=active]:text-black">📄 Resumen</TabsTrigger>
        </TabsList>

        {/* Single TabsContent that updates based on activeTab */}
        <TabsContent value={activeTab} className="flex-1 m-0">
          <div className="json-panel p-4 overflow-auto h-full rounded-b-xl">
            <div className="bg-gray-800 rounded p-4 h-full overflow-auto">
              <pre className="text-sm font-mono leading-relaxed">
                {showTypes && isFormatted ? getJsonWithTypes() : (
                  <code className="text-gray-300">{jsonString}</code>
                )}
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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
