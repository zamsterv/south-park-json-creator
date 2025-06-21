
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
  const updateData = (path: string, value: any) => {
    const newData = { ...characterData };
    const keys = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setCharacterData(newData);
  };

  const hairStyles = ["basico", "afro", "coletas", "mohawk", "calvo", "rizado", "liso", "ondulado", "trenzas", "punk"];
  const hairColors = ["#8B4513", "#000000", "#FFD700", "#FF6347", "#8A2BE2", "#00FF00", "#FF69B4", "#00FFFF", "#FFA500", "#FFFFFF"];
  const clothingColors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFC0CB", "#A52A2A"];
  const skinColors = ["#FFDBAC", "#F4C2A1", "#D2B48C", "#DEB887", "#CD853F", "#8B4513", "#A0522D", "#D2691E", "#BC8F8F", "#F5DEB3"];

  return (
    <Tabs defaultValue="basics" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="basics">👤 Básico</TabsTrigger>
        <TabsTrigger value="appearance">👀 Apariencia</TabsTrigger>
        <TabsTrigger value="clothing">👕 Ropa</TabsTrigger>
        <TabsTrigger value="accessories">💎 Accesorios</TabsTrigger>
        <TabsTrigger value="special">⚡ Especial</TabsTrigger>
      </TabsList>

      {/* Básico */}
      <TabsContent value="basics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Personaje</Label>
              <Input
                id="name"
                value={characterData.nombre}
                onChange={(e) => updateData('nombre', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Género</Label>
              <Select value={characterData.informacion_personal.genero} onValueChange={(value) => updateData('informacion_personal.genero', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hombre">👦 Hombre</SelectItem>
                  <SelectItem value="mujer">👧 Mujer</SelectItem>
                  <SelectItem value="indefinido">🤷 Indefinido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Edad (opcional)</Label>
              <Input
                type="number"
                value={characterData.informacion_personal.edad || ''}
                onChange={(e) => updateData('informacion_personal.edad', e.target.value ? parseInt(e.target.value) : null)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="catchphrase">Frase Característica</Label>
              <Input
                id="catchphrase"
                value={characterData.informacion_personal.frase_caracteristica}
                onChange={(e) => updateData('informacion_personal.frase_caracteristica', e.target.value)}
                placeholder="¡Oh, Dios mío! ¡Mataron a Kenny!"
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_student"
                checked={characterData.informacion_personal.es_estudiante}
                onCheckedChange={(checked) => updateData('informacion_personal.es_estudiante', checked)}
              />
              <Label htmlFor="is_student">¿Es estudiante?</Label>
            </div>

            {characterData.informacion_personal.es_estudiante && (
              <div>
                <Label>Grado Escolar: {characterData.informacion_personal.grado_escolar}</Label>
                <Slider
                  value={[characterData.informacion_personal.grado_escolar]}
                  onValueChange={(value) => updateData('informacion_personal.grado_escolar', value[0])}
                  max={12}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Apariencia */}
      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Cabello</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Estilo de Cabello</Label>
              <Select value={characterData.apariencia.cabello.estilo} onValueChange={(value) => updateData('apariencia.cabello.estilo', value)}>
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
                    onClick={() => updateData('apariencia.cabello.color', color)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Longitud</Label>
              <Select value={characterData.apariencia.cabello.longitud} onValueChange={(value) => updateData('apariencia.cabello.longitud', value)}>
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
                    onClick={() => updateData('apariencia.rostro.color_piel', color)}
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
                    onClick={() => updateData('apariencia.rostro.ojos.color', color)}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_freckles"
                  checked={characterData.apariencia.rostro.caracteristicas_faciales.tiene_pecas}
                  onCheckedChange={(checked) => updateData('apariencia.rostro.caracteristicas_faciales.tiene_pecas', checked)}
                />
                <Label htmlFor="has_freckles">Pecas</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_dimples"
                  checked={characterData.apariencia.rostro.caracteristicas_faciales.tiene_hoyuelos}
                  onCheckedChange={(checked) => updateData('apariencia.rostro.caracteristicas_faciales.tiene_hoyuelos', checked)}
                />
                <Label htmlFor="has_dimples">Hoyuelos</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_braces"
                  checked={characterData.apariencia.rostro.boca.tiene_frenos}
                  onCheckedChange={(checked) => updateData('apariencia.rostro.boca.tiene_frenos', checked)}
                />
                <Label htmlFor="has_braces">Frenos</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_makeup"
                  checked={characterData.apariencia.rostro.caracteristicas_faciales.tiene_maquillaje}
                  onCheckedChange={(checked) => updateData('apariencia.rostro.caracteristicas_faciales.tiene_maquillaje', checked)}
                />
                <Label htmlFor="has_makeup">Maquillaje</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Ropa */}
      <TabsContent value="clothing" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Parte Superior</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tipo de Prenda</Label>
              <Select value={characterData.vestimenta.parte_superior.tipo} onValueChange={(value) => updateData('vestimenta.parte_superior.tipo', value)}>
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
                    onClick={() => updateData('vestimenta.parte_superior.color', color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_logo"
                checked={characterData.vestimenta.parte_superior.tiene_logo}
                onCheckedChange={(checked) => updateData('vestimenta.parte_superior.tiene_logo', checked)}
              />
              <Label htmlFor="has_logo">¿Tiene logo?</Label>
            </div>

            {characterData.vestimenta.parte_superior.tiene_logo && (
              <div>
                <Label htmlFor="logo_text">Texto del Logo</Label>
                <Input
                  id="logo_text"
                  value={characterData.vestimenta.parte_superior.texto_logo}
                  onChange={(e) => updateData('vestimenta.parte_superior.texto_logo', e.target.value)}
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
              <Select value={characterData.vestimenta.parte_inferior.tipo} onValueChange={(value) => updateData('vestimenta.parte_inferior.tipo', value)}>
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
                    onClick={() => updateData('vestimenta.parte_inferior.color', color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_belt"
                checked={characterData.vestimenta.parte_inferior.tiene_cinturon}
                onCheckedChange={(checked) => updateData('vestimenta.parte_inferior.tiene_cinturon', checked)}
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
              <Select value={characterData.vestimenta.zapatos.tipo} onValueChange={(value) => updateData('vestimenta.zapatos.tipo', value)}>
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
                    onClick={() => updateData('vestimenta.zapatos.color', color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_laces"
                checked={characterData.vestimenta.zapatos.tiene_cordones}
                onCheckedChange={(checked) => updateData('vestimenta.zapatos.tiene_cordones', checked)}
              />
              <Label htmlFor="has_laces">¿Tiene cordones?</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Accesorios */}
      <TabsContent value="accessories" className="space-y-4">
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
                  updateData('accesorios.accesorios_cabeza.sombrero.tiene_sombrero', checked);
                  if (checked) {
                    updateData('accesorios.accesorios_cabeza.sombrero.tipo', 'gorra');
                    updateData('accesorios.accesorios_cabeza.sombrero.color', '#FF0000');
                  } else {
                    updateData('accesorios.accesorios_cabeza.sombrero.tipo', null);
                    updateData('accesorios.accesorios_cabeza.sombrero.color', null);
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
                    onValueChange={(value) => updateData('accesorios.accesorios_cabeza.sombrero.tipo', value)}
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
                        onClick={() => updateData('accesorios.accesorios_cabeza.sombrero.color', color)}
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
                  updateData('accesorios.accesorios_cabeza.lentes.tiene_lentes', checked);
                  if (checked) {
                    updateData('accesorios.accesorios_cabeza.lentes.tipo', 'normales');
                    updateData('accesorios.accesorios_cabeza.lentes.color', '#000000');
                  } else {
                    updateData('accesorios.accesorios_cabeza.lentes.tipo', null);
                    updateData('accesorios.accesorios_cabeza.lentes.color', null);
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
                  onValueChange={(value) => updateData('accesorios.accesorios_cabeza.lentes.tipo', value)}
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
                  updateData('accesorios.accesorios_cuerpo.collar.tiene_collar', checked);
                  if (checked) {
                    updateData('accesorios.accesorios_cuerpo.collar.tipo', 'cadena');
                    updateData('accesorios.accesorios_cuerpo.collar.material', 'oro');
                  } else {
                    updateData('accesorios.accesorios_cuerpo.collar.tipo', null);
                    updateData('accesorios.accesorios_cuerpo.collar.material', null);
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
                  updateData('accesorios.accesorios_cuerpo.reloj.tiene_reloj', checked);
                  if (checked) {
                    updateData('accesorios.accesorios_cuerpo.reloj.tipo', 'digital');
                    updateData('accesorios.accesorios_cuerpo.reloj.color', '#000000');
                  } else {
                    updateData('accesorios.accesorios_cuerpo.reloj.tipo', null);
                    updateData('accesorios.accesorios_cuerpo.reloj.color', null);
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
                  updateData('accesorios.accesorios_cuerpo.pulsera.tiene_pulsera', checked);
                  if (checked) {
                    updateData('accesorios.accesorios_cuerpo.pulsera.tipo', 'pulsera');
                    updateData('accesorios.accesorios_cuerpo.pulsera.cantidad', 1);
                  } else {
                    updateData('accesorios.accesorios_cuerpo.pulsera.tipo', null);
                    updateData('accesorios.accesorios_cuerpo.pulsera.cantidad', 0);
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
                  onValueChange={(value) => updateData('accesorios.accesorios_cuerpo.pulsera.cantidad', value[0])}
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

      {/* Especiales */}
      <TabsContent value="special" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Características Especiales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_superhero"
                checked={characterData.caracteristicas_especiales.es_superheroe}
                onCheckedChange={(checked) => {
                  updateData('caracteristicas_especiales.es_superheroe', checked);
                  if (checked) {
                    updateData('caracteristicas_especiales.nombre_superheroe', 'Super ' + characterData.nombre);
                    updateData('caracteristicas_especiales.tiene_poderes', true);
                    updateData('caracteristicas_especiales.lista_poderes', ['volar', 'fuerza_super']);
                  } else {
                    updateData('caracteristicas_especiales.nombre_superheroe', null);
                    updateData('caracteristicas_especiales.tiene_poderes', false);
                    updateData('caracteristicas_especiales.lista_poderes', []);
                  }
                }}
              />
              <Label htmlFor="is_superhero">¿Es un superhéroe?</Label>
            </div>

            {characterData.caracteristicas_especiales.es_superheroe && (
              <div>
                <Label htmlFor="superhero_name">Nombre de Superhéroe</Label>
                <Input
                  id="superhero_name"
                  value={characterData.caracteristicas_especiales.nombre_superheroe || ''}
                  onChange={(e) => updateData('caracteristicas_especiales.nombre_superheroe', e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_alien"
                  checked={characterData.caracteristicas_especiales.es_alienigena}
                  onCheckedChange={(checked) => updateData('caracteristicas_especiales.es_alienigena', checked)}
                />
                <Label htmlFor="is_alien">¿Es alien?</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_robot"
                  checked={characterData.caracteristicas_especiales.es_robot}
                  onCheckedChange={(checked) => updateData('caracteristicas_especiales.es_robot', checked)}
                />
                <Label htmlFor="is_robot">¿Es robot?</Label>
              </div>
            </div>

            <div>
              <Label>Transparencia: {Math.round(characterData.caracteristicas_especiales.nivel_transparencia * 100)}%</Label>
              <Slider
                value={[characterData.caracteristicas_especiales.nivel_transparencia]}
                onValueChange={(value) => updateData('caracteristicas_especiales.nivel_transparencia', value[0])}
                max={1}
                min={0}
                step={0.1}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas del Juego</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nivel: {characterData.estadisticas_juego.nivel}</Label>
              <Slider
                value={[characterData.estadisticas_juego.nivel]}
                onValueChange={(value) => updateData('estadisticas_juego.nivel', value[0])}
                max={99}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Experiencia: {characterData.estadisticas_juego.puntos_experiencia}</Label>
              <Slider
                value={[characterData.estadisticas_juego.puntos_experiencia]}
                onValueChange={(value) => updateData('estadisticas_juego.puntos_experiencia', value[0])}
                max={10000}
                min={0}
                step={100}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Vida: {characterData.estadisticas_juego.salud}</Label>
                <Slider
                  value={[characterData.estadisticas_juego.salud]}
                  onValueChange={(value) => updateData('estadisticas_juego.salud', value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Energía: {characterData.estadisticas_juego.energia}</Label>
                <Slider
                  value={[characterData.estadisticas_juego.energia]}
                  onValueChange={(value) => updateData('estadisticas_juego.energia', value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Felicidad: {characterData.estadisticas_juego.felicidad}</Label>
                <Slider
                  value={[characterData.estadisticas_juego.felicidad]}
                  onValueChange={(value) => updateData('estadisticas_juego.felicidad', value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Popularidad: {characterData.estadisticas_juego.popularidad}</Label>
                <Slider
                  value={[characterData.estadisticas_juego.popularidad]}
                  onValueChange={(value) => updateData('estadisticas_juego.popularidad', value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CharacterControls;
