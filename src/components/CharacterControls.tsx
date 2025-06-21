
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
                value={characterData.name}
                onChange={(e) => updateData('name', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Género</Label>
              <Select value={characterData.personal_info.gender} onValueChange={(value) => updateData('personal_info.gender', value)}>
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
                value={characterData.personal_info.age || ''}
                onChange={(e) => updateData('personal_info.age', e.target.value ? parseInt(e.target.value) : null)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="catchphrase">Frase Característica</Label>
              <Input
                id="catchphrase"
                value={characterData.personal_info.catchphrase}
                onChange={(e) => updateData('personal_info.catchphrase', e.target.value)}
                placeholder="¡Oh, Dios mío! ¡Mataron a Kenny!"
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_student"
                checked={characterData.personal_info.is_student}
                onCheckedChange={(checked) => updateData('personal_info.is_student', checked)}
              />
              <Label htmlFor="is_student">¿Es estudiante?</Label>
            </div>

            {characterData.personal_info.is_student && (
              <div>
                <Label>Grado Escolar: {characterData.personal_info.grade_level}</Label>
                <Slider
                  value={[characterData.personal_info.grade_level]}
                  onValueChange={(value) => updateData('personal_info.grade_level', value[0])}
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
              <Select value={characterData.appearance.hair.style} onValueChange={(value) => updateData('appearance.hair.style', value)}>
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
                    variant={characterData.appearance.hair.color === color ? "default" : "outline"}
                    onClick={() => updateData('appearance.hair.color', color)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Longitud</Label>
              <Select value={characterData.appearance.hair.length} onValueChange={(value) => updateData('appearance.hair.length', value)}>
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
                    variant={characterData.appearance.face.skin_color === color ? "default" : "outline"}
                    onClick={() => updateData('appearance.face.skin_color', color)}
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
                    variant={characterData.appearance.face.eyes.color === color ? "default" : "outline"}
                    onClick={() => updateData('appearance.face.eyes.color', color)}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_freckles"
                  checked={characterData.appearance.face.facial_features.has_freckles}
                  onCheckedChange={(checked) => updateData('appearance.face.facial_features.has_freckles', checked)}
                />
                <Label htmlFor="has_freckles">Pecas</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_dimples"
                  checked={characterData.appearance.face.facial_features.has_dimples}
                  onCheckedChange={(checked) => updateData('appearance.face.facial_features.has_dimples', checked)}
                />
                <Label htmlFor="has_dimples">Hoyuelos</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_braces"
                  checked={characterData.appearance.face.mouth.has_braces}
                  onCheckedChange={(checked) => updateData('appearance.face.mouth.has_braces', checked)}
                />
                <Label htmlFor="has_braces">Frenos</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_makeup"
                  checked={characterData.appearance.face.facial_features.has_makeup}
                  onCheckedChange={(checked) => updateData('appearance.face.facial_features.has_makeup', checked)}
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
              <Select value={characterData.clothing.top.type} onValueChange={(value) => updateData('clothing.top.type', value)}>
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
                    variant={characterData.clothing.top.color === color ? "default" : "outline"}
                    onClick={() => updateData('clothing.top.color', color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_logo"
                checked={characterData.clothing.top.has_logo}
                onCheckedChange={(checked) => updateData('clothing.top.has_logo', checked)}
              />
              <Label htmlFor="has_logo">¿Tiene logo?</Label>
            </div>

            {characterData.clothing.top.has_logo && (
              <div>
                <Label htmlFor="logo_text">Texto del Logo</Label>
                <Input
                  id="logo_text"
                  value={characterData.clothing.top.logo_text}
                  onChange={(e) => updateData('clothing.top.logo_text', e.target.value)}
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
              <Select value={characterData.clothing.bottom.type} onValueChange={(value) => updateData('clothing.bottom.type', value)}>
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
                    variant={characterData.clothing.bottom.color === color ? "default" : "outline"}
                    onClick={() => updateData('clothing.bottom.color', color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_belt"
                checked={characterData.clothing.bottom.has_belt}
                onCheckedChange={(checked) => updateData('clothing.bottom.has_belt', checked)}
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
              <Select value={characterData.clothing.shoes.type} onValueChange={(value) => updateData('clothing.shoes.type', value)}>
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
                    variant={characterData.clothing.shoes.color === color ? "default" : "outline"}
                    onClick={() => updateData('clothing.shoes.color', color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_laces"
                checked={characterData.clothing.shoes.has_laces}
                onCheckedChange={(checked) => updateData('clothing.shoes.has_laces', checked)}
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
                checked={characterData.accessories.head_accessories.hat.has_hat}
                onCheckedChange={(checked) => {
                  updateData('accessories.head_accessories.hat.has_hat', checked);
                  if (checked) {
                    updateData('accessories.head_accessories.hat.type', 'gorra');
                    updateData('accessories.head_accessories.hat.color', '#FF0000');
                  } else {
                    updateData('accessories.head_accessories.hat.type', null);
                    updateData('accessories.head_accessories.hat.color', null);
                  }
                }}
              />
              <Label htmlFor="has_hat">¿Usa gorro/sombrero?</Label>
            </div>

            {characterData.accessories.head_accessories.hat.has_hat && (
              <>
                <div>
                  <Label>Tipo de Gorro</Label>
                  <Select 
                    value={characterData.accessories.head_accessories.hat.type || ''} 
                    onValueChange={(value) => updateData('accessories.head_accessories.hat.type', value)}
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
                        variant={characterData.accessories.head_accessories.hat.color === color ? "default" : "outline"}
                        onClick={() => updateData('accessories.head_accessories.hat.color', color)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_glasses"
                checked={characterData.accessories.head_accessories.glasses.has_glasses}
                onCheckedChange={(checked) => {
                  updateData('accessories.head_accessories.glasses.has_glasses', checked);
                  if (checked) {
                    updateData('accessories.head_accessories.glasses.type', 'normales');
                    updateData('accessories.head_accessories.glasses.color', '#000000');
                  } else {
                    updateData('accessories.head_accessories.glasses.type', null);
                    updateData('accessories.head_accessories.glasses.color', null);
                  }
                }}
              />
              <Label htmlFor="has_glasses">¿Usa lentes?</Label>
            </div>

            {characterData.accessories.head_accessories.glasses.has_glasses && (
              <div>
                <Label>Tipo de Lentes</Label>
                <Select 
                  value={characterData.accessories.head_accessories.glasses.type || ''} 
                  onValueChange={(value) => updateData('accessories.head_accessories.glasses.type', value)}
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
                checked={characterData.accessories.body_accessories.necklace.has_necklace}
                onCheckedChange={(checked) => {
                  updateData('accessories.body_accessories.necklace.has_necklace', checked);
                  if (checked) {
                    updateData('accessories.body_accessories.necklace.type', 'cadena');
                    updateData('accessories.body_accessories.necklace.material', 'oro');
                  } else {
                    updateData('accessories.body_accessories.necklace.type', null);
                    updateData('accessories.body_accessories.necklace.material', null);
                  }
                }}
              />
              <Label htmlFor="has_necklace">¿Usa collar?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_watch"
                checked={characterData.accessories.body_accessories.watch.has_watch}
                onCheckedChange={(checked) => {
                  updateData('accessories.body_accessories.watch.has_watch', checked);
                  if (checked) {
                    updateData('accessories.body_accessories.watch.type', 'digital');
                    updateData('accessories.body_accessories.watch.color', '#000000');
                  } else {
                    updateData('accessories.body_accessories.watch.type', null);
                    updateData('accessories.body_accessories.watch.color', null);
                  }
                }}
              />
              <Label htmlFor="has_watch">¿Usa reloj?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_bracelet"
                checked={characterData.accessories.body_accessories.bracelet.has_bracelet}
                onCheckedChange={(checked) => {
                  updateData('accessories.body_accessories.bracelet.has_bracelet', checked);
                  if (checked) {
                    updateData('accessories.body_accessories.bracelet.type', 'pulsera');
                    updateData('accessories.body_accessories.bracelet.count', 1);
                  } else {
                    updateData('accessories.body_accessories.bracelet.type', null);
                    updateData('accessories.body_accessories.bracelet.count', 0);
                  }
                }}
              />
              <Label htmlFor="has_bracelet">¿Usa pulseras?</Label>
            </div>

            {characterData.accessories.body_accessories.bracelet.has_bracelet && (
              <div>
                <Label>Número de Pulseras: {characterData.accessories.body_accessories.bracelet.count}</Label>
                <Slider
                  value={[characterData.accessories.body_accessories.bracelet.count]}
                  onValueChange={(value) => updateData('accessories.body_accessories.bracelet.count', value[0])}
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
                checked={characterData.special_features.is_superhero}
                onCheckedChange={(checked) => {
                  updateData('special_features.is_superhero', checked);
                  if (checked) {
                    updateData('special_features.superhero_name', 'Super ' + characterData.name);
                    updateData('special_features.has_powers', true);
                    updateData('special_features.powers_list', ['volar', 'fuerza_super']);
                  } else {
                    updateData('special_features.superhero_name', null);
                    updateData('special_features.has_powers', false);
                    updateData('special_features.powers_list', []);
                  }
                }}
              />
              <Label htmlFor="is_superhero">¿Es un superhéroe?</Label>
            </div>

            {characterData.special_features.is_superhero && (
              <div>
                <Label htmlFor="superhero_name">Nombre de Superhéroe</Label>
                <Input
                  id="superhero_name"
                  value={characterData.special_features.superhero_name || ''}
                  onChange={(e) => updateData('special_features.superhero_name', e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_alien"
                  checked={characterData.special_features.is_alien}
                  onCheckedChange={(checked) => updateData('special_features.is_alien', checked)}
                />
                <Label htmlFor="is_alien">¿Es alien?</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_robot"
                  checked={characterData.special_features.is_robot}
                  onCheckedChange={(checked) => updateData('special_features.is_robot', checked)}
                />
                <Label htmlFor="is_robot">¿Es robot?</Label>
              </div>
            </div>

            <div>
              <Label>Transparencia: {Math.round(characterData.special_features.transparency_level * 100)}%</Label>
              <Slider
                value={[characterData.special_features.transparency_level]}
                onValueChange={(value) => updateData('special_features.transparency_level', value[0])}
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
              <Label>Nivel: {characterData.game_stats.level}</Label>
              <Slider
                value={[characterData.game_stats.level]}
                onValueChange={(value) => updateData('game_stats.level', value[0])}
                max={99}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Experiencia: {characterData.game_stats.experience_points}</Label>
              <Slider
                value={[characterData.game_stats.experience_points]}
                onValueChange={(value) => updateData('game_stats.experience_points', value[0])}
                max={10000}
                min={0}
                step={100}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Vida: {characterData.game_stats.health}</Label>
                <Slider
                  value={[characterData.game_stats.health]}
                  onValueChange={(value) => updateData('game_stats.health', value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Energía: {characterData.game_stats.energy}</Label>
                <Slider
                  value={[characterData.game_stats.energy]}
                  onValueChange={(value) => updateData('game_stats.energy', value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Felicidad: {characterData.game_stats.happiness}</Label>
                <Slider
                  value={[characterData.game_stats.happiness]}
                  onValueChange={(value) => updateData('game_stats.happiness', value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Popularidad: {characterData.game_stats.popularity}</Label>
                <Slider
                  value={[characterData.game_stats.popularity]}
                  onValueChange={(value) => updateData('game_stats.popularity', value[0])}
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
