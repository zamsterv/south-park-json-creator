
import React, { useState } from 'react';
import { CharacterData } from '../types/character';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface CharacterControlsProps {
  characterData: CharacterData;
  setCharacterData: (data: CharacterData) => void;
}

const CharacterControls = ({ characterData, setCharacterData }: CharacterControlsProps) => {
  const [activeTab, setActiveTab] = useState('basico');

  const updateCharacter = (path: string, value: any) => {
    const newData = { ...characterData };
    const keys = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setCharacterData(newData);
  };

  const addToArray = (path: string, value: any) => {
    const newData = { ...characterData };
    const keys = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], value];
    setCharacterData(newData);
  };

  const removeFromArray = (path: string, index: number) => {
    const newData = { ...characterData };
    const keys = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_, i) => i !== index);
    setCharacterData(newData);
  };

  const hairStyles = ["basico", "afro", "coletas", "mohawk", "calvo", "rizado", "liso", "ondulado", "trenzas", "punk"];
  const hairColors = ["#8B4513", "#000000", "#FFD700", "#FF6347", "#8A2BE2", "#00FF00", "#FF69B4", "#00FFFF", "#FFA500", "#FFFFFF"];
  const clothingColors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFC0CB", "#A52A2A"];
  const skinColors = ["#FFDBAC", "#F4C2A1", "#D2B48C", "#DEB887", "#CD853F", "#8B4513", "#A0522D", "#D2691E", "#BC8F8F", "#F5DEB3"];

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basico">👤 Básico</TabsTrigger>
          <TabsTrigger value="apariencia">🎨 Apariencia</TabsTrigger>
          <TabsTrigger value="vestimenta">👕 Vestimenta</TabsTrigger>
          <TabsTrigger value="extras">⭐ Extras</TabsTrigger>
        </TabsList>

        <TabsContent value="basico">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del Personaje</label>
              <input
                type="text"
                value={characterData.nombre}
                onChange={(e) => updateCharacter('nombre', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Género */}
            <div>
              <label className="block text-sm font-medium mb-2">Género</label>
              <select
                value={characterData.informacion_personal.genero}
                onChange={(e) => updateCharacter('informacion_personal.genero', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="indefinido">Indefinido</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
            </div>

            {/* Edad */}
            <div>
              <label className="block text-sm font-medium mb-2">Edad</label>
              <input
                type="number"
                value={characterData.informacion_personal.edad || ''}
                onChange={(e) => updateCharacter('informacion_personal.edad', e.target.value ? parseInt(e.target.value) : null)}
                className="w-full p-2 border rounded"
                min="1"
                max="100"
              />
            </div>

            {/* Grado Escolar */}
            <div>
              <label className="block text-sm font-medium mb-2">Grado Escolar</label>
              <input
                type="number"
                value={characterData.informacion_personal.grado_escolar}
                onChange={(e) => updateCharacter('informacion_personal.grado_escolar', parseInt(e.target.value))}
                className="w-full p-2 border rounded"
                min="1"
                max="12"
              />
            </div>

            {/* Rasgos de Personalidad */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Rasgos de Personalidad</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="nuevo-rasgo"
                    placeholder="Ej: divertido, inteligente, tímido..."
                    className="flex-1 p-2 border rounded"
                  />
                  <Button
                    onClick={() => {
                      const input = document.getElementById('nuevo-rasgo') as HTMLInputElement;
                      if (input?.value.trim()) {
                        addToArray('informacion_personal.rasgos_personalidad', input.value.trim());
                        input.value = '';
                      }
                    }}
                    size="sm"
                  >
                    Añadir
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {characterData.informacion_personal.rasgos_personalidad.map((rasgo, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                      {rasgo}
                      <button
                        onClick={() => removeFromArray('informacion_personal.rasgos_personalidad', index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actividades Favoritas */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Actividades Favoritas</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="nueva-actividad"
                    placeholder="Ej: videojuegos, deportes, leer..."
                    className="flex-1 p-2 border rounded"
                  />
                  <Button
                    onClick={() => {
                      const input = document.getElementById('nueva-actividad') as HTMLInputElement;
                      if (input?.value.trim()) {
                        addToArray('informacion_personal.actividades_favoritas', input.value.trim());
                        input.value = '';
                      }
                    }}
                    size="sm"
                  >
                    Añadir
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {characterData.informacion_personal.actividades_favoritas.map((actividad, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                      {actividad}
                      <button
                        onClick={() => removeFromArray('informacion_personal.actividades_favoritas', index)}
                        className="text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Frase Característica */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Frase Característica</label>
              <input
                type="text"
                value={characterData.informacion_personal.frase_caracteristica}
                onChange={(e) => updateCharacter('informacion_personal.frase_caracteristica', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ej: ¡Oh Dios mío, mataron a Kenny!"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="apariencia">
          <Card>
            <CardHeader>
              <CardTitle>Cabello</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Estilo de Cabello</Label>
                <Select value={characterData.apariencia.cabello.estilo} onValueChange={(value) => updateCharacter('apariencia.cabello.estilo', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hairStyles.map(style => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Color de Cabello</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {hairColors.map(color => (
                    <Button
                      key={color}
                      className="w-12 h-12 rounded-full border-2"
                      style={{ backgroundColor: color }}
                      variant={characterData.apariencia.cabello.color === color ? "default" : "outline"}
                      onClick={() => updateCharacter('apariencia.cabello.color', color)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label>Longitud</Label>
                <Select value={characterData.apariencia.cabello.longitud} onValueChange={(value) => updateCharacter('apariencia.cabello.longitud', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corto">Corto</SelectItem>
                    <SelectItem value="mediano">Mediano</SelectItem>
                    <SelectItem value="largo">Largo</SelectItem>
                    <SelectItem value="muy_largo">Muy Largo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rostro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Color de Piel</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {skinColors.map(color => (
                    <Button
                      key={color}
                      className="w-12 h-12 rounded-full border-2"
                      style={{ backgroundColor: color }}
                      variant={characterData.apariencia.rostro.color_piel === color ? "default" : "outline"}
                      onClick={() => updateCharacter('apariencia.rostro.color_piel', color)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label>Color de Ojos</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {["#000000", "#8B4513", "#0000FF", "#00FF00", "#808080", "#800080", "#FFA500", "#FF0000", "#FFFF00", "#00FFFF"].map(color => (
                    <Button
                      key={color}
                      className="w-12 h-12 rounded-full border-2"
                      style={{ backgroundColor: color }}
                      variant={characterData.apariencia.rostro.ojos.color === color ? "default" : "outline"}
                      onClick={() => updateCharacter('apariencia.rostro.ojos.color', color)}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_freckles"
                    checked={characterData.apariencia.rostro.caracteristicas_faciales.tiene_pecas}
                    onCheckedChange={(checked) => updateCharacter('apariencia.rostro.caracteristicas_faciales.tiene_pecas', checked)}
                  />
                  <Label htmlFor="has_freckles">Pecas</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_dimples"
                    checked={characterData.apariencia.rostro.caracteristicas_faciales.tiene_hoyuelos}
                    onCheckedChange={(checked) => updateCharacter('apariencia.rostro.caracteristicas_faciales.tiene_hoyuelos', checked)}
                  />
                  <Label htmlFor="has_dimples">Hoyuelos</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_braces"
                    checked={characterData.apariencia.rostro.boca.tiene_frenos}
                    onCheckedChange={(checked) => updateCharacter('apariencia.rostro.boca.tiene_frenos', checked)}
                  />
                  <Label htmlFor="has_braces">Frenos</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_makeup"
                    checked={characterData.apariencia.rostro.caracteristicas_faciales.tiene_maquillaje}
                    onCheckedChange={(checked) => updateCharacter('apariencia.rostro.caracteristicas_faciales.tiene_maquillaje', checked)}
                  />
                  <Label htmlFor="has_makeup">Maquillaje</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vestimenta">
          <Card>
            <CardHeader>
              <CardTitle>Parte Superior</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tipo de Prenda</Label>
                <Select value={characterData.vestimenta.parte_superior.tipo} onValueChange={(value) => updateCharacter('vestimenta.parte_superior.tipo', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camiseta">Camiseta</SelectItem>
                    <SelectItem value="sudadera">Sudadera</SelectItem>
                    <SelectItem value="chaqueta">Chaqueta</SelectItem>
                    <SelectItem value="camisa">Camisa</SelectItem>
                    <SelectItem value="tank_top">Tank Top</SelectItem>
                    <SelectItem value="hoodie">Hoodie</SelectItem>
                    <SelectItem value="blusa">Blusa</SelectItem>
                    <SelectItem value="vestido">Vestido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Color</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {clothingColors.map(color => (
                    <Button
                      key={color}
                      className="w-12 h-12 rounded-full border-2"
                      style={{ backgroundColor: color }}
                      variant={characterData.vestimenta.parte_superior.color === color ? "default" : "outline"}
                      onClick={() => updateCharacter('vestimenta.parte_superior.color', color)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_logo"
                  checked={characterData.vestimenta.parte_superior.tiene_logo}
                  onCheckedChange={(checked) => updateCharacter('vestimenta.parte_superior.tiene_logo', checked)}
                />
                <Label htmlFor="has_logo">¿Tiene logo?</Label>
              </div>

              {characterData.vestimenta.parte_superior.tiene_logo && (
                <div>
                  <Label htmlFor="logo_text">Texto del Logo</Label>
                  <input
                    id="logo_text"
                    value={characterData.vestimenta.parte_superior.texto_logo}
                    onChange={(e) => updateCharacter('vestimenta.parte_superior.texto_logo', e.target.value)}
                    placeholder="SP"
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parte Inferior</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tipo de Prenda</Label>
                <Select value={characterData.vestimenta.parte_inferior.tipo} onValueChange={(value) => updateCharacter('vestimenta.parte_inferior.tipo', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pantalones">Pantalones</SelectItem>
                    <SelectItem value="shorts">Shorts</SelectItem>
                    <SelectItem value="falda">Falda</SelectItem>
                    <SelectItem value="jeans">Jeans</SelectItem>
                    <SelectItem value="leggings">Leggings</SelectItem>
                    <SelectItem value="pijama">Pijama</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Color</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {clothingColors.map(color => (
                    <Button
                      key={color}
                      className="w-12 h-12 rounded-full border-2"
                      style={{ backgroundColor: color }}
                      variant={characterData.vestimenta.parte_inferior.color === color ? "default" : "outline"}
                      onClick={() => updateCharacter('vestimenta.parte_inferior.color', color)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_belt"
                  checked={characterData.vestimenta.parte_inferior.tiene_cinturon}
                  onCheckedChange={(checked) => updateCharacter('vestimenta.parte_inferior.tiene_cinturon', checked)}
                />
                <Label htmlFor="has_belt">¿Tiene cinturón?</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calzado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tipo de Zapatos</Label>
                <Select value={characterData.vestimenta.zapatos.tipo} onValueChange={(value) => updateCharacter('vestimenta.zapatos.tipo', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tenis">Tenis</SelectItem>
                    <SelectItem value="botas">Botas</SelectItem>
                    <SelectItem value="zapatos">Zapatos Formales</SelectItem>
                    <SelectItem value="sandalias">Sandalias</SelectItem>
                    <SelectItem value="converse">Converse</SelectItem>
                    <SelectItem value="deportivos">Deportivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Color de Zapatos</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#8B4513", "#808080", "#FFA500", "#00FF00", "#FF69B4", "#800080"].map(color => (
                    <Button
                      key={color}
                      className="w-12 h-12 rounded-full border-2"
                      style={{ backgroundColor: color }}
                      variant={characterData.vestimenta.zapatos.color === color ? "default" : "outline"}
                      onClick={() => updateCharacter('vestimenta.zapatos.color', color)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_laces"
                  checked={characterData.vestimenta.zapatos.tiene_cordones}
                  onCheckedChange={(checked) => updateCharacter('vestimenta.zapatos.tiene_cordones', checked)}
                />
                <Label htmlFor="has_laces">¿Tiene cordones?</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extras">
          <Card>
            <CardHeader>
              <CardTitle>Accesorios de Cabeza</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_hat"
                  checked={characterData.accesorios.accesorios_cabeza.sombrero.tiene_sombrero}
                  onCheckedChange={(checked) => {
                    updateCharacter('accesorios.accesorios_cabeza.sombrero.tiene_sombrero', checked);
                    if (checked) {
                      updateCharacter('accesorios.accesorios_cabeza.sombrero.tipo', 'gorra');
                      updateCharacter('accesorios.accesorios_cabeza.sombrero.color', '#FF0000');
                    } else {
                      updateCharacter('accesorios.accesorios_cabeza.sombrero.tipo', null);
                      updateCharacter('accesorios.accesorios_cabeza.sombrero.color', null);
                    }
                  }}
                />
                <Label htmlFor="has_hat">¿Usa gorro/sombrero?</Label>
              </div>

              {characterData.accesorios.accesorios_cabeza.sombrero.tiene_sombrero && (
                <>
                  <div>
                    <Label>Tipo de Gorro</Label>
                    <Select 
                      value={characterData.accesorios.accesorios_cabeza.sombrero.tipo || ''} 
                      onValueChange={(value) => updateCharacter('accesorios.accesorios_cabeza.sombrero.tipo', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gorra">Gorra</SelectItem>
                        <SelectItem value="beanie">Beanie</SelectItem>
                        <SelectItem value="sombrero">Sombrero</SelectItem>
                        <SelectItem value="casco">Casco</SelectItem>
                        <SelectItem value="tiara">Tiara</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Color del Gorro</Label>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {clothingColors.map(color => (
                        <Button
                          key={color}
                          className="w-12 h-12 rounded-full border-2"
                          style={{ backgroundColor: color }}
                          variant={characterData.accesorios.accesorios_cabeza.sombrero.color === color ? "default" : "outline"}
                          onClick={() => updateCharacter('accesorios.accesorios_cabeza.sombrero.color', color)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_glasses"
                  checked={characterData.accesorios.accesorios_cabeza.lentes.tiene_lentes}
                  onCheckedChange={(checked) => {
                    updateCharacter('accesorios.accesorios_cabeza.lentes.tiene_lentes', checked);
                    if (checked) {
                      updateCharacter('accesorios.accesorios_cabeza.lentes.tipo', 'normales');
                      updateCharacter('accesorios.accesorios_cabeza.lentes.color', '#000000');
                    } else {
                      updateCharacter('accesorios.accesorios_cabeza.lentes.tipo', null);
                      updateCharacter('accesorios.accesorios_cabeza.lentes.color', null);
                    }
                  }}
                />
                <Label htmlFor="has_glasses">¿Usa lentes?</Label>
              </div>

              {characterData.accesorios.accesorios_cabeza.lentes.tiene_lentes && (
                <div>
                  <Label>Tipo de Lentes</Label>
                  <Select 
                    value={characterData.accesorios.accesorios_cabeza.lentes.tipo || ''} 
                    onValueChange={(value) => updateCharacter('accesorios.accesorios_cabeza.lentes.tipo', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normales">Normales</SelectItem>
                      <SelectItem value="sol">De Sol</SelectItem>
                      <SelectItem value="lectura">De Lectura</SelectItem>
                      <SelectItem value="deportivos">Deportivos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accesorios del Cuerpo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_necklace"
                  checked={characterData.accesorios.accesorios_cuerpo.collar.tiene_collar}
                  onCheckedChange={(checked) => {
                    updateCharacter('accesorios.accesorios_cuerpo.collar.tiene_collar', checked);
                    if (checked) {
                      updateCharacter('accesorios.accesorios_cuerpo.collar.tipo', 'cadena');
                      updateCharacter('accesorios.accesorios_cuerpo.collar.material', 'oro');
                    } else {
                      updateCharacter('accesorios.accesorios_cuerpo.collar.tipo', null);
                      updateCharacter('accesorios.accesorios_cuerpo.collar.material', null);
                    }
                  }}
                />
                <Label htmlFor="has_necklace">¿Usa collar?</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_watch"
                  checked={characterData.accesorios.accesorios_cuerpo.reloj.tiene_reloj}
                  onCheckedChange={(checked) => {
                    updateCharacter('accesorios.accesorios_cuerpo.reloj.tiene_reloj', checked);
                    if (checked) {
                      updateCharacter('accesorios.accesorios_cuerpo.reloj.tipo', 'digital');
                      updateCharacter('accesorios.accesorios_cuerpo.reloj.color', '#000000');
                    } else {
                      updateCharacter('accesorios.accesorios_cuerpo.reloj.tipo', null);
                      updateCharacter('accesorios.accesorios_cuerpo.reloj.color', null);
                    }
                  }}
                />
                <Label htmlFor="has_watch">¿Usa reloj?</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_bracelet"
                  checked={characterData.accesorios.accesorios_cuerpo.pulsera.tiene_pulsera}
                  onCheckedChange={(checked) => {
                    updateCharacter('accesorios.accesorios_cuerpo.pulsera.tiene_pulsera', checked);
                    if (checked) {
                      updateCharacter('accesorios.accesorios_cuerpo.pulsera.tipo', 'pulsera');
                      updateCharacter('accesorios.accesorios_cuerpo.pulsera.cantidad', 1);
                    } else {
                      updateCharacter('accesorios.accesorios_cuerpo.pulsera.tipo', null);
                      updateCharacter('accesorios.accesorios_cuerpo.pulsera.cantidad', 0);
                    }
                  }}
                />
                <Label htmlFor="has_bracelet">¿Usa pulseras?</Label>
              </div>

              {characterData.accesorios.accesorios_cuerpo.pulsera.tiene_pulsera && (
                <div>
                  <Label>Número de Pulseras: {characterData.accesorios.accesorios_cuerpo.pulsera.cantidad}</Label>
                  <Slider
                    value={[characterData.accesorios.accesorios_cuerpo.pulsera.cantidad]}
                    onValueChange={(value) => updateCharacter('accesorios.accesorios_cuerpo.pulsera.cantidad', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CharacterControls;
