# YogaMobile — React Native

Projeto desenvolvido com **React Native e TypeScript**, inicialmente configurado com o [React Native Community CLI](https://github.com/react-native-community/cli).

O repositório contém duas implementações Mobile, organizadas em diretórios distintos. Este documento apresenta a estrutura do projeto, as diferenças entre as versões e as instruções para execução.

## 1. Estrutura do projeto

```text
YogaMobile/
├── android/
├── App.tsx
├── index.js
└── mobile-app/
    └── mobile/
        ├── package.json
        └── ...
```

## 2. Versões disponíveis

| Diretório | Descrição |
|---|---|
| `YogaMobile/` | Projeto React Native com configuração Android nativa e implementação da interface inicial de bem-estar. |
| `YogaMobile/mobile-app/mobile/` | Implementação funcional em React Native com Expo, contendo integração com a API, navegação e testes. |

### Implementação funcional

**Diretório:** `YogaMobile/mobile-app/mobile/`

A implementação funcional utiliza as seguintes tecnologias:

- React Native 0.76.9
- TypeScript
- Expo SDK 52
- React Navigation
- TanStack React Query
- Jest

Esta é a versão de referência para consultar as funcionalidades de integração com a API, navegação e testes.

## 3. Executando a aplicação Mobile

### Pré-requisitos

Antes de iniciar, certifique-se de possuir:

- Node.js e npm instalados
- Android Studio instalado
- Android SDK configurado
- Emulador Android ou dispositivo físico compatível

### Passo 1 — Acessar o diretório

A partir da raiz do repositório:

```bash
cd YogaMobile/mobile-app/mobile
```

### Passo 2 — Instalar as dependências

```bash
npm install
```

### Passo 3 — Executar no Android

Com o emulador Android iniciado:

```bash
npm run android
```

O comando inicia o ambiente de desenvolvimento Expo e tenta abrir a aplicação no dispositivo Android.

Para iniciar apenas o servidor de desenvolvimento:

```bash
npm start
```

## 4. Testes e qualidade de código

Os comandos abaixo devem ser executados dentro de `YogaMobile/mobile-app/mobile/`.

### Executar testes automatizados

```bash
npm test
```

### Verificar a tipagem TypeScript

```bash
npm run typecheck
```

### Executar o ESLint

```bash
npm run lint
```

## 5. APK Android

O APK de desenvolvimento foi gerado a partir do projeto React Native localizado em `YogaMobile/`.

### Localização do APK

```text
YogaMobile/android/app/build/outputs/apk/debug/app-debug.apk
```

### Informações sobre o APK

| Propriedade | Descrição |
|---|---|
| Tipo | APK de desenvolvimento (debug) |
| Projeto de origem | `YogaMobile/` |
| Implementação | Interface inicial estática de bem-estar |
| Plataforma | Android |

Por ser uma versão de desenvolvimento, sua execução pode depender do Metro Bundler.

**Importante:** o APK gerado não corresponde à implementação funcional localizada em `YogaMobile/mobile-app/mobile/`.

Não há um APK da implementação Expo validado nesta entrega.

## 6. Observações sobre a organização

O repositório mantém duas implementações distintas.

### React Native CLI — `YogaMobile/`

Contém a configuração nativa Android e a interface inicial de bem-estar, com componentes visuais desenvolvidos em React Native.

### React Native com Expo — `YogaMobile/mobile-app/mobile/`

Contém a implementação com integração à API, navegação entre telas e testes automatizados.

A segunda implementação é a referência para avaliação das funcionalidades desenvolvidas.

As duas versões possuem configurações e finalidades distintas e não devem ser consideradas equivalentes.

A documentação foi organizada para esclarecer essa separação e facilitar a identificação e execução de cada projeto.
