# Configurar modelos en opencode con Modal

## Estructura del `.opencode.json`

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "NOMBRE_PROVIDER": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Nombre visible del provider",
      "options": {
        "baseURL": "https://api.us-west-2.modal.direct/v1",
        "apiKey": "TU_API_KEY_DE_MODAL"
      },
      "models": {
        "ID_DEL_MODELO": {
          "name": "Nombre visible del modelo",
          "interleaved": {
            "field": "reasoning_content"
          }
        }
      }
    }
  }
}
```

## Pasos

1. Ve a [Modal Research](https://modal.research) y genera una API key
2. Copia la API key que te dan
3. Pega la API key en `apiKey`
4. Copia el ID del modelo (ej: `zai-org/GLM-5.1-FP8`) y pégalo como clave en `models`
5. Si el modelo es de **razonamiento** (devuelve `content: null`), agrega `interleaved`
6. Si el modelo es **normal** (devuelve `content` con texto), omite `interleaved`

## Ejemplo con dos modelos

```json
"models": {
  "zai-org/GLM-5.1-FP8": {
    "name": "GLM 5.1 FP8",
    "interleaved": { "field": "reasoning_content" }
  },
  "otro-modelo-id": {
    "name": "Otro Modelo"
  }
}
```

## Cambiar de provider

Si usas un proveedor diferente a Modal, cambia `baseURL` por el endpoint del nuevo proveedor y ajusta `apiKey`.
